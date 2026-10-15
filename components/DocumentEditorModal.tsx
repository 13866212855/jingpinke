"use client";

import React, { useRef, useState, useEffect } from "react";
import { MaterialItem, TeacherConfig } from "@/lib/documents-data";
import { buildDocxBlob, buildPdfBlob } from "@/lib/docx-builder";
import { saveAs } from "file-saver";
import {
  X,
  Save,
  Image as ImageIcon,
  RotateCcw,
  Download,
  FileType,
  Bold,
  Italic,
  Underline,
  Heading1,
  Heading2,
  Table as TableIcon,
  MessageSquareQuote,
  AlignLeft,
  AlignCenter,
  CheckCircle2,
} from "lucide-react";

interface DocumentEditorModalProps {
  item: MaterialItem;
  initialHtml: string;
  config: TeacherConfig;
  onSave: (itemId: string, newHtml: string, newPlainText: string) => void;
  onClose: () => void;
}

export default function DocumentEditorModal({
  item,
  initialHtml,
  config,
  onSave,
  onClose,
}: DocumentEditorModalProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [saveToast, setSaveToast] = useState(false);
  const [isExportingDocx, setIsExportingDocx] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = initialHtml;
    }
  }, [initialHtml]);

  // 富文本命令执行
  const execCmd = (cmd: string, val: string | undefined = undefined) => {
    document.execCommand(cmd, false, val);
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  // 插入本地图片
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("请选择合法的图片文件（PNG、JPG、JPEG、GIF等）");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Url = event.target?.result as string;
      if (!base64Url || !editorRef.current) return;

      const imgHtml = `
        <div style="text-align: center; margin: 16px 0;" class="editor-inserted-image">
          <img src="${base64Url}" alt="${file.name}" style="max-width: 90%; max-height: 480px; height: auto; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); border: 1px solid #cbd5e1; display: inline-block;" />
          <p style="font-size: 12px; color: #64748b; margin-top: 6px;">图：${file.name.replace(/\.[^/.]+$/, "")}</p>
        </div>
      `;
      document.execCommand("insertHTML", false, imgHtml);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  // 插入规范表格
  const handleInsertTable = () => {
    const tableHtml = `
      <table style="width: 100%; border-collapse: collapse; margin: 12px 0; font-size: 13px; border: 1px solid #cbd5e1;">
        <thead>
          <tr style="background-color: #f1f5f9;">
            <th style="border: 1px solid #cbd5e1; padding: 8px 10px; width: 25%; font-weight: bold;">项目/维度</th>
            <th style="border: 1px solid #cbd5e1; padding: 8px 10px; width: 45%; font-weight: bold;">探究内容/分析指标</th>
            <th style="border: 1px solid #cbd5e1; padding: 8px 10px; width: 30%; font-weight: bold;">结论/素养表现</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border: 1px solid #cbd5e1; padding: 8px 10px; font-weight: bold;">指标 1</td>
            <td style="border: 1px solid #cbd5e1; padding: 8px 10px;">点击此处输入分析内容...</td>
            <td style="border: 1px solid #cbd5e1; padding: 8px 10px;">达成A级</td>
          </tr>
          <tr>
            <td style="border: 1px solid #cbd5e1; padding: 8px 10px; font-weight: bold;">指标 2</td>
            <td style="border: 1px solid #cbd5e1; padding: 8px 10px;">点击此处输入分析内容...</td>
            <td style="border: 1px solid #cbd5e1; padding: 8px 10px;">达成A级</td>
          </tr>
        </tbody>
      </table>
      <p></p>
    `;
    document.execCommand("insertHTML", false, tableHtml);
  };

  // 插入红笔手写批语
  const handleInsertTeacherNote = () => {
    const noteHtml = `
      <div style="background-color: #fef2f2; border: 1px dashed #fca5a5; border-radius: 6px; padding: 10px 14px; margin: 12px 0;">
        <span style="color: #dc2626; font-family: 'KaiTi', 'STKaiti', serif; font-size: 14px; font-weight: bold;">
          ✎ 教师红笔批阅：请输入针对性指导评语（${config.teacherName}老师批）
        </span>
      </div>
      <p></p>
    `;
    document.execCommand("insertHTML", false, noteHtml);
  };

  // 保存修改
  const handleSaveContent = () => {
    if (!editorRef.current) return;
    const currentHtml = editorRef.current.innerHTML;
    const currentText = editorRef.current.innerText;
    onSave(item.id, currentHtml, currentText);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  // 重置回模板默认
  const handleReset = () => {
    if (confirm("确定要放弃当前所有在线修改，恢复为此文档的标准初始模版吗？")) {
      if (editorRef.current) {
        editorRef.current.innerHTML = initialHtml;
        handleSaveContent();
      }
    }
  };

  // 立即将当前编辑内容导出为 Word
  const handleExportEditedDocx = async () => {
    if (!editorRef.current) return;
    setIsExportingDocx(true);
    try {
      const html = editorRef.current.innerHTML;
      const text = editorRef.current.innerText;
      const blob = await buildDocxBlob(item.title, html, text);
      saveAs(blob, item.fileName);
    } catch (e) {
      console.error(e);
      alert("Word 导出遇到异常，请检查");
    } finally {
      setIsExportingDocx(false);
    }
  };

  // 立即将当前编辑内容导出为 PDF
  const handleExportEditedPdf = async () => {
    if (!editorRef.current) return;
    setIsExportingPdf(true);
    try {
      const html = editorRef.current.innerHTML;
      const blob = await buildPdfBlob(item.title, html);
      saveAs(blob, item.fileName.replace(/\.docx$/, ".pdf"));
    } catch (e) {
      console.error(e);
      alert("PDF 导出遇到异常，请检查");
    } finally {
      setIsExportingPdf(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl border border-slate-200 max-w-5xl w-full h-[94vh] flex flex-col shadow-2xl overflow-hidden">
        {/* 顶部标题栏 */}
        <div className="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
            <div>
              <h3 className="text-base font-bold text-slate-900 truncate max-w-lg sm:max-w-2xl">
                在线编辑：{item.title}
              </h3>
              <p className="text-xs text-slate-500">
                支持直接在页面内修改正文、表格及<strong className="text-blue-700">插入本地教学图片</strong>，修改后将自动同步至一键全套打包
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {saveToast && (
              <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" />
                已保存到本地
              </span>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 快捷排版工具栏 */}
        <div className="px-4 py-2 border-b border-slate-200 bg-white flex flex-wrap items-center gap-1.5 text-slate-700 text-xs shrink-0 select-none">
          {/* 格式按钮 */}
          <button
            onClick={() => execCmd("bold")}
            title="加粗"
            className="p-1.5 hover:bg-slate-100 rounded-md border border-slate-200 cursor-pointer"
          >
            <Bold className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => execCmd("italic")}
            title="斜体"
            className="p-1.5 hover:bg-slate-100 rounded-md border border-slate-200 cursor-pointer"
          >
            <Italic className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => execCmd("underline")}
            title="下划线"
            className="p-1.5 hover:bg-slate-100 rounded-md border border-slate-200 cursor-pointer"
          >
            <Underline className="w-3.5 h-3.5" />
          </button>

          <span className="w-px h-5 bg-slate-200 mx-1" />

          <button
            onClick={() => execCmd("formatBlock", "<h1>")}
            title="一级标题"
            className="px-2 py-1 hover:bg-slate-100 rounded-md border border-slate-200 cursor-pointer font-bold flex items-center gap-1"
          >
            <Heading1 className="w-3.5 h-3.5 text-blue-800" />
            大标题
          </button>
          <button
            onClick={() => execCmd("formatBlock", "<h2>")}
            title="二级标题"
            className="px-2 py-1 hover:bg-slate-100 rounded-md border border-slate-200 cursor-pointer font-semibold flex items-center gap-1"
          >
            <Heading2 className="w-3.5 h-3.5 text-blue-700" />
            小标题
          </button>

          <span className="w-px h-5 bg-slate-200 mx-1" />

          {/* 插入本地图片按钮 (用户核心要求) */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            title="在光标处插入本地图片"
            className="px-2.5 py-1 bg-blue-50 text-blue-800 hover:bg-blue-100 rounded-md border border-blue-200 cursor-pointer font-semibold flex items-center gap-1.5"
          >
            <ImageIcon className="w-3.5 h-3.5 text-blue-600" />
            <span>插入本地图片</span>
          </button>

          {/* 插入表格 */}
          <button
            onClick={handleInsertTable}
            title="插入标准教学评一致性表格"
            className="px-2 py-1 hover:bg-slate-100 rounded-md border border-slate-200 cursor-pointer flex items-center gap-1"
          >
            <TableIcon className="w-3.5 h-3.5 text-slate-600" />
            插入表格
          </button>

          {/* 插入红笔评语框 */}
          <button
            onClick={handleInsertTeacherNote}
            title="插入教师红笔手写批语框"
            className="px-2 py-1 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-md border border-rose-200 cursor-pointer flex items-center gap-1 font-medium"
          >
            <MessageSquareQuote className="w-3.5 h-3.5 text-rose-600" />
            插入红笔批阅
          </button>

          <span className="w-px h-5 bg-slate-200 mx-1" />

          {/* 对齐方式 */}
          <button
            onClick={() => execCmd("justifyLeft")}
            title="居左对齐"
            className="p-1.5 hover:bg-slate-100 rounded-md border border-slate-200 cursor-pointer"
          >
            <AlignLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => execCmd("justifyCenter")}
            title="居中对齐"
            className="p-1.5 hover:bg-slate-100 rounded-md border border-slate-200 cursor-pointer"
          >
            <AlignCenter className="w-3.5 h-3.5" />
          </button>

          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={handleReset}
              title="重置为此文档初始模板"
              className="px-2.5 py-1 text-slate-600 hover:text-rose-700 hover:bg-rose-50 rounded-md border border-slate-200 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              恢复默认模版
            </button>
            <button
              onClick={handleSaveContent}
              title="保存当前修改"
              className="px-3.5 py-1 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Save className="w-3.5 h-3.5" />
              保存已修改内容
            </button>
          </div>
        </div>

        {/* 富文本编辑正文主区（仿 Word/A4 纸张排版） */}
        <div className="flex-1 bg-slate-100 p-4 sm:p-6 overflow-y-auto flex justify-center">
          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            className="w-full max-w-4xl bg-white min-h-full p-8 sm:p-12 rounded-xl shadow-md border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 font-sans text-slate-800 text-sm leading-relaxed prose max-w-none"
            style={{
              fontFamily: "'PingFang SC', 'Microsoft YaHei', 'SimSun', sans-serif",
            }}
          />
        </div>

        {/* 底部功能条 */}
        <div className="px-5 py-3 border-t border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>执教教师：<strong>{config.teacherName}</strong></span>
            <span>·</span>
            <span>单位：<strong>{config.schoolName}</strong></span>
            <span>·</span>
            <span className="text-emerald-700 font-medium">编辑后点击“保存”，全套 ZIP 导出将自动包含您的专属修改</span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleExportEditedPdf}
              disabled={isExportingPdf}
              className="px-3 py-1.5 text-xs font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <FileType className="w-3.5 h-3.5 text-rose-600" />
              {isExportingPdf ? "PDF 生成中..." : "导出当前已编辑 PDF"}
            </button>

            <button
              onClick={handleExportEditedDocx}
              disabled={isExportingDocx}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              {isExportingDocx ? "Word 生成中..." : "导出当前已编辑 Word (.docx)"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
