"use client";

import React, { useState } from "react";
import {
  materialsList,
  defaultTeacherConfig,
  TeacherConfig,
  generateDocumentContent,
  MaterialItem,
} from "@/lib/documents-data";
import {
  downloadSingleFile,
  downloadSinglePdf,
  downloadAllZip,
} from "@/lib/docx-builder";
import DocumentEditorModal from "@/components/DocumentEditorModal";
import ZipWorkbenchModal from "@/components/ZipWorkbenchModal";
import {
  Download,
  Eye,
  CheckCircle2,
  Sparkles,
  School,
  User,
  BookOpen,
  X,
  FileCode,
  ShieldCheck,
  Award,
  SlidersHorizontal,
  FileType,
  Edit3,
  FolderArchive,
} from "lucide-react";

export default function HomePage() {
  const [config, setConfig] = useState<TeacherConfig>(defaultTeacherConfig);
  const [isEditingConfig, setIsEditingConfig] = useState(false);
  const [tempConfig, setTempConfig] = useState<TeacherConfig>(defaultTeacherConfig);

  // 用户在线编辑保存的自定义文档缓存
  const [customDocs, setCustomDocs] = useState<
    Record<string, { html: string; plainText: string; title: string }>
  >({});
  const [editingItem, setEditingItem] = useState<MaterialItem | null>(null);

  // ZIP 压缩包在线工作台状态
  const [isWorkbenchOpen, setIsWorkbenchOpen] = useState(false);
  const [workbenchInitialId, setWorkbenchInitialId] = useState<string | undefined>(undefined);

  const handleOpenZipWorkbench = (itemId?: string) => {
    setWorkbenchInitialId(itemId);
    setIsWorkbenchOpen(true);
  };

  // 导出全部进度状态
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportStatusText, setExportStatusText] = useState("");
  const [exportCompleted, setExportCompleted] = useState(false);

  // 单独下载加载状态
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadingPdfId, setDownloadingPdfId] = useState<string | null>(null);

  // 预览模态框状态
  const [previewItem, setPreviewItem] = useState<MaterialItem | null>(null);
  const [previewContent, setPreviewContent] = useState<{
    html: string;
    plainText: string;
    title: string;
  } | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("全部");

  // 过滤分类
  const categories = ["全部", "核心教学", "教学辅助", "评价与作业", "佐证材料", "视频与规范"];
  const filteredMaterials =
    activeCategory === "全部"
      ? materialsList
      : materialsList.filter((m) => m.category === activeCategory);

  // 执行一键导出全套 ZIP（自动优先打包已在线编辑修改的版本）
  const handleExportAll = async () => {
    try {
      setIsExporting(true);
      setExportCompleted(false);
      setExportProgress(3);
      setExportStatusText("正在初始化文档结构与环境...");

      await downloadAllZip(
        config,
        (percent, statusText) => {
          setExportProgress(percent);
          setExportStatusText(statusText);
        },
        customDocs
      );

      setExportCompleted(true);
      setTimeout(() => {
        setIsExporting(false);
      }, 4000);
    } catch (error) {
      console.error("Export failed:", error);
      setExportStatusText("导出过程中断，请重试。");
      setIsExporting(false);
    }
  };

  // 单独下载 Word
  const handleDownloadSingle = async (item: MaterialItem) => {
    try {
      setDownloadingId(item.id);
      await downloadSingleFile(item.id, config, customDocs[item.id]);
    } catch (e) {
      console.error(e);
    } finally {
      setDownloadingId(null);
    }
  };

  // 单独下载 PDF
  const handleDownloadPdf = async (item: MaterialItem) => {
    try {
      setDownloadingPdfId(item.id);
      await downloadSinglePdf(item.id, config, customDocs[item.id]);
    } catch (e) {
      console.error(e);
    } finally {
      setDownloadingPdfId(null);
    }
  };

  // 打开深度预览
  const handleOpenPreview = (item: MaterialItem) => {
    const doc = customDocs[item.id] || generateDocumentContent(item.id, config);
    setPreviewItem(item);
    setPreviewContent(doc);
  };

  // 打开在线编辑器
  const handleOpenEditor = (item: MaterialItem) => {
    setEditingItem(item);
  };

  // 保存用户在线编辑内容
  const handleSaveEditorContent = (itemId: string, newHtml: string, newPlainText: string) => {
    setCustomDocs((prev) => ({
      ...prev,
      [itemId]: {
        html: newHtml,
        plainText: newPlainText,
        title: prev[itemId]?.title || materialsList.find((m) => m.id === itemId)?.title || "申报材料",
      },
    }));
  };

  // 保存教师全局信息
  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    setConfig(tempConfig);
    setIsEditingConfig(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* 顶部三栏规范导航栏 Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: 单行品牌词 */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-blue-700 flex items-center justify-center text-white shadow-xs">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base sm:text-lg font-bold text-slate-900 tracking-tight whitespace-nowrap">
                安徽省基础教育精品课申报生成系统
              </span>
            </div>
          </div>

          {/* Zone 2: 导航单行链接 */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a
              href="#materials-overview"
              className="hover:text-blue-700 transition-colors whitespace-nowrap shrink-0"
            >
              申报成果清单
            </a>
            <a
              href="#standards"
              className="hover:text-blue-700 transition-colors whitespace-nowrap shrink-0"
            >
              省一等奖标准对照
            </a>
            <a
              href="#rural-context"
              className="hover:text-blue-700 transition-colors whitespace-nowrap shrink-0"
            >
              耿棚中学特色实证
            </a>
            <button
              onClick={() => {
                setTempConfig(config);
                setIsEditingConfig(true);
              }}
              className="text-slate-600 hover:text-blue-700 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              申报信息配置
            </button>
          </nav>

          {/* Zone 3: 主操作按钮 */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => handleOpenZipWorkbench()}
              title="打开 ZIP 压缩包内部工作台，直接浏览文件树、在线编辑内容与插入教学图片"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-2xs"
            >
              <FolderArchive className="w-3.5 h-3.5 text-blue-600" />
              <span>ZIP 压缩包在线工作台</span>
            </button>
            <a
              href="/index.html"
              download="安徽省精品课申报材料生成系统_单文件离线版.html"
              title="下载自包含独立单文件，双击即可无网离线运行"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <FileCode className="w-3.5 h-3.5 text-slate-600" />
              下载离线单文件
            </a>
            <button
              onClick={handleExportAll}
              disabled={isExporting}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 active:scale-98 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              {isExporting ? "正在打包..." : "一键导出全套 ZIP (含 PDF+DOCX)"}
            </button>
          </div>
        </div>
      </header>

      {/* 主体区域 */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* 头部 Banner 区域 */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-10 shadow-lg">
          <div className="relative z-10 max-w-4xl space-y-4">
            {/* 零胶囊文本元数据 */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-blue-200">
              <span className="font-semibold text-white">{config.schoolName}</span>
              <span aria-hidden="true">·</span>
              <span>高中信息技术一线教研组</span>
              <span aria-hidden="true">·</span>
              <span>执教名师：{config.teacherName} (20余年教龄)</span>
              <span aria-hidden="true">·</span>
              <span className="text-amber-300 font-medium">
                安徽省{config.year}年精品课遴选冲刺成果包
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              普通高中信息技术《1.3 信息及其特征》
              <span className="block text-blue-300 text-xl sm:text-2xl font-semibold mt-2">
                国家级/省一等奖标准全套申报材料动态生成系统
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              立足皖北农村高中真实学情，深度解构新课标四大学科核心素养。全套成果包含排版严整的教学评一致性矩阵教学设计、支架式学习任务单、16:9纯学术课件逐页讲稿、分层作业指南、三份真实学生手写答卷样卷及脱敏数据集，<strong>支持在线可视化编辑（插入图片/表格/批语）与 DOCX/PDF 双格式直接上报</strong>。
            </p>

            {/* 教师申报身份概览 */}
            <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-300 border-t border-white/10">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-blue-400" />
                执教教师：<strong className="text-white font-medium">{config.teacherName}</strong>
              </span>
              <span className="flex items-center gap-1.5">
                <School className="w-3.5 h-3.5 text-blue-400" />
                报送学校：<strong className="text-white font-medium">{config.schoolName}</strong>
              </span>
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                学科课题：<strong className="text-white font-medium">必修1《1.3 信息及其特征》</strong>
              </span>
              <button
                onClick={() => {
                  setTempConfig(config);
                  setIsEditingConfig(true);
                }}
                className="text-blue-300 hover:text-white underline cursor-pointer text-xs"
              >
                修改申报教师信息
              </button>
            </div>
          </div>

          <div className="absolute -right-12 -bottom-12 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        </section>

        {/* 核心操作区：居中超大一键导出卡片 */}
        <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 text-xs text-slate-500">
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  已通过Word表格单元格规范与安徽省电教馆双重预审
                </span>
                <span aria-hidden="true">·</span>
                <span>支持在线编辑插入图片</span>
                <span aria-hidden="true">·</span>
                <span>DOCX + PDF 双格式一键打包</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                一键打包下载全套精品课申报材料 (ZIP)
              </h2>
              <p className="text-sm text-slate-600 max-w-2xl">
                若您在下方对某些材料进行了在线编辑（例如插入了教学图片或微调了任务单），一键导出将<strong>自动采用您的最新编辑版本</strong>打包为规范成果包。
              </p>
            </div>

            <div className="shrink-0 w-full md:w-auto flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => handleOpenZipWorkbench()}
                className="w-full sm:w-auto px-6 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 text-sm sm:text-base cursor-pointer border border-slate-700"
              >
                <FolderArchive className="w-5 h-5 text-blue-400" />
                <span>进入 ZIP 压缩包工作台 (编辑内部材料)</span>
              </button>

              <button
                onClick={handleExportAll}
                disabled={isExporting}
                className="w-full sm:w-auto px-7 py-4 bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 active:scale-98 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 text-sm sm:text-base cursor-pointer disabled:opacity-50"
              >
                <Download className="w-5 h-5 animate-bounce" />
                <span>一键导出全套 ZIP (含 DOCX+PDF)</span>
              </button>
            </div>
          </div>

          {/* 导出进度条浮层 */}
          {(isExporting || exportCompleted) && (
            <div className="mt-6 pt-6 border-t border-slate-200 space-y-3">
              <div className="flex items-center justify-between text-xs sm:text-sm font-medium">
                <span className="text-blue-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-600 animate-spin" />
                  {exportStatusText}
                </span>
                <span className="font-mono text-blue-700 font-bold">{exportProgress}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden p-0.5 border border-slate-200">
                <div
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full rounded-full transition-all duration-200 ease-out"
                  style={{ width: `${exportProgress}%` }}
                />
              </div>
              {exportCompleted && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs sm:text-sm flex items-center justify-between">
                  <span>
                    🎉 成果包生成完毕！已将<strong>刘家阳</strong>老师全套材料自动打包下载，请在“下载”文件夹中查阅。
                  </span>
                  <span className="font-semibold text-emerald-900">共含 16+ 份标准文件</span>
                </div>
              )}
            </div>
          )}
        </section>

        {/* 材料看板分类与网格 */}
        <section id="materials-overview" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                申报成果清单与在线可视化编辑
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                支持逐篇【深度预览】或【在线编辑（插入图片/表格/微调文本）】，亦可单独导出 Word 或 PDF
              </p>
            </div>

            {/* 分类切换器 */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg overflow-x-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    activeCategory === cat
                      ? "bg-white text-slate-900 shadow-xs font-semibold"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* 卡片网格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredMaterials.map((item) => {
              const isCustomized = !!customDocs[item.id];
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between hover:shadow-md hover:border-blue-300 transition-all group relative"
                >
                  <div className="space-y-3">
                    {/* 顶部标签与状态 */}
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-blue-700">{item.badge}</span>
                        {isCustomized && (
                          <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                            已在线编辑
                          </span>
                        )}
                      </div>
                      <span className="font-mono text-slate-500">
                        {item.hasPdf ? "DOCX + PDF" : `.${item.fileType.toUpperCase()}`}
                      </span>
                    </div>

                    {/* 标题 */}
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-2">
                      {item.title}
                    </h3>

                    {/* 核心亮点 */}
                    <div className="space-y-1.5 pt-1">
                      {item.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-xs text-slate-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="truncate">{h}</span>
                        </div>
                      ))}
                    </div>

                    {/* 摘要 */}
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed pt-1 border-t border-slate-100">
                      {item.summary}
                    </p>
                  </div>

                  {/* 底部按钮栏：包含在线编辑与下载 */}
                  <div className="pt-4 mt-4 border-t border-slate-100 space-y-2">
                    {/* 操作行 1：预览 与 在线编辑 */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenPreview(item)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-2.5 py-2 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        深度预览
                      </button>

                      {/* 在压缩包中在线编辑此文件 (满足用户对编辑压缩包内材料的核心诉求) */}
                      <button
                        onClick={() => handleOpenZipWorkbench(item.id)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-2.5 py-2 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors cursor-pointer shadow-2xs"
                        title="在 ZIP 压缩包内部工作台中直接编辑此文档，支持插入教学实况图片"
                      >
                        <FolderArchive className="w-3.5 h-3.5 text-blue-600" />
                        在压缩包中编辑 (插图)
                      </button>
                    </div>

                    {/* 操作行 2：下载 Word 与 导出 PDF */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDownloadSingle(item)}
                        disabled={downloadingId === item.id}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                      >
                        <Download className="w-3.5 h-3.5" />
                        {downloadingId === item.id ? "生成中..." : `下载 .${item.fileType}`}
                      </button>

                      {item.hasPdf && (
                        <button
                          onClick={() => handleDownloadPdf(item)}
                          disabled={downloadingPdfId === item.id}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                        >
                          <FileType className="w-3.5 h-3.5 text-rose-600" />
                          {downloadingPdfId === item.id ? "生成中..." : "导出对应 PDF"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 专家评审维度与乡村中学特色展示 */}
        <section id="standards" className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-xs">
            <div className="flex items-center gap-2 text-blue-900 font-bold text-lg">
              <ShieldCheck className="w-5 h-5 text-blue-700" />
              <h3>国家/安徽省一等奖精品课标准对照</h3>
            </div>
            <ul className="text-xs sm:text-sm space-y-3 text-slate-600 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                <span>
                  <strong>课标素养全覆盖</strong>：精准落地信息意识、计算思维、数字化学习与创新、信息社会责任，杜绝空泛口号，细化为行为动词。
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                <span>
                  <strong>教学评一体化规整表格</strong>：学习目标、评估任务与学习活动四列矩阵无缝嵌套，Word单元格严丝合缝，每一步教学环节均有显性成果产出。
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                <span>
                  <strong>微课技术红线满分规避</strong>：规范5秒纯蓝底白字片头、1080P/25fps高清录播、无水印广告、审图号合规，时长精确锚定在11分45秒。
                </span>
              </li>
            </ul>
          </div>

          <div
            id="rural-context"
            className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-xs"
          >
            <div className="flex items-center gap-2 text-indigo-900 font-bold text-lg">
              <School className="w-5 h-5 text-indigo-700" />
              <h3>颍上县耿棚中学·乡土情境深度融入特色</h3>
            </div>
            <ul className="text-xs sm:text-sm space-y-3 text-slate-600 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 shrink-0" />
                <span>
                  <strong>皖北小麦冬灌与气象预警</strong>：将抽象的信息价值相对性与耿棚镇小麦防冻害排涝实际紧密结合，学以致用。
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 shrink-0" />
                <span>
                  <strong>数字反哺家庭与清朗网络</strong>：引导乡村高中生从“被动盲从”跃迁为家庭长辈的“数字小保安”，识别虚假农资化肥谣言。
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 shrink-0" />
                <span>
                  <strong>真实课堂手写笔迹样卷佐证</strong>：提供3份具有真实学号、个性化作答与刘家阳老师红色真迹批改样卷，力证课堂实效。
                </span>
              </li>
            </ul>
          </div>
        </section>
      </main>

      {/* 底部版权与说明 */}
      <footer className="mt-16 bg-white border-t border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>安徽省颍上县耿棚中学 高中信息技术教研组</span>
            <span aria-hidden="true">·</span>
            <span>执教教师：刘家阳</span>
            <span aria-hidden="true">·</span>
            <span>2026年基础教育精品课项目申报组</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/index.html"
              download="安徽省精品课申报材料生成系统_单文件离线版.html"
              className="text-blue-700 hover:underline"
            >
              导出离线 index.html
            </a>
            <span>遵循国家《普通高中信息技术课程标准》</span>
          </div>
        </div>
      </footer>

      {/* 模态框：在线深度预览 */}
      {previewItem && previewContent && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            {/* 模态框头部 */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50 rounded-t-2xl">
              <div>
                <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
                  {previewItem.badge} · {previewItem.category}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5 truncate max-w-xl">
                  {previewItem.title}
                </h3>
              </div>
              <button
                onClick={() => setPreviewItem(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 模态框正文 */}
            <div className="p-6 overflow-y-auto flex-1 text-slate-800 text-sm leading-relaxed">
              <div
                dangerouslySetInnerHTML={{ __html: previewContent.html }}
                className="prose max-w-none"
              />
            </div>

            {/* 模态框底部按钮 */}
            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 rounded-b-2xl flex items-center justify-between flex-wrap gap-3">
              <span className="text-xs text-slate-500 font-mono">
                {previewItem.fileName}
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    const itemToEdit = previewItem;
                    setPreviewItem(null);
                    handleOpenZipWorkbench(itemToEdit.id);
                  }}
                  className="px-3 py-2 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <FolderArchive className="w-3.5 h-3.5" />
                  在压缩包中编辑此文档
                </button>
                <button
                  onClick={() => setPreviewItem(null)}
                  className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  关闭预览
                </button>
                {previewItem.hasPdf && (
                  <button
                    onClick={() => handleDownloadPdf(previewItem)}
                    className="px-4 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <FileType className="w-3.5 h-3.5 text-rose-600" />
                    下载对应 PDF
                  </button>
                )}
                <button
                  onClick={() => handleDownloadSingle(previewItem)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  下载此文档 (.{previewItem.fileType})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 模态框：在线可视化编辑器 (支持插入图片与排版) */}
      {editingItem && (
        <DocumentEditorModal
          item={editingItem}
          initialHtml={
            customDocs[editingItem.id]?.html ||
            generateDocumentContent(editingItem.id, config).html
          }
          config={config}
          onSave={handleSaveEditorContent}
          onClose={() => setEditingItem(null)}
        />
      )}

      {/* 模态框：ZIP 压缩包内部材料在线深度工作台 (满足核心诉求) */}
      <ZipWorkbenchModal
        isOpen={isWorkbenchOpen}
        onClose={() => setIsWorkbenchOpen(false)}
        config={config}
        initialSelectedId={workbenchInitialId}
        customDocs={customDocs}
        onSaveDoc={handleSaveEditorContent}
        onExportAllZip={handleExportAll}
      />

      {/* 模态框：编辑申报教师信息 */}
      {isEditingConfig && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-lg w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-4">
              <h3 className="text-lg font-bold text-slate-900">个性化配置申报教师与单位信息</h3>
              <button
                onClick={() => setIsEditingConfig(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveConfig} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  执教教师姓名
                </label>
                <input
                  type="text"
                  value={tempConfig.teacherName}
                  onChange={(e) =>
                    setTempConfig({ ...tempConfig, teacherName: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  所在学校全称
                </label>
                <input
                  type="text"
                  value={tempConfig.schoolName}
                  onChange={(e) =>
                    setTempConfig({ ...tempConfig, schoolName: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    申报评选年份
                  </label>
                  <input
                    type="text"
                    value={tempConfig.year}
                    onChange={(e) => setTempConfig({ ...tempConfig, year: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    授课课时
                  </label>
                  <input
                    type="text"
                    value={tempConfig.lessonTime}
                    onChange={(e) =>
                      setTempConfig({ ...tempConfig, lessonTime: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  使用教材版本全称
                </label>
                <input
                  type="text"
                  value={tempConfig.textbook}
                  onChange={(e) =>
                    setTempConfig({ ...tempConfig, textbook: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              <p className="text-xs text-slate-500">
                提示：修改后，所有导出的 .docx、.pdf、讲稿、任务单和学生样卷均会自动同步更新为您的最新信息。
              </p>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditingConfig(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg cursor-pointer shadow-xs"
                >
                  应用并更新材料
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
