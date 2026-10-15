import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '安徽省颍上县耿棚中学·2026年基础教育精品课申报材料生成系统',
  description: '普通高中信息技术《1.3 信息及其特征》冲刺省一等奖成果包，提供教学设计、学习任务单、课件脚本、作业练习及学生样卷的一键导出与预览。',
  openGraph: {
    title: '安徽省颍上县耿棚中学·2026年基础教育精品课申报材料生成系统',
    description: '普通高中信息技术《1.3 信息及其特征》冲刺省一等奖成果包，提供教学设计、学习任务单、课件脚本、作业练习及学生样卷的一键导出与预览。',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '安徽省颍上县耿棚中学·2026年基础教育精品课申报材料生成系统',
    description: '普通高中信息技术《1.3 信息及其特征》冲刺省一等奖成果包，提供教学设计、学习任务单、课件脚本、作业练习及学生样卷的一键导出与预览。',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="zh-CN">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body suppressHydrationWarning className="bg-slate-50 text-slate-800 antialiased selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
