"use client";

import React, { useState, useRef, useEffect } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import {
  materialsList,
  TeacherConfig,
  generateDocumentContent,
  MaterialItem,
} from "@/lib/documents-data";
import {
  buildDocxBlob,
  buildPdfBlob,
} from "@/lib/docx-builder";
import {
  FolderArchive,
  FileText,
  FileSpreadsheet,
  FileType,
  Image as ImageIcon,
  FileCode,
  Folder,
  FolderOpen,
  Search,
  Upload,
  Download,
  Save,
  RotateCcw,
  CheckCircle2,
  X,
  Plus,
  Bold,
  Italic,
  Underline,
  Heading1,
  Heading2,
  Table as TableIcon,
  MessageSquareQuote,
  AlignLeft,
  AlignCenter,
  Sparkles,
  ExternalLink,
  Edit3,
} from "lucide-react";

export interface VirtualZipFile {
  id: string; // material item id or custom path
  fileName: string;
  folder: string; // e.g. "根目录" or "06_附件佐证材料"
  fileType: "docx" | "pdf" | "csv" | "txt" | "image";
  title: string;
  html: string;
  plainText: string;
  isModified: boolean;
  hasPdf: boolean;
  category: string;
  sizeEstimate: string;
  rawBlob?: Blob;
}

interface ZipWorkbenchModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: TeacherConfig;
  initialSelectedId?: string;
  customDocs: Record<string, { html: string; plainText: string; title: string }>;
  onSaveDoc: (id: string, html: string, plainText: string) => void;
  onExportAllZip: () => void;
}

function buildInitialZipFiles(
  config: TeacherConfig,
  customDocs: Record<string, { html: string; plainText: string; title: string }>
): VirtualZipFile[] {
  const files: VirtualZipFile[] = [];

  materialsList.forEach((m) => {
    const isDocx = m.fileType === "docx";
    const isCustom = !!customDocs[m.id];
    const doc = isCustom ? customDocs[m.id] : generateDocumentContent(m.id, config);
    const isAttachment = m.fileName.startsWith("06_附件佐证材料");
    const folderName = isAttachment ? "06_附件佐证材料" : "根目录";

    files.push({
      id: m.id,
      fileName: m.fileName,
      folder: folderName,
      fileType: m.fileType,
      title: m.title,
      html: doc.html,
      plainText: doc.plainText,
      isModified: isCustom,
      hasPdf: m.hasPdf,
      category: m.category,
      sizeEstimate: isDocx ? "24 ~ 38 KB" : m.fileType === "csv" ? "6.8 KB" : "4.2 KB",
    });

    if (m.hasPdf) {
      const pdfFileName = m.fileName.replace(/\.docx$/, ".pdf");
      files.push({
        id: `${m.id}_pdf`,
        fileName: pdfFileName,
        folder: isAttachment ? "06_附件佐证材料" : "配套PDF核验包",
        fileType: "pdf",
        title: `[PDF直接上报版] ${m.title}`,
        html: doc.html,
        plainText: doc.plainText,
        isModified: isCustom,
        hasPdf: false,
        category: m.category,
        sizeEstimate: "180 ~ 320 KB",
      });
    }
  });

  return files;
}

export default function ZipWorkbenchModal({
  isOpen,
  onClose,
  config,
  initialSelectedId,
  customDocs,
  onSaveDoc,
  onExportAllZip,
}: ZipWorkbenchModalProps) {
  const [zipFiles, setZipFiles] = useState<VirtualZipFile[]>(() =>
    buildInitialZipFiles(config, customDocs)
  );
  const [selectedFileId, setSelectedFileId] = useState<string>(
    () => initialSelectedId || materialsList[0]?.id || ""
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    "根目录": true,
    "06_附件佐证材料": true,
    "配套PDF核验包": true,
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isPackagingZip, setIsPackagingZip] = useState(false);
  const [packProgress, setPackProgress] = useState(0);

  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const zipUploadInputRef = useRef<HTMLInputElement>(null);
  const newAttachmentInputRef = useRef<HTMLInputElement>(null);

  // 选中的文件
  const currentFile = zipFiles.find((f) => f.id === selectedFileId);

  // 当外部传入的 initialSelectedId 改变时更新选中项
  const prevInitialIdRef = useRef(initialSelectedId);
  useEffect(() => {
    if (initialSelectedId && initialSelectedId !== prevInitialIdRef.current) {
      prevInitialIdRef.current = initialSelectedId;
      setSelectedFileId(initialSelectedId);
    }
  }, [initialSelectedId]);

  // 当选中的文件改变时，同步更新编辑器内容
  useEffect(() => {
    if (editorRef.current && currentFile) {
      editorRef.current.innerHTML = currentFile.html;
    }
  }, [currentFile]);

  // 工具栏命令
  const execCmd = (cmd: string, val: string | undefined = undefined) => {
    document.execCommand(cmd, false, val);
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  // 插入本地教学图片
  const handleInsertImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (loadEvt) => {
      const base64 = loadEvt.target?.result as string;
      const imgHtml = `
        <div style="text-align: center; margin: 20px 0; padding: 12px; background-color: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 8px;">
          <img src="${base64}" alt="${file.name}" style="max-width: 90%; max-height: 480px; height: auto; border-radius: 6px; border: 1px solid #94a3b8; display: inline-block; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);" />
          <p style="font-size: 12px; color: #475569; margin: 8px 0 0 0; font-family: 'KaiTi', STKaiti, serif; font-weight: bold;">
            【插图佐证】${file.name.replace(/\.[^/.]+$/, "")}（已成功内嵌写入压缩包中）
          </p>
        </div>
        <p><br></p>
      `;
      if (editorRef.current) {
        editorRef.current.focus();
        document.execCommand("insertHTML", false, imgHtml);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  // 插入 3x3 规整表格
  const handleInsertTable = () => {
    const tableHtml = `
      <table style="width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 13px; text-align: left;">
        <thead>
          <tr style="background-color: #f1f5f9; font-weight: bold;">
            <th style="border: 1px solid #cbd5e1; padding: 8px 12px;">核心素养维度</th>
            <th style="border: 1px solid #cbd5e1; padding: 8px 12px;">学习评价指标</th>
            <th style="border: 1px solid #cbd5e1; padding: 8px 12px;">学生佐证表现成果</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border: 1px solid #cbd5e1; padding: 8px 12px;">信息意识 (A级)</td>
            <td style="border: 1px solid #cbd5e1; padding: 8px 12px;">敏锐捕捉皖北农业生产中的真伪气象数据</td>
            <td style="border: 1px solid #cbd5e1; padding: 8px 12px;">独立完成辨析微报告</td>
          </tr>
          <tr>
            <td style="border: 1px solid #cbd5e1; padding: 8px 12px;">数字化创新</td>
            <td style="border: 1px solid #cbd5e1; padding: 8px 12px;">借助官方平台建立谣言查验核实流程</td>
            <td style="border: 1px solid #cbd5e1; padding: 8px 12px;">形成防诈骗宣传小清单</td>
          </tr>
        </tbody>
      </table>
      <p><br></p>
    `;
    if (editorRef.current) {
      editorRef.current.focus();
      document.execCommand("insertHTML", false, tableHtml);
    }
  };

  // 插入红笔手写体批改框
  const handleInsertTeacherComment = () => {
    const commentHtml = `
      <div style="background-color: #fef2f2; border: 1.5px dashed #dc2626; border-radius: 8px; padding: 12px 16px; margin: 16px 0; color: #991b1b; font-family: 'KaiTi', STKaiti, serif;">
        <span style="font-weight: bold; font-size: 14px;">✎ 刘家阳老师红笔真迹批改：</span>
        <span style="font-size: 13px; margin-left: 6px;">“此处信息价值的真伪辨析逻辑严密，紧扣颍上县小麦冬灌农业情境，达成新课标信息意识 A 级表现标准！”</span>
      </div>
      <p><br></p>
    `;
    if (editorRef.current) {
      editorRef.current.focus();
      document.execCommand("insertHTML", false, commentHtml);
    }
  };

  // 保存当前文件修改到虚拟压缩包
  const handleSaveCurrentFile = () => {
    if (!currentFile || !editorRef.current) return;

    const newHtml = editorRef.current.innerHTML;
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = newHtml;
    const newPlainText = tempDiv.innerText || tempDiv.textContent || "";

    // 更新虚拟文件列表
    setZipFiles((prev) =>
      prev.map((f) =>
        f.id === currentFile.id
          ? { ...f, html: newHtml, plainText: newPlainText, isModified: true }
          : f
      )
    );

    // 如果是原始材料 item id，同时持久化到外部 customDocs
    const cleanId = currentFile.id.replace(/_pdf$/, "");
    onSaveDoc(cleanId, newHtml, newPlainText);

    showToast(`已成功将【${currentFile.fileName}】的修改实时保存写入当前压缩包！`);
  };

  // 恢复此篇材料为系统原始版本
  const handleResetToDefault = () => {
    if (!currentFile) return;
    const cleanId = currentFile.id.replace(/_pdf$/, "");
    const original = generateDocumentContent(cleanId, config);

    setZipFiles((prev) =>
      prev.map((f) =>
        f.id === currentFile.id
          ? {
              ...f,
              html: original.html,
              plainText: original.plainText,
              isModified: false,
            }
          : f
      )
    );

    if (editorRef.current) {
      editorRef.current.innerHTML = original.html;
    }

    onSaveDoc(cleanId, original.html, original.plainText);
    showToast(`已将【${currentFile.fileName}】重置为省一等奖标准默认模板。`);
  };

  // 导入本地已有 ZIP 文件并在线解压
  const handleUploadLocalZip = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      showToast(`正在解压并载入本地【${file.name}】压缩包...`);
      const zip = await JSZip.loadAsync(file);
      const loadedFiles: VirtualZipFile[] = [];

      let index = 0;
      for (const [relativePath, zipEntry] of Object.entries(zip.files)) {
        if (zipEntry.dir) continue;

        index++;
        const ext = relativePath.split(".").pop()?.toLowerCase() || "";
        const fileNameOnly = relativePath.split("/").pop() || relativePath;
        const folderName = relativePath.includes("/")
          ? relativePath.substring(0, relativePath.lastIndexOf("/"))
          : "根目录";

        let plainText = "";
        let html = "";
        let fileType: VirtualZipFile["fileType"] = "txt";

        if (ext === "docx") {
          fileType = "docx";
          // 读取 docx 内部内容或者生成占位
          plainText = `【本地已导入 DOCX 文件: ${fileNameOnly}】`;
          html = `<div class="p-4 bg-slate-50 border border-slate-200 rounded">
            <h2 class="text-lg font-bold text-slate-800">${fileNameOnly}</h2>
            <p class="text-xs text-slate-500 mt-1">来源：已解压的本地 ZIP 文件</p>
            <p class="mt-4 text-slate-700">您可以在此直接编辑文本、插入教学图片，并保存回压缩包中重新导出。</p>
          </div>`;
        } else if (ext === "csv" || ext === "txt") {
          fileType = ext === "csv" ? "csv" : "txt";
          plainText = await zipEntry.async("string");
          html = `<pre style="white-space: pre-wrap; font-family: monospace; font-size: 12px; background: #f8fafc; padding: 12px; border-radius: 6px;">${plainText}</pre>`;
        } else if (["png", "jpg", "jpeg", "gif", "webp"].includes(ext)) {
          fileType = "image";
          const base64 = await zipEntry.async("base64");
          html = `<div style="text-align: center;"><img src="data:image/${ext};base64,${base64}" style="max-width: 90%; border-radius: 6px;" /><p class="text-xs text-slate-500 mt-2">${fileNameOnly}</p></div>`;
        } else {
          plainText = `【二进制附件: ${fileNameOnly}】`;
          html = `<p class="text-slate-500">已解压并包含在压缩包中的附件：${fileNameOnly}</p>`;
        }

        loadedFiles.push({
          id: `uploaded_${index}`,
          fileName: fileNameOnly,
          folder: folderName,
          fileType: fileType,
          title: fileNameOnly,
          html: html,
          plainText: plainText,
          isModified: false,
          hasPdf: false,
          category: "已导入材料",
          sizeEstimate: "已读取",
        });
      }

      if (loadedFiles.length > 0) {
        setZipFiles(loadedFiles);
        setSelectedFileId(loadedFiles[0].id);
        showToast(`成功解压并载入了 ${loadedFiles.length} 个文件！您可以直接在此在线编辑并重新打包。`);
      }
    } catch (err) {
      console.error(err);
      showToast("解析上传的 ZIP 压缩包失败，请检查文件是否损坏。");
    }

    e.target.value = "";
  };

  // 添加新附件/教学图片到当前压缩包
  const handleAddNewAttachment = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (loadEvt) => {
      const base64 = loadEvt.target?.result as string;
      const newFileId = `custom_file_${Date.now()}`;
      const ext = file.name.split(".").pop()?.toLowerCase() || "txt";

      const newEntry: VirtualZipFile = {
        id: newFileId,
        fileName: file.name,
        folder: "06_附件佐证材料",
        fileType: ["png", "jpg", "jpeg", "webp"].includes(ext) ? "image" : "docx",
        title: `[新增附件] ${file.name}`,
        html: `
          <div style="text-align: center; padding: 20px;">
            <img src="${base64}" alt="${file.name}" style="max-width: 90%; border-radius: 8px; border: 1px solid #cbd5e1;" />
            <p style="font-size: 13px; color: #475569; margin-top: 8px; font-weight: bold;">【新上传佐证附件】${file.name}</p>
          </div>
        `,
        plainText: `【新增附件文件：${file.name}】`,
        isModified: true,
        hasPdf: false,
        category: "佐证材料",
        sizeEstimate: `${Math.round(file.size / 1024)} KB`,
      };

      setZipFiles((prev) => [...prev, newEntry]);
      setSelectedFileId(newFileId);
      showToast(`已将【${file.name}】添加到当前压缩包的“06_附件佐证材料”目录中！`);
    };

    reader.readAsDataURL(file);
    e.target.value = "";
  };

  // 一键将当前工作台中的所有文件打包为真实 ZIP 下载
  const handleExportWorkbenchZip = async () => {
    try {
      setIsPackagingZip(true);
      setPackProgress(5);
      showToast("正在将工作台内所有最新编辑与插入的图片打包为标准 ZIP...");

      const zip = new JSZip();
      const rootFolderName = `安徽省${config.year}基础教育精品课_耿棚中学_信息技术《1.3信息及其特征》全套申报材料_刘家阳`;
      const root = zip.folder(rootFolderName) || zip;

      const total = zipFiles.length;

      for (let i = 0; i < total; i++) {
        const file = zipFiles[i];
        const progress = Math.round(((i + 1) / total) * 85);
        setPackProgress(progress);

        // 处理目录路径
        const targetPath =
          file.folder === "根目录"
            ? file.fileName
            : `${file.folder}/${file.fileName.split("/").pop()}`;

        if (file.fileType === "docx") {
          const docxBlob = await buildDocxBlob(file.title, file.html, file.plainText);
          root.file(targetPath, docxBlob);
        } else if (file.fileType === "pdf") {
          try {
            const pdfBlob = await buildPdfBlob(file.title, file.html);
            root.file(targetPath, pdfBlob);
          } catch (e) {
            console.warn("PDF build skip:", e);
          }
        } else if (file.fileType === "csv") {
          root.file(targetPath, "\uFEFF" + file.plainText);
        } else if (file.fileType === "image" && file.html.includes("data:image/")) {
          // 提取 base64 保存为图片文件
          const match = file.html.match(/src="(data:image\/[^;]+;base64,[^"]+)"/);
          if (match) {
            const base64Data = match[1].split(",")[1];
            root.file(targetPath, base64Data, { base64: true });
          }
        } else {
          root.file(targetPath, file.plainText);
        }

        await new Promise((r) => setTimeout(r, 40));
      }

      setPackProgress(95);
      const zipBlob = await zip.generateAsync({
        type: "blob",
        compression: "DEFLATE",
        compressionOptions: { level: 6 },
      });

      setPackProgress(100);
      saveAs(zipBlob, `${rootFolderName}_(工作台实时导出版).zip`);
      showToast("🎉 工作台全套材料包（含所有最新编辑与插入图片）已成功打包并下载！");

      setTimeout(() => {
        setIsPackagingZip(false);
      }, 2500);
    } catch (err) {
      console.error(err);
      setIsPackagingZip(false);
      showToast("打包过程中遇到错误，请重试。");
    }
  };

  // 单独下载当前文件 DOCX
  const handleDownloadCurrentDocx = async () => {
    if (!currentFile) return;
    showToast(`正在导出【${currentFile.fileName}】...`);
    const docxBlob = await buildDocxBlob(currentFile.title, currentFile.html, currentFile.plainText);
    saveAs(docxBlob, currentFile.fileName.endsWith(".docx") ? currentFile.fileName : `${currentFile.fileName}.docx`);
  };

  // 单独下载当前文件 PDF
  const handleDownloadCurrentPdf = async () => {
    if (!currentFile) return;
    showToast(`正在转换高清 PDF【${currentFile.fileName}】...`);
    const pdfBlob = await buildPdfBlob(currentFile.title, currentFile.html);
    const pdfName = currentFile.fileName.replace(/\.[^/.]+$/, ".pdf");
    saveAs(pdfBlob, pdfName);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  if (!isOpen) return null;

  // 文件夹分组
  const foldersMap: Record<string, VirtualZipFile[]> = {};
  const filtered = zipFiles.filter(
    (f) =>
      f.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  filtered.forEach((f) => {
    if (!foldersMap[f.folder]) {
      foldersMap[f.folder] = [];
    }
    foldersMap[f.folder].push(f);
  });

  const modifiedCount = zipFiles.filter((f) => f.isModified).length;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-hidden">
      <div className="bg-white rounded-2xl border border-slate-300 w-full max-w-7xl h-[94vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* 工作台顶部控制栏 */}
        <header className="px-6 py-3.5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600/30 border border-blue-400/40 text-blue-300 flex items-center justify-center shrink-0">
              <FolderArchive className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-2">
                  <span>安徽省精品课申报材料包 · ZIP 真实文件在线工作台</span>
                  <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded border border-blue-400/30 font-mono">
                    虚拟文件系统 v2.0
                  </span>
                </h2>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 truncate max-w-xl">
                已装载压缩包：
                <span className="text-slate-300 font-mono">
                  安徽省{config.year}基础教育精品课_耿棚中学_信息技术《1.3信息及其特征》_刘家阳.zip
                </span>
              </p>
            </div>
          </div>

          {/* 顶部右侧操作按钮组 */}
          <div className="flex items-center gap-2.5">
            {/* 导入本地 ZIP 包 */}
            <input
              type="file"
              ref={zipUploadInputRef}
              accept=".zip"
              className="hidden"
              onChange={handleUploadLocalZip}
            />
            <button
              onClick={() => zipUploadInputRef.current?.click()}
              title="载入您电脑上的已有 ZIP 压缩包，在线解压并直接编辑内部文档"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white border border-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>导入本地 ZIP</span>
            </button>

            {/* 新增文件 / 上传图片附件 */}
            <input
              type="file"
              ref={newAttachmentInputRef}
              className="hidden"
              onChange={handleAddNewAttachment}
            />
            <button
              onClick={() => newAttachmentInputRef.current?.click()}
              title="在压缩包的 06_附件佐证材料 目录中新增教学照片或文档附件"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-300 bg-blue-950/60 hover:bg-blue-900 border border-blue-800/80 rounded-lg transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>添加附件/图片</span>
            </button>

            {/* 一键导出工作台最新 ZIP 按钮 */}
            <button
              onClick={handleExportWorkbenchZip}
              disabled={isPackagingZip}
              className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-98 rounded-lg shadow-sm transition-all cursor-pointer disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>
                {isPackagingZip
                  ? `打包中 ${packProgress}%...`
                  : `导出最新 ZIP (${zipFiles.length}文件)`}
              </span>
            </button>

            {/* 关闭工作台 */}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* 工作台状态提示浮条 */}
        {toastMessage && (
          <div className="bg-emerald-600 text-white text-xs px-6 py-2 flex items-center justify-between shadow-xs transition-all animate-in slide-in-from-top-1">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{toastMessage}</span>
            </span>
            <button
              onClick={() => setToastMessage(null)}
              className="text-emerald-200 hover:text-white text-xs"
            >
              关闭
            </button>
          </div>
        )}

        {/* 核心双栏工作区 */}
        <div className="flex-1 flex overflow-hidden">
          {/* 左侧栏：ZIP 压缩包内部文件目录树 */}
          <aside className="w-80 sm:w-96 border-r border-slate-200 bg-slate-50 flex flex-col shrink-0">
            {/* 目录树头部与搜索 */}
            <div className="p-3 border-b border-slate-200 bg-white space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <FolderArchive className="w-4 h-4 text-blue-600" />
                  压缩包内部文件结构
                </span>
                <span className="text-slate-500 font-mono text-[11px]">
                  共 {zipFiles.length} 个文件
                  {modifiedCount > 0 && (
                    <span className="ml-1 text-amber-600 font-bold">
                      ({modifiedCount} 处已修改)
                    </span>
                  )}
                </span>
              </div>

              {/* 搜索框 */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
                <input
                  type="text"
                  placeholder="搜索压缩包中的文件名..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-100 border border-slate-200 rounded-lg focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* 文件列表树 */}
            <div className="flex-1 overflow-y-auto p-2 space-y-3">
              {Object.entries(foldersMap).map(([folderName, files]) => {
                const isExpanded = expandedFolders[folderName] ?? true;
                return (
                  <div key={folderName} className="space-y-1">
                    {/* 文件夹标题行 */}
                    <div
                      onClick={() =>
                        setExpandedFolders((prev) => ({
                          ...prev,
                          [folderName]: !prev[folderName],
                        }))
                      }
                      className="flex items-center gap-1.5 px-2 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-200/60 rounded-md cursor-pointer select-none"
                    >
                      {isExpanded ? (
                        <FolderOpen className="w-3.5 h-3.5 text-blue-600" />
                      ) : (
                        <Folder className="w-3.5 h-3.5 text-slate-500" />
                      )}
                      <span className="truncate flex-1">{folderName}</span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {files.length}
                      </span>
                    </div>

                    {/* 文件夹下属文件列表 */}
                    {isExpanded && (
                      <div className="pl-3 space-y-0.5 border-l border-slate-200 ml-3">
                        {files.map((file) => {
                          const isSelected = selectedFileId === file.id;
                          return (
                            <div
                              key={file.id}
                              onClick={() => setSelectedFileId(file.id)}
                              className={`group flex items-center justify-between px-2.5 py-2 text-xs rounded-lg cursor-pointer transition-all ${
                                isSelected
                                  ? "bg-blue-600 text-white font-medium shadow-xs"
                                  : "text-slate-700 hover:bg-slate-200/70"
                              }`}
                            >
                              <div className="flex items-center gap-2 truncate flex-1 mr-2">
                                {/* 文件类型图标 */}
                                {file.fileType === "docx" && (
                                  <FileText
                                    className={`w-3.5 h-3.5 shrink-0 ${
                                      isSelected ? "text-white" : "text-blue-600"
                                    }`}
                                  />
                                )}
                                {file.fileType === "pdf" && (
                                  <FileType
                                    className={`w-3.5 h-3.5 shrink-0 ${
                                      isSelected ? "text-white" : "text-rose-600"
                                    }`}
                                  />
                                )}
                                {file.fileType === "csv" && (
                                  <FileSpreadsheet
                                    className={`w-3.5 h-3.5 shrink-0 ${
                                      isSelected ? "text-white" : "text-emerald-600"
                                    }`}
                                  />
                                )}
                                {file.fileType === "image" && (
                                  <ImageIcon
                                    className={`w-3.5 h-3.5 shrink-0 ${
                                      isSelected ? "text-white" : "text-purple-600"
                                    }`}
                                  />
                                )}
                                {file.fileType === "txt" && (
                                  <FileCode
                                    className={`w-3.5 h-3.5 shrink-0 ${
                                      isSelected ? "text-white" : "text-slate-500"
                                    }`}
                                  />
                                )}

                                <span className="truncate" title={file.fileName}>
                                  {file.fileName.split("/").pop()}
                                </span>
                              </div>

                              {/* 文件状态标签 */}
                              <div className="shrink-0 flex items-center gap-1">
                                {file.isModified && (
                                  <span
                                    className={`text-[9px] px-1.5 py-0.2 rounded font-bold ${
                                      isSelected
                                        ? "bg-amber-400 text-slate-900"
                                        : "bg-amber-100 text-amber-800 border border-amber-300"
                                    }`}
                                  >
                                    已修改
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* 左侧底部说明 */}
            <div className="p-3 bg-slate-100 border-t border-slate-200 text-[11px] text-slate-500">
              <p>💡 提示：点击任意文件即可在右侧直接编辑正文或插入教学实操图片，修改后点击“保存修改到压缩包”即可。</p>
            </div>
          </aside>

          {/* 右侧主工作区：压缩包内文件深度编辑器 */}
          <main className="flex-1 flex flex-col bg-slate-100 overflow-hidden">
            {currentFile ? (
              <>
                {/* 顶部文件元数据与编辑器工具栏 */}
                <div className="bg-white border-b border-slate-200 p-3 sm:px-6 shadow-2xs space-y-2 shrink-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-slate-400">
                        {currentFile.folder} /
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 truncate max-w-xl">
                        {currentFile.fileName.split("/").pop()}
                      </h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-medium">
                        .{currentFile.fileType.toUpperCase()}
                      </span>
                      {currentFile.isModified && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-medium">
                          压缩包内待更新
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleResetToDefault}
                        title="放弃修改，恢复为省一等奖标准默认模板"
                        className="p-1.5 px-2.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>恢复默认</span>
                      </button>
                      <button
                        onClick={handleSaveCurrentFile}
                        className="p-1.5 px-3 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>保存修改到压缩包</span>
                      </button>
                    </div>
                  </div>

                  {/* 富文本排版与图片插入工具栏 */}
                  <div className="flex flex-wrap items-center gap-1 pt-2 border-t border-slate-100 text-xs">
                    <button
                      type="button"
                      onClick={() => execCmd("bold")}
                      title="加粗"
                      className="p-1.5 px-2 hover:bg-slate-100 rounded text-slate-700 font-bold"
                    >
                      <Bold className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => execCmd("italic")}
                      title="斜体"
                      className="p-1.5 px-2 hover:bg-slate-100 rounded text-slate-700 italic"
                    >
                      <Italic className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => execCmd("underline")}
                      title="下划线"
                      className="p-1.5 px-2 hover:bg-slate-100 rounded text-slate-700 underline"
                    >
                      <Underline className="w-3.5 h-3.5" />
                    </button>
                    <div className="h-4 w-px bg-slate-200 mx-1" />

                    <button
                      type="button"
                      onClick={() => execCmd("formatBlock", "<h1>")}
                      className="p-1.5 px-2 hover:bg-slate-100 rounded text-slate-700 font-semibold"
                    >
                      <Heading1 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => execCmd("formatBlock", "<h2>")}
                      className="p-1.5 px-2 hover:bg-slate-100 rounded text-slate-700 font-semibold"
                    >
                      <Heading2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => execCmd("formatBlock", "<p>")}
                      className="p-1.5 px-2 hover:bg-slate-100 rounded text-slate-700"
                    >
                      正文
                    </button>
                    <div className="h-4 w-px bg-slate-200 mx-1" />

                    <button
                      type="button"
                      onClick={() => execCmd("justifyLeft")}
                      title="居左"
                      className="p-1.5 px-2 hover:bg-slate-100 rounded text-slate-700"
                    >
                      <AlignLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => execCmd("justifyCenter")}
                      title="居中"
                      className="p-1.5 px-2 hover:bg-slate-100 rounded text-slate-700"
                    >
                      <AlignCenter className="w-3.5 h-3.5" />
                    </button>
                    <div className="h-4 w-px bg-slate-200 mx-1" />

                    {/* 插入教学图片核心按钮 */}
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      className="hidden"
                      onChange={handleInsertImage}
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-md font-semibold cursor-pointer shadow-2xs"
                    >
                      <ImageIcon className="w-3.5 h-3.5 text-blue-600" />
                      <span>插入教学实况图片</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleInsertTable}
                      className="inline-flex items-center gap-1 px-2.5 py-1 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-md"
                    >
                      <TableIcon className="w-3.5 h-3.5 text-slate-600" />
                      <span>插入评价表格</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleInsertTeacherComment}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-md"
                    >
                      <MessageSquareQuote className="w-3.5 h-3.5 text-rose-600" />
                      <span>插入红笔批改</span>
                    </button>
                  </div>
                </div>

                {/* 编辑器核心编辑工作纸张 (模拟标准 A4 真实 Word 视图) */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex justify-center">
                  <div className="w-full max-w-4xl bg-white rounded-xl border border-slate-300 shadow-lg min-h-[720px] p-8 sm:p-12 text-slate-800 leading-relaxed">
                    <div
                      ref={editorRef}
                      contentEditable={currentFile.fileType !== "pdf"}
                      suppressContentEditableWarning
                      className="outline-none min-h-[600px] prose max-w-none text-sm"
                    />
                  </div>
                </div>

                {/* 编辑器底部状态与快捷导出按钮 */}
                <footer className="px-6 py-3 bg-white border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 shrink-0">
                  <div className="flex items-center gap-3">
                    <span>
                      当前所处位置：
                      <strong className="text-slate-800 font-mono">
                        {currentFile.folder}/{currentFile.fileName.split("/").pop()}
                      </strong>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>支持直接双击修改文字、粘贴图片或增删表格</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleDownloadCurrentDocx}
                      className="px-3 py-1.5 font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>单独导出此 DOCX</span>
                    </button>
                    {currentFile.hasPdf && (
                      <button
                        onClick={handleDownloadCurrentPdf}
                        className="px-3 py-1.5 font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <FileType className="w-3.5 h-3.5 text-rose-600" />
                        <span>单独导出此 PDF</span>
                      </button>
                    )}
                  </div>
                </footer>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-400">
                <FolderArchive className="w-12 h-12 text-slate-300 mb-3" />
                <p className="text-base font-semibold text-slate-600">请在左侧选择需要在线编辑的压缩包材料</p>
                <p className="text-xs text-slate-400 mt-1">
                  支持在线修改教学设计、学习任务单、课件逐页讲稿、学生样卷及配套佐证数据
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
