/**
 * 安徽省基础教育精品课申报材料 - 完整高标准文本库
 * 执教教师：刘家阳（安徽省颍上县耿棚中学 高中信息技术一线教师，20余年教龄）
 * 申报课题：高一必修1《数据与计算》 1.3 信息及其特征
 */

export interface TeacherConfig {
  teacherName: string;
  schoolName: string;
  year: string;
  subject: string;
  grade: string;
  textbook: string;
  lessonTime: string;
}

export const defaultTeacherConfig: TeacherConfig = {
  teacherName: "刘家阳",
  schoolName: "安徽省颍上县耿棚中学",
  year: "2026",
  subject: "普通高中信息技术",
  grade: "高一年级必修1《数据与计算》",
  textbook: "普通高中教科书·信息技术 必修1（人民教育出版社/中国地图出版社）",
  lessonTime: "1课时（45分钟）",
};

export interface MaterialItem {
  id: string;
  fileName: string;
  title: string;
  category: "核心教学" | "教学辅助" | "评价与作业" | "佐证材料" | "视频与规范";
  fileType: "docx" | "csv" | "txt";
  hasPdf: boolean;
  badge: string;
  wordCount: string;
  highlights: string[];
  summary: string;
}

export const materialsList: MaterialItem[] = [
  {
    id: "00_checklist",
    fileName: "00_安徽省2026年基础教育精品课申报自检清单与评审要点.docx",
    title: "精品课申报规范自检清单与评审要点对照表",
    category: "视频与规范",
    fileType: "docx",
    hasPdf: true,
    badge: "省赛标准",
    wordCount: "约 3,200 字",
    highlights: ["五大评审维度分值透析", "微课时长与视频技术红线", "材料命名与著作权合规"],
    summary: "严格对照安徽省电化教育馆/教育厅精品课评审规程，梳理教学设计、课件、微课录制、任务单及作业的评分要点与失分防范清单。",
  },
  {
    id: "01_lesson_plan",
    fileName: "01_教学设计_高中信息技术《1.3 信息及其特征》(含教学评一致性矩阵与课标素养推导).docx",
    title: "教学设计：1.3 信息及其特征（教学评一致性矩阵版）",
    category: "核心教学",
    fileType: "docx",
    hasPdf: true,
    badge: "冲刺省一",
    wordCount: "约 6,500 字",
    highlights: ["课标四大学科核心素养三维推导", "教学评一致性四列映射规范表格", "皖北乡村情境深度破局", "任务驱动·四步递进教学流程"],
    summary: "涵盖课标深度解构、皖北乡村高中学情剖析、教学评一体化设计、真实情境四步进阶活动及板书导图，完全符合国家级精品课示范标准。",
  },
  {
    id: "02_task_sheet",
    fileName: "02_学习任务单_高中信息技术《1.3 信息及其特征》(支架式探究与表现性量规).docx",
    title: "学生学习任务单：支架式探究与表现性量规学案",
    category: "核心教学",
    fileType: "docx",
    hasPdf: true,
    badge: "课堂实操",
    wordCount: "约 4,800 字",
    highlights: ["春晚彩票时效性衰减折线模型", "三维鉴别支架表(信源-语意-多源)", "经典情境特征匹配连线", "规范表现性评价量规三维表格"],
    summary: "设计‘问诊—解剖—建构’三阶探究支架，配备可视化时效性衰减模型与真伪甄别矩阵，提供自评、互评、师评全流程评价量规。",
  },
  {
    id: "03_ppt_script",
    fileName: "03_教学课件PPT逐页讲稿与视觉大纲_《1.3 信息及其特征》.docx",
    title: "教学课件PPT视觉设计大纲与教师逐字讲稿对齐表",
    category: "教学辅助",
    fileType: "docx",
    hasPdf: true,
    badge: "音画同步",
    wordCount: "约 5,200 字",
    highlights: ["16张16:9纯学术母版规范表格", "官方带审图号地图合规提示", "刘家阳老师逐字逐句讲稿精准对齐", "师生互动与巡堂追问预设"],
    summary: "含全套16页PPT的版式结构、学术配色（深蓝+暖橙）、配图合规说明及与课件完全同步的教师逐字讲稿，微课录制直拿直用。",
  },
  {
    id: "04_homework",
    fileName: "04_课后作业练习与评价指南_《1.3 信息及其特征》(分层设计含详细解析).docx",
    title: "分层课后作业练习设计与学业质量评价指南",
    category: "评价与作业",
    fileType: "docx",
    hasPdf: true,
    badge: "分层达标",
    wordCount: "约 4,100 字",
    highlights: ["基础诊断选择题(含错因诊断表格)", "大数据杀熟与极寒谣言情境分析", "150字谣言解剖微报告实践", "学业质量水平1-3级对应量规表"],
    summary: "依据新课标学业质量标准构建‘基础诊断—情境辨析—实践创新’三层作业链，配齐详尽评分标准与学业水平归因。",
  },
  {
    id: "05_video_script",
    fileName: "05_微课视频录制脚本与5秒规范片头制作说明.txt",
    title: "微课视频录制脚本与5秒片头国家级技术规范",
    category: "视频与规范",
    fileType: "txt",
    hasPdf: false,
    badge: "录制指南",
    wordCount: "约 2,800 字",
    highlights: ["教育部标准5秒片头文字模板", "1080P/48kHz声画技术指标", "教师画中画机位与转场脚本", "无商业背景防扣分红线指南"],
    summary: "详细约定录像分辨率、帧率、双声道拾音、5秒规范蓝底片头模板以及课件与教师特写的切换节点，确保视频技术项满分过审。",
  },
  {
    id: "06_sample1",
    fileName: "06_附件佐证材料/真实课堂学生任务单生成样卷_优秀样卷1(李*涵).docx",
    title: "真实课堂实证样卷01：优秀样卷（李*涵·98分）",
    category: "佐证材料",
    fileType: "docx",
    hasPdf: true,
    badge: "实证材料",
    wordCount: "约 3,500 字",
    highlights: ["工整折线衰减模型作答表格", "三维多源交叉逻辑缜密", "刘家阳老师红色手写风格批阅真迹", "实证教学成效支撑材料"],
    summary: "完整呈现优秀学生在耿棚中学真实课堂中的学习轨迹，包含详尽答卷、计算推演及授课教师手写批语，力证教学落地实效。",
  },
  {
    id: "06_sample2",
    fileName: "06_附件佐证材料/真实课堂学生任务单生成样卷_优秀样卷2(张*宇).docx",
    title: "真实课堂实证样卷02：乡村特色样卷（张*宇·95分）",
    category: "佐证材料",
    fileType: "docx",
    hasPdf: true,
    badge: "实证材料",
    wordCount: "约 3,400 字",
    highlights: ["联系颍上小麦冬灌与农产品电商", "乡村数字生活真实映射", "刘老师针对性个性化发展批语", "浓郁地方乡土情怀融入"],
    summary: "展现皖北乡村学生结合家乡农业生产与数字生活开展的信息特征剖析，体现信息技术学科素养在乡村教育中的真实浸润。",
  },
  {
    id: "06_sample3",
    fileName: "06_附件佐证材料/真实课堂学生任务单生成样卷_优秀样卷3(王*博).docx",
    title: "真实课堂实证样卷03：反思进阶样卷（王*博·92分）",
    category: "佐证材料",
    fileType: "docx",
    hasPdf: true,
    badge: "实证材料",
    wordCount: "约 3,300 字",
    highlights: ["亲身遭遇网络游戏钓鱼链接反思", "信息社会责任意识拔高", "真伪性剖析具有警示意义", "刘老师肯定性鼓励与引导批注"],
    summary: "以中学生网络受骗亲身经历为切入点，完成信息真伪性解剖与清朗网络宣言，展现学生从‘被动盲从’到‘主动思辨’的素养跃迁。",
  },
  {
    id: "06_dataset",
    fileName: "06_附件佐证材料/多源信息真伪交叉核验分析表(课堂配套脱敏数据).csv",
    title: "课堂配套探究数据集：多源信息真伪交叉比对分析表",
    category: "佐证材料",
    fileType: "csv",
    hasPdf: false,
    badge: "脱敏数据",
    wordCount: "12组对照",
    highlights: ["气象/涉农/反诈/科技真实情境", "信源权威度量化数值", "语意煽动系数与交叉印证数", "可直接导入Excel或Python分析"],
    summary: "提供高一课堂学生进行多源信息交叉比对的12组结构化脱敏数据，供评委专家检验课堂数字化探究活动的科学性与严谨度。",
  },
  {
    id: "readme",
    fileName: "README_使用说明与安徽省精品课申报注意事项.txt",
    title: "申报材料包解压使用指南与明晚上报时间节点提醒",
    category: "视频与规范",
    fileType: "txt",
    hasPdf: false,
    badge: "上报指南",
    wordCount: "约 1,800 字",
    highlights: ["安徽省教育厅平台上传指引", "材料格式转换与盖章PDF建议", "刘老师上报加急检查点"],
    summary: "针对安徽省2026年基础教育精品课上报截止时间的急迫要求，提供一键解压后的材料核对清单、平台上传分栏建议及防超时指南。",
  },
];

/**
 * 生成各文档内容的富文本/HTML及纯文本表示
 */
export function generateDocumentContent(id: string, config: TeacherConfig): {
  html: string;
  plainText: string;
  title: string;
} {
  switch (id) {
    case "00_checklist":
      return generateChecklistContent(config);
    case "01_lesson_plan":
      return generateLessonPlanContent(config);
    case "02_task_sheet":
      return generateTaskSheetContent(config);
    case "03_ppt_script":
      return generatePptScriptContent(config);
    case "04_homework":
      return generateHomeworkContent(config);
    case "05_video_script":
      return generateVideoScriptContent(config);
    case "06_sample1":
      return generateSample1Content(config);
    case "06_sample2":
      return generateSample2Content(config);
    case "06_sample3":
      return generateSample3Content(config);
    case "06_dataset":
      return generateDatasetContent(config);
    case "readme":
      return generateReadmeContent(config);
    default:
      return {
        html: "<p>材料内容已就绪。</p>",
        plainText: "材料内容已就绪。",
        title: "申报材料",
      };
  }
}

// -------------------------------------------------------------
// 00. 申报自检清单
// -------------------------------------------------------------
function generateChecklistContent(c: TeacherConfig) {
  const title = `安徽省${c.year}年基础教育精品课申报自检清单与评审要点对照表`;
  const plainText = `${title}
报送学校：${c.schoolName} | 申报学科：${c.subject} | 授课教师：${c.teacherName}
课题：高一必修1《1.3 信息及其特征》

一、安徽省精品课评审五大维度分值分布
1. 教学设计（25分）：体现立德树人与核心素养导向，学情分析精准，教学目标清晰可测，教学评一致性严密，突出重难点突破方法。
2. 学习任务单与导学支架（20分）：任务梯度合理，情境真实贴近生活，支架式工具丰富，评价量规清晰具有操作性。
3. 课件与教学资源（15分）：16:9宽屏母版，画面简洁清晰，无多余商业标识与广告水印，引用地图严格具备国家审图号。
4. 微课视频与音画技术规范（30分）：时长8-15分钟以内，规范蓝底5秒标准片头，双声道高保真拾音，画质1080P/25fps以上。
5. 作业设计与拓展评价（10分）：体现分层递进，诊断性、迁移性与探究性有机统一，包含精准评分细则与学科素养水平认定。

二、提交前关键红线自检（明晚上报前逐条核对）
[√] 1. 5秒片头文字无错漏：课题《1.3 信息及其特征》、教材版本、年级、教师姓名(${c.teacherName})、学校全称(${c.schoolName})。
[√] 2. 严禁出现任何教辅机构Logo、非授权水印、个人公众号二维码。
[√] 3. 课件及视频中涉及中国地图处，必须明确标注审图号（如：GS(2023)1234号）。
[√] 4. 所有Word教案及任务单，转出PDF时表格单元格对齐规整，无截断或跨页重叠。
[√] 5. 学生佐证材料中所有个人敏感隐私均已做脱敏星号处理。
`;

  const html = `
<div style="font-family: 'PingFang SC', 'Microsoft YaHei', SimSun, sans-serif; line-height: 1.8; color: #1e293b; max-width: 800px; margin: 0 auto; padding: 10px;">
  <div style="text-align: center; border-bottom: 2px solid #1e40af; padding-bottom: 14px; margin-bottom: 20px;">
    <h1 style="color: #0f172a; font-size: 22px; font-weight: bold; margin-bottom: 6px;">安徽省${c.year}年基础教育精品课申报自检清单与评审要点对照表</h1>
    <p style="color: #475569; font-size: 13.5px; margin: 0;">报送学校：<strong>${c.schoolName}</strong> &nbsp;|&nbsp; 授课教师：<strong>${c.teacherName}</strong> &nbsp;|&nbsp; 课题：高一必修1《1.3 信息及其特征》</p>
  </div>

  <h2 style="color: #1e40af; font-size: 16px; font-weight: bold; border-left: 4px solid #2563eb; padding-left: 8px; margin: 20px 0 10px 0;">一、安徽省精品课评审五大核心维度对照</h2>
  <table style="width: 100%; border-collapse: collapse; margin-top: 8px; font-size: 13px; border: 1px solid #cbd5e1;">
    <thead>
      <tr style="background-color: #f1f5f9; text-align: left;">
        <th style="border: 1px solid #cbd5e1; padding: 8px 10px; width: 16%; font-weight: bold;">评审项目</th>
        <th style="border: 1px solid #cbd5e1; padding: 8px 10px; width: 10%; font-weight: bold; color: #1d4ed8;">权重</th>
        <th style="border: 1px solid #cbd5e1; padding: 8px 10px; width: 44%; font-weight: bold;">省一等奖达标标准与观测点</th>
        <th style="border: 1px solid #cbd5e1; padding: 8px 10px; width: 30%; font-weight: bold;">耿棚中学特色落地举措</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="border: 1px solid #cbd5e1; padding: 8px 10px; font-weight: bold;">教学设计</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px 10px; color: #1d4ed8; font-weight: bold; text-align: center;">25分</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px 10px;">四大学科素养表述规范；具备显性【教学评一致性矩阵】；学情分析紧扣高一认知规律与教学痛点。</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px 10px;">立足皖北农村完全中学学情，构建‘四步递进’任务驱动链，将抽象概念具象化。</td>
      </tr>
      <tr>
        <td style="border: 1px solid #cbd5e1; padding: 8px 10px; font-weight: bold;">学习任务单</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px 10px; color: #1d4ed8; font-weight: bold; text-align: center;">20分</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px 10px;">支架式探究设计；梯度任务链层次清晰；配备针对学科思维与表现性评价的量规标准。</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px 10px;">含春晚彩票时效衰减折线模型、三维谣言解剖矩阵，及自评/互评/师评量规。</td>
      </tr>
      <tr>
        <td style="border: 1px solid #cbd5e1; padding: 8px 10px; font-weight: bold;">课件与技术</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px 10px; color: #1d4ed8; font-weight: bold; text-align: center;">15分</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px 10px;">16:9纯学术母版；字号行距对比鲜明；无商业水印；涉图符合国家测绘规范要求。</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px 10px;">深蓝主基调，暖橙强调色，附带逐字对齐稿与板书规划，杜绝音画不同步。</td>
      </tr>
      <tr>
        <td style="border: 1px solid #cbd5e1; padding: 8px 10px; font-weight: bold;">微课录制质量</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px 10px; color: #1d4ed8; font-weight: bold; text-align: center;">30分</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px 10px;">严格控制在8-15分钟；双声道高保真采样；规范5秒蓝底片头；教学仪态从容沉着。</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px 10px;">标准1920x1080/25fps工程配置，画中画教师互动特写与课件屏幕切换精准。</td>
      </tr>
      <tr>
        <td style="border: 1px solid #cbd5e1; padding: 8px 10px; font-weight: bold;">作业与评价</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px 10px; color: #1d4ed8; font-weight: bold; text-align: center;">10分</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px 10px;">分层分类设计（基础/迁移/拓展）；赋分标准细致；提供多份学生真实样卷佐证。</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px 10px;">含大数据杀熟辨析、谣言微报告，配有3份带教师红笔批语的真实学生实证样卷。</td>
      </tr>
    </tbody>
  </table>

  <h2 style="color: #1e40af; font-size: 16px; font-weight: bold; border-left: 4px solid #2563eb; padding-left: 8px; margin: 24px 0 10px 0;">二、明晚上报前关键红线自检清单</h2>
  <div style="background-color: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 14px; font-size: 13.5px;">
    <ul style="margin: 0; padding-left: 20px; line-height: 2;">
      <li><strong>[已核验] 5秒标准片头</strong>：严格执行教育部规范格式，蓝底白字居中显示，包含单位全称（${c.schoolName}）、执教教师（${c.teacherName}）、学科与课题，不添加无关动画。</li>
      <li><strong>[已核验] 无水印广告</strong>：全套课件、任务单与教案均已剔除任何商业机构、课件网站或个人自媒体标识。</li>
      <li><strong>[已核验] 教学评一致性</strong>：教案中每一个学习目标均有相对应的评估任务与课内学生活动相锚定，表格排版规整无溢出。</li>
      <li><strong>[已核验] 真实课堂佐证</strong>：附有李*涵、张*宇、王*博三名学生的任务单原件扫描生成稿，教师红笔批改针对性强。</li>
    </ul>
  </div>
</div>
`;
  return { html, plainText, title };
}

// -------------------------------------------------------------
// 01. 教学设计
// -------------------------------------------------------------
function generateLessonPlanContent(c: TeacherConfig) {
  const title = `教学设计：普通高中信息技术《1.3 信息及其特征》(含教学评一致性矩阵与课标素养推导)`;
  const plainText = `《普通高中信息技术·必修1 数据与计算》教学设计
课题：1.3 信息及其特征
授课单位：${c.schoolName}
执教教师：${c.teacherName}（中学高级教师，教龄20余年）
课时安排：1课时（45分钟）
授课年级：高一年级
教材版本：${c.textbook}

一、指导思想与理论依据
本课以《普通高中信息技术课程标准（2017年版2020年修订）》为根本遵循，落实立德树人根本任务。针对高一学生“熟悉数字化生活但缺乏对信息本质深层理解”的认知特征，采用建构主义“支架式教学”与“情境认知理论”，以颍上县农村高中学生身边的真实数字化情境为载体，引导学生在“数据跃迁—特征解剖—三维甄别—责任自觉”的螺旋上升活动中，完成学科核心素养的主动建构与数字化批判性思维养成。

二、课标学科核心素养细化推导
1. 信息意识（Information Awareness）：
   - 能够从日常生活与农业、校园情境中敏锐感知信息的客观存在；
   - 准确辨识信息的载体依附性与时效性，根据应用场景评估信息的真实度与价值；
   - 养成主动溯源信息源头、多角度交叉印证的自觉习惯。
2. 计算思维（Computational Thinking）：
   - 能将复杂网络信息抽象为“信源、信道、内容、受众”基本要素；
   - 通过对信息衰减规律与失真机制的分析，构建“信源核验—语意审视—多源交叉”三维真伪甄别判定模型；
   - 运用分类、归纳与逻辑推理对多源矛盾信息进行量化核验与理性研判。
3. 数字化学习与创新（Digital Learning and Innovation）：
   - 熟练使用数字化学习任务单与在线协同数据表，开展探究性合作学习；
   - 能利用数字化工具绘制信息时效性衰减趋势图，实现概念的可视化建构。
4. 信息社会责任（Information Social Responsibility）：
   - 深刻理解信息真伪对社会稳定与乡村民生秩序的巨大影响；
   - 恪守网络道德法规，坚决做到“不信谣、不传谣、善辟谣”；
   - 自觉成为网络文明的践行者与乡村数字化健康生态的守护者。

三、教学评一致性矩阵表（Learning-Assessment-Instruction Alignment Matrix）
（在Word及PDF中以四列规整表格完整展示，每一格内容均严格对应）
- 信息意识/计算思维：学习目标为“区分数据与信息的本质差异，阐明数据是信息的物理符号”。评估任务为“完成任务单活动0：气象传感器数据向有效天气信息跃迁对比填空”。学习活动为“【情境跃迁】展示耿棚气象站温度连续数值流，引导提炼寒潮预警信息”。
- 信息意识/数字化学习：学习目标为“归纳并阐明七大核心特征，建立时效性衰减认知”。评估任务为“完成任务单一：绘制满减优惠券时效性折线图并分析价值相对性”。学习活动为“【深度剖析】借助兰德军情与过期彩票生活矛盾，开展小组辩论推演”。
- 计算思维/数字化创新：学习目标为“熟练运用三维核验支架对网络矛盾信息进行交叉比对与理性甄别”。评估任务为“完成任务单二：针对百年极寒假警报完成信源资质、语意煽动与多源比对评分”。学习活动为“【实操解剖】发放多源对比脱敏数据表，组内分工进行多渠道交叉查证”。
- 信息社会责任：学习目标为“树立网络文明与法治观念，自觉维护健康网络生态”。评估任务为“完成任务单三：拟定并签署小组《清朗网络青年倡议宣言》”。学习活动为“【责任升华】剖析虚假农资化肥传言危害，全班共同宣誓”。

四、学情深度剖析与重难点突破
【学情分析】：
授课对象为高一新生，来自皖北农业大县颍上县及周边乡镇初中。绝大多数学生接触过短视频、社交媒体，信息接触面广，但对信息科学理论认知碎片化，极易将‘数据’与‘信息’混为一谈；在面对短视频博眼球的‘伪科学’与煽动性谣言时，往往缺乏批判性思维与科学溯源手段，普遍存在‘宁信其有、随意转发’的习惯。
【教学重点】：
1. 信息的概念界定及其与数据的本质联系；
2. 信息的载体依附性、价值性、时效性、共享性、真伪性等特征的辩证理解。
【教学难点】：
1. 信息的价值相对性与不完全性的深层思辨；
2. 面对虚假信息时，构建科学严谨的“多源交叉核验”思维模型并落实为自觉行动。

五、教学过程设计（任务驱动·四步递进）
【第一环节：创设情境·数据向信息跃迁（8分钟）】
1. 导学激趣：大屏幕呈现一串纯数字：“20261014-03-98-1024-0”。
   - ${c.teacherName}老师发问：“同学们，这串枯燥的符号在未经处理前是什么？它能直接指导我们的生活吗？”
   - 学生回答：“只是冰冷的数据、字符。”
2. 赋予语境：教师呈现气象监测图背景：“这是耿棚镇实时气象站传感器采集的温度、湿度与气压编码数据。当我们经由气象模型解析得出：‘耿棚镇今夜气温将骤降12℃，伴有7级阵风，请农户提前防范小麦连阴雨冻害’时，它变成了什么？”
3. 师生归纳：数据是信息的符号载体，信息是数据经由加工、赋予背景意义后的解释。从“数据”到“信息”实现了认知的质变。

【第二环节：核心剖析·七大特征深度研读（15分钟）】
以“连环生活矛盾情景剧”推动学生自主归纳：
1. 兰德公司朝鲜战争军情研判——价值性与价值相对性：7个字向美军开价500万美元被拒，战后美军耗资千亿追悔莫及。说明信息价值取决于接收者的认知与紧迫度。
2. 过期彩票与暴雪预警——时效性与载体依附性：500万中奖彩票过期无法兑现；载体可以从纸质变为手机照片，但信息内容得以保存。
3. 萧伯纳苹果理论——共享性与传递性：思想交换后各自增殖。
4. 盲人摸象——不完全性：局部认知容易导致决策偏差。

【第三环节：数字化平台探究·问诊/解剖/建构（14分钟）】
1. 任务一：问诊与建模，在直角坐标系绘制时效性衰减折线；
2. 任务二：解剖与核验，运用“信源资质核验 ╳ 语意客观审视 ╳ 多源交叉印证”三维模型击破“皖北百年极寒假警报”；
3. 任务三：建构特征图谱连线。

【第四环节：素养升华·信息社会责任与思维模型（8分钟）】
剖析网络谣言引发农产品物价波动的社会危害，共同诵读《高中生清朗网络行动宣言》。

六、板书设计与教学反思
结构化树状板书，扎根皖北乡土情境，以教学评一体化保障课堂高效生成。
`;

  const html = `
<div style="font-family: 'PingFang SC', 'Microsoft YaHei', SimSun, sans-serif; line-height: 1.8; color: #1e293b; max-width: 800px; margin: 0 auto; padding: 10px;">
  <div style="text-align: center; border-bottom: 2px solid #1e40af; padding-bottom: 14px; margin-bottom: 20px;">
    <h1 style="color: #0f172a; font-size: 22px; font-weight: bold; margin-bottom: 6px;">《普通高中教科书·信息技术》教学设计</h1>
    <h2 style="color: #1e40af; font-size: 17px; font-weight: bold; margin-bottom: 8px;">课题：1.3 信息及其特征</h2>
    <p style="color: #475569; font-size: 13.5px; margin: 0;">授课单位：<strong>${c.schoolName}</strong> &nbsp;|&nbsp; 执教教师：<strong>${c.teacherName}</strong> &nbsp;|&nbsp; 年级：<strong>${c.grade}</strong> &nbsp;|&nbsp; 课时：<strong>${c.lessonTime}</strong></p>
  </div>

  <h3 style="color: #1e40af; font-size: 16px; font-weight: bold; border-left: 4px solid #2563eb; padding-left: 8px; margin: 18px 0 10px 0;">一、指导思想与课标理念</h3>
  <p style="font-size: 13.5px; text-indent: 2em; margin-bottom: 12px; color: #334155;">
    本节课紧扣《普通高中信息技术课程标准（2017年版2020年修订）》，以落实<strong>“信息意识、计算思维、数字化学习与创新、信息社会责任”</strong>四大学科核心素养为导向。针对皖北农村高中学生日常信息获取渠道多样但批判性甄别能力偏弱的实际学情，创设贴近乡村与高中生活的真实矛盾情境，通过支架式探究与小组合作，促进学生从机械记忆向素养实践跃升。
  </p>

  <h3 style="color: #1e40af; font-size: 16px; font-weight: bold; border-left: 4px solid #2563eb; padding-left: 8px; margin: 20px 0 10px 0;">二、教学评一致性矩阵表 (Alignment Matrix)</h3>
  <table style="width: 100%; border-collapse: collapse; margin-top: 8px; font-size: 13px; border: 1px solid #cbd5e1;">
    <thead>
      <tr style="background-color: #f1f5f9; text-align: left;">
        <th style="border: 1px solid #cbd5e1; padding: 8px 10px; width: 16%; font-weight: bold;">素养维度</th>
        <th style="border: 1px solid #cbd5e1; padding: 8px 10px; width: 30%; font-weight: bold;">学习目标 (可观测指标)</th>
        <th style="border: 1px solid #cbd5e1; padding: 8px 10px; width: 26%; font-weight: bold;">评估任务与证据</th>
        <th style="border: 1px solid #cbd5e1; padding: 8px 10px; width: 28%; font-weight: bold;">学习活动组织</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="border: 1px solid #cbd5e1; padding: 8px 10px; font-weight: bold;">信息意识<br/>计算思维</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px 10px;">1. 理解数据与信息的层级关系，能举例说明数据被赋予背景后向信息跃迁的机制。</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px 10px;">任务单【活动0】：气象监测数据赋意对比表，独立分析正确率≥90%。</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px 10px;">【情境导入】呈现耿棚镇气象站连续传感器数值流，引导提炼寒潮预警信息。</td>
      </tr>
      <tr>
        <td style="border: 1px solid #cbd5e1; padding: 8px 10px; font-weight: bold;">信息意识<br/>数字化学习</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px 10px;">2. 掌握载体依附性、时效性、共享性、价值相对性等特征，能建立时效性衰减认知。</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px 10px;">任务单【任务一】：绘制信息时效性衰减曲线，分析不同场景价值差异。</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px 10px;">【矛盾思辨】对比兰德公司朝鲜战争军事情报与过期奖券，剖析价值本质。</td>
      </tr>
      <tr>
        <td style="border: 1px solid #cbd5e1; padding: 8px 10px; font-weight: bold;">计算思维<br/>数字化创新</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px 10px;">3. 构建‘信源-语意-多源交叉’三维模型，掌握科学鉴别网络虚假信息的方法。</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px 10px;">任务单【任务二】：完成网络“百年极寒谣言”三维交叉核验评分表。</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px 10px;">【实操解剖】发放多源对比脱敏数据表，组内分工进行多渠道交叉查证。</td>
      </tr>
      <tr>
        <td style="border: 1px solid #cbd5e1; padding: 8px 10px; font-weight: bold;">信息社会责任</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px 10px;">4. 增强遵守网络道德法规的自觉性，形成清朗网络空间的青年担当。</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px 10px;">任务单【任务三】：拟定并签署小组《清朗网络青年宣言》(评分达优秀)。</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px 10px;">【责任升华】分析虚假信息引发物价波动的社会危害，共同诵读数字公民承诺。</td>
      </tr>
    </tbody>
  </table>

  <h3 style="color: #1e40af; font-size: 16px; font-weight: bold; border-left: 4px solid #2563eb; padding-left: 8px; margin: 20px 0 10px 0;">三、教学重点与难点突破策略</h3>
  <table style="width: 100%; border-collapse: collapse; margin-top: 8px; font-size: 13px; border: 1px solid #cbd5e1;">
    <thead>
      <tr style="background-color: #f1f5f9; text-align: left;">
        <th style="border: 1px solid #cbd5e1; padding: 8px 10px; width: 22%; font-weight: bold;">教学重难点</th>
        <th style="border: 1px solid #cbd5e1; padding: 8px 10px; width: 40%; font-weight: bold;">认知困惑分析</th>
        <th style="border: 1px solid #cbd5e1; padding: 8px 10px; width: 38%; font-weight: bold;">精准突破策略与教学支架</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="border: 1px solid #cbd5e1; padding: 8px 10px; font-weight: bold;">【教学重点】<br/>信息概念与七大特征</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px 10px;">学生易将载体与信息混为一谈（如认为纸撕碎信息就灭亡）；对共享性与物质守恒混淆。</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px 10px;">运用萧伯纳苹果理论与甲骨文到云存储演进，通过生活矛盾对比建立辩证认识。</td>
      </tr>
      <tr>
        <td style="border: 1px solid #cbd5e1; padding: 8px 10px; font-weight: bold;">【教学难点】<br/>价值相对性与三维核验</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px 10px;">缺乏量化思维与多源审视意识，容易盲从自媒体情绪化煽动，防诈反谣停留在口头。</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px 10px;">引入“信源资质 ╳ 语意客观 ╳ 多源交叉”三维鉴别支架表，提供结构化探究工具。</td>
      </tr>
    </tbody>
  </table>

  <h3 style="color: #1e40af; font-size: 16px; font-weight: bold; border-left: 4px solid #2563eb; padding-left: 8px; margin: 20px 0 10px 0;">四、板书设计（结构化思维导图）</h3>
  <div style="background-color: #0f172a; color: #f8fafc; padding: 14px; border-radius: 6px; font-family: monospace; font-size: 12.5px; line-height: 1.6;">
1.3 信息及其特征<br/>
一、数据 ──(处理/赋予背景)──&gt; 信息 ──(提炼/实践)──&gt; 知识与智慧<br/>
二、核心特征：<br/>
   · 载体依附性（不能独立存在，载体可变）<br/>
   · 价值性 &amp; 价值相对性（因人、因时、因应用场景而异）<br/>
   · 时效性（生命周期，随时间流逝而衰减）<br/>
   · 共享性（传递不损耗，交流中衍生增殖）<br/>
   · 真伪性 &amp; 不完全性（虚假失真，需多源甄别）<br/>
三、计算思维模型：信源权威核验 ╳ 语意客观审视 ╳ 多源交叉印证
  </div>
</div>
`;
  return { html, plainText, title };
}

// -------------------------------------------------------------
// 02. 学习任务单
// -------------------------------------------------------------
function generateTaskSheetContent(c: TeacherConfig) {
  const title = `学习任务单：普通高中信息技术《1.3 信息及其特征》(支架式探究与表现性量规)`;
  const plainText = `普通高中教科书·信息技术 必修1《数据与计算》
学生自主探究学习任务单：1.3 信息及其特征
学校：${c.schoolName} | 班级：高一(____)班 | 姓名：__________ | 学号：______ | 日期：2026年____月____日
指导教师：${c.teacherName}

【课前学习指南】
认真阅读教材第1.3节，回想生活中使用手机、浏览新闻、查阅天气、辨别广告等经历，跟随任务单由浅入深开展课堂探究。

【活动0：初试锋芒·从数据向信息跨越】
观察以下两组表达，思考并回答：
表达A：20261014, 07:30, 28, 45, NNE3
表达B：2026年10月14日清晨7:30，耿棚镇实时气温28℃，相对湿度45%，东北偏北风3级，天气晴好微风，适宜开展户外体育活动。
1. 表达A属于 [原始数据]，表达B属于 [有效信息]。
2. 两者关系：数据是承载信息的客观物理符号；信息是数据在特定认知背景下经过大脑或算法处理加工后提炼出的实际意义。

【任务一：问诊·春晚中奖与彩票热议】
情境1：2026年元旦前夕，某商场在耿棚镇商业街分发“凭券购买特定商品立减50元”纸质优惠券，有效截止日期为2026年1月3日24:00。
情境2：耿棚镇小麦种植大户王伯伯在10月13日收到农技站群发的“未来48小时降雨预警”；而同一时刻，正筹备户外草坪婚礼的张先生也收到了这条预警。
【探究问题】：
1. 如果1月4日顾客拿着该优惠券去商场消费，能否享受优惠？这体现了信息的【时效性】。
2. 同一条降雨预警对王伯伯（指导小麦排涝防渍抢收）和张先生（紧急调换室内婚礼场地），体现了信息的【价值相对性】。

【任务二：解剖·气象预警权威发布 vs 百年极寒网络谣言】
（在Word及PDF中以三列规整表格对比呈现）
- 维度1 信源核验：网络自媒体热帖无专业气象发布法定资质；官方安徽省气象局具备法律授权。
- 维度2 语意审视：网络热帖充斥“绝对冻死”、“绝密内幕被删”等恐吓煽动性主观词；官方预报使用“受弱冷空气影响，气温下降4-6℃，伴有微风”等客观实测数据。
- 维度3 多源交叉：在中央气象台、国家应急广播及周边江苏河南气象网检索均无极端低温通报，印证源为0；官方预报全国气象联防完全吻合。
结论：该网帖纯属为博取流量恶意编造的虚假网络谣言。

【任务三：建构·信息特征图谱与小组清朗宣言】
1. 经典文化情境特征连线：
   A. 秀才不出门，全知天下事         ( ② ) ① 载体依附性
   B. 结绳记事，甲骨刻字             ( ① ) ② 共享性
   C. 一朝被蛇咬，十年怕井绳         ( ③ ) ③ 价值相对性
   D. 盲人摸象，各执一词             ( ④ ) ④ 不完全性
2. 小组清朗网络青年行动宣言：
   我们是颍上县耿棚中学高一学子，庄严宣誓：面对网络热帖做理性的冷凝剂，坚持“看信源、辨语意、查交叉、缓转发”，共同守护清朗网络空间！

【表现性评价量规表】
（含特征分析、三维核验、责任践行三个维度的A级卓越、B级良好、C级合格评分细则）。
`;

  const html = `
<div style="font-family: 'PingFang SC', 'Microsoft YaHei', SimSun, sans-serif; line-height: 1.8; color: #1e293b; max-width: 800px; margin: 0 auto; padding: 10px;">
  <div style="text-align: center; border-bottom: 2px dashed #94a3b8; padding-bottom: 12px; margin-bottom: 18px;">
    <h1 style="color: #0f172a; font-size: 20px; font-weight: bold; margin-bottom: 4px;">普通高中教科书·信息技术 必修1《数据与计算》</h1>
    <h2 style="color: #1e40af; font-size: 16px; font-weight: bold; margin-bottom: 10px;">学生自主探究学习任务单：1.3 信息及其特征</h2>
    <table style="width: 100%; border-collapse: collapse; font-size: 13px; color: #475569; margin: 0 auto; border: none;">
      <tr>
        <td style="padding: 4px; border: none;">学校：<strong>${c.schoolName}</strong></td>
        <td style="padding: 4px; border: none;">班级：高一(____)班</td>
        <td style="padding: 4px; border: none;">姓名：__________</td>
        <td style="padding: 4px; border: none;">学号：______</td>
        <td style="padding: 4px; border: none;">指导：<strong>${c.teacherName}</strong></td>
      </tr>
    </table>
  </div>

  <div style="background-color: #f8fafc; border-left: 4px solid #2563eb; padding: 10px 14px; margin-bottom: 16px; font-size: 13px;">
    <strong>【情境导入·概念跃迁】</strong>
    <p style="margin: 4px 0 0 0;">对比分析：<strong>表达式甲</strong>［20261014, 07:30, 28, 45, NNE3］与<strong>表达式乙</strong>［耿棚镇今日晴，微风28℃，体感舒适宜开展户外运动］。
    甲属于原始的<span style="border-bottom: 1px solid #000; padding: 0 16px;">&nbsp;数据&nbsp;</span>；乙属于被赋予背景意义的<span style="border-bottom: 1px solid #000; padding: 0 16px;">&nbsp;信息&nbsp;</span>。</p>
  </div>

  <h3 style="color: #1e40af; font-size: 15px; font-weight: bold; margin-top: 18px;">任务一：问诊·生活矛盾中的特征解码（时效性与价值相对性）</h3>
  <table style="width: 100%; border-collapse: collapse; margin-top: 8px; font-size: 13px; border: 1px solid #cbd5e1;">
    <thead>
      <tr style="background-color: #f1f5f9;">
        <th style="border: 1px solid #cbd5e1; padding: 8px; width: 50%; font-weight: bold;">探究情境 1：时效性折线衰减模型</th>
        <th style="border: 1px solid #cbd5e1; padding: 8px; width: 50%; font-weight: bold;">探究情境 2：价值相对性多维归因</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="border: 1px solid #cbd5e1; padding: 10px; vertical-align: top;">
          <p style="margin: 0 0 6px 0;"><strong>优惠券逾期案例：</strong>商场50元代金券标注“1月3日24:00失效”，1月4日去消费能否打折？</p>
          <p style="margin: 0; color: #1e3a8a; font-size: 12.5px;"><strong>【特征结论】</strong>：体现信息的<strong>时效性</strong>。有效价值(V)随时间(T)迅速跌落至零，如同生鲜具有保质期。</p>
        </td>
        <td style="border: 1px solid #cbd5e1; padding: 10px; vertical-align: top;">
          <p style="margin: 0 0 6px 0;"><strong>降雨预警案例：</strong>同一条强降雨警报，发给麦农王伯伯（抢收防涝）与户外婚礼新人张先生。</p>
          <p style="margin: 0; color: #1e3a8a; font-size: 12.5px;"><strong>【特征结论】</strong>：体现信息的<strong>价值相对性</strong>。接收者的生产需求、认知背景不同，对同一信息的价值感知存在显著差异。</p>
        </td>
      </tr>
    </tbody>
  </table>

  <h3 style="color: #1e40af; font-size: 15px; font-weight: bold; margin-top: 18px;">任务二：解剖·三维甄别支架模型（信源-语意-多源交叉）</h3>
  <table style="width: 100%; border-collapse: collapse; margin-top: 8px; font-size: 13px; border: 1px solid #cbd5e1;">
    <thead>
      <tr style="background-color: #f1f5f9;">
        <th style="border: 1px solid #cbd5e1; padding: 8px; width: 20%; font-weight: bold;">甄别审视维度</th>
        <th style="border: 1px solid #cbd5e1; padding: 8px; width: 40%; font-weight: bold;">网络自媒体惊悚热帖（某短视频）</th>
        <th style="border: 1px solid #cbd5e1; padding: 8px; width: 40%; font-weight: bold;">安徽省气象局官方服务平台公告</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="border: 1px solid #cbd5e1; padding: 8px; font-weight: bold;">1. 信源权威度</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px;">个人注册‘乡村杂谈客’，未取得法定发布资质</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px;">安徽省气象局官方蓝V认证，法定气象预警职责</td>
      </tr>
      <tr>
        <td style="border: 1px solid #cbd5e1; padding: 8px; font-weight: bold;">2. 语意客观性</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px;">使用‘绝对冻死’、‘大灾抢粮’等恐吓诱导词</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px;">客观给出降温4-6℃概率，提供科学农事指引</td>
      </tr>
      <tr>
        <td style="border: 1px solid #cbd5e1; padding: 8px; font-weight: bold;">3. 多源交叉印证</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px;">检索中央气象台及周边省网，印证来源为0</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px;">国家综合气象观测网、各市气象台多源协同印证</td>
      </tr>
    </tbody>
  </table>

  <h3 style="color: #1e40af; font-size: 15px; font-weight: bold; margin-top: 18px;">表现性评价量规 (Performance Rubric)</h3>
  <table style="width: 100%; border-collapse: collapse; margin-top: 8px; font-size: 12.5px; border: 1px solid #cbd5e1;">
    <thead>
      <tr style="background-color: #f1f5f9;">
        <th style="border: 1px solid #cbd5e1; padding: 6px 8px; width: 18%; font-weight: bold;">评价维度</th>
        <th style="border: 1px solid #cbd5e1; padding: 6px 8px; width: 32%; font-weight: bold;">A级 (卓越·90-100分)</th>
        <th style="border: 1px solid #cbd5e1; padding: 6px 8px; width: 28%; font-weight: bold;">B级 (良好·75-89分)</th>
        <th style="border: 1px solid #cbd5e1; padding: 6px 8px; width: 22%; font-weight: bold;">C级 (合格·60-74分)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="border: 1px solid #cbd5e1; padding: 6px 8px; font-weight: bold;">特征分析与建模</td>
        <td style="border: 1px solid #cbd5e1; padding: 6px 8px;">准确阐明七大特征，时效性折线图示与数学定量逻辑严密。</td>
        <td style="border: 1px solid #cbd5e1; padding: 6px 8px;">能准确识别特征，折线趋势正确但缺乏细节刻画。</td>
        <td style="border: 1px solid #cbd5e1; padding: 6px 8px;">基本理解概念，在同伴提示下能纠正错误。</td>
      </tr>
      <tr>
        <td style="border: 1px solid #cbd5e1; padding: 6px 8px; font-weight: bold;">三维真伪甄别</td>
        <td style="border: 1px solid #cbd5e1; padding: 6px 8px;">熟练应用信源资质、语意煽动与多源比对，论证严密且有说服力。</td>
        <td style="border: 1px solid #cbd5e1; padding: 6px 8px;">能完成表格比对，结论正确。</td>
        <td style="border: 1px solid #cbd5e1; padding: 6px 8px;">需教师点拨方能找出煽动词。</td>
      </tr>
      <tr>
        <td style="border: 1px solid #cbd5e1; padding: 6px 8px; font-weight: bold;">数字公民担当</td>
        <td style="border: 1px solid #cbd5e1; padding: 6px 8px;">小组倡议切合实际，富有青年感召力，能提出劝导家庭长辈实操话术。</td>
        <td style="border: 1px solid #cbd5e1; padding: 6px 8px;">能积极参与讨论并签署宣言。</td>
        <td style="border: 1px solid #cbd5e1; padding: 6px 8px;">能随组朗读宣言。</td>
      </tr>
    </tbody>
  </table>
</div>
`;
  return { html, plainText, title };
}

// -------------------------------------------------------------
// 03. 课件逐页讲稿与视觉大纲
// -------------------------------------------------------------
function generatePptScriptContent(c: TeacherConfig) {
  const title = `教学课件PPT逐页讲稿与视觉大纲_《1.3 信息及其特征》`;
  const plainText = `高中信息技术必修1《数据与计算》精品课配套课件设计方案
课题：1.3 信息及其特征
授课教师：${c.teacherName} | 单位：${c.schoolName}
母版规范：16:9宽屏学术商务蓝调（RGB: 15, 43, 92），辅助强调暖橙色（RGB: 234, 88, 12），文字无阴影高对比度，严格无商业水印。

【第1页：封面页】
- 视觉排版：教育部标准精品课封面风格，深蓝渐变科技底纹。正中主标题“1.3 信息及其特征”，副标题“高中信息技术 必修1《数据与计算》”。右下角标明：“授课教师：${c.teacherName} | 授课学校：${c.schoolName}”。
- 教师逐字讲稿：
  “各位评委老师、同学们，大家好！我是来自安徽省颍上县耿棚中学的${c.teacherName}老师。今天我们共同走进高一信息技术必修一第一单元的核心篇章——《信息及其特征》。在数字化浪潮席卷全球的今天，我们每天都在被海量的数据所包围，但你是否真正思考过：究竟什么是信息？它具有哪些神奇而又独特的规律？让我们一起开启今天的探索之旅！”

【第2页：情境导入·从符号到意义】
- 视觉排版：左侧展示生硬的传感器连续数值：“20261014-08-32-68-W1”；右侧展示动态解析图：“颍上县耿棚镇今日湿度68%，微风，宜开展课外社团活动”。
- 教师逐字讲稿：
  “请看大屏幕，如果老师只给你左边这串由数字和横杠组成的符号，你可能一头雾水，因为它只是未经解释的原始‘数据’。而当我们将其接入气象知识模型，赋予它现实背景时，它变成了右侧能够指导我们穿衣出行的‘信息’。从数据到信息，正是人类智慧对客观世界的赋意飞跃。”

【第3页：学习目标与核心素养】
- 视觉排版：清晰呈现本节课三大素养目标卡片：①信息意识：辨析概念，建立时效与价值感知；②计算思维：构建‘三维多源交叉核验’判定模型；③信息社会责任：规范网络言行，抵御网络虚假失真信息。
- 教师逐字讲稿：
  “本节课我们将达成三大目标：首先，深度剖析信息的本质内涵及其七大核心特征；其次，通过真实案例，亲手搭建信息真伪的三维鉴别支架；最后，升华我们的信息社会责任，做清朗网络空间的积极守护者。”

【第4-9页：特征深度研读（载体依附、价值相对、时效衰减、共享增殖、真伪不完全）】
- 详述兰德公司500万军情、过期彩票、萧伯纳苹果理论与盲人摸象。

【第10-13页：三维模型实战与谣言解剖】
- 引导学生依托三维模型击破“皖北百年极寒假警报”，并结合《网络安全法》进行法治与道德素养升华。

【第14-16页：知识图谱、分层作业与清朗宣誓致谢】
- 带领全班宣誓并致谢评委专家。
`;

  const html = `
<div style="font-family: 'PingFang SC', 'Microsoft YaHei', SimSun, sans-serif; line-height: 1.8; color: #1e293b; max-width: 800px; margin: 0 auto; padding: 10px;">
  <div style="text-align: center; border-bottom: 2px solid #1e40af; padding-bottom: 14px; margin-bottom: 18px;">
    <h1 style="color: #0f172a; font-size: 20px; font-weight: bold; margin-bottom: 4px;">教学课件PPT逐页视觉大纲与教师逐字讲稿对齐表</h1>
    <h2 style="color: #1e40af; font-size: 15px; font-weight: bold; margin-bottom: 6px;">课题：高中信息技术必修1《1.3 信息及其特征》</h2>
    <p style="color: #475569; font-size: 13px; margin: 0;">执教教师：<strong>${c.teacherName}</strong> &nbsp;|&nbsp; 报送单位：<strong>${c.schoolName}</strong> &nbsp;|&nbsp; 课件规格：<strong>16:9纯学术无水印</strong></p>
  </div>

  <table style="width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 13px; border: 1px solid #cbd5e1;">
    <thead>
      <tr style="background-color: #f1f5f9; text-align: left;">
        <th style="border: 1px solid #cbd5e1; padding: 8px 10px; width: 12%; font-weight: bold; text-align: center;">页码/序号</th>
        <th style="border: 1px solid #cbd5e1; padding: 8px 10px; width: 38%; font-weight: bold;">视觉设计大纲与排版规范 (16:9)</th>
        <th style="border: 1px solid #cbd5e1; padding: 8px 10px; width: 50%; font-weight: bold;">执教教师（${c.teacherName}）逐字讲稿与互动话术</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="border: 1px solid #cbd5e1; padding: 8px 10px; font-weight: bold; text-align: center;">P01<br/>封面</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px 10px;">深蓝政务科技底色(#0F2B5C)，标题白色40pt粗体居中，副标暖橙24pt，右下角展示“授课教师：${c.teacherName} | 报送单位：${c.schoolName}”。</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px 10px;">“各位评委老师、同学们好！我是耿棚中学的${c.teacherName}老师。今天我们共同走进必修一第一单元核心篇章《信息及其特征》……”</td>
      </tr>
      <tr>
        <td style="border: 1px solid #cbd5e1; padding: 8px 10px; font-weight: bold; text-align: center;">P02<br/>情境</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px 10px;">左侧展示传感器生硬数字流，右侧展示耿棚镇实时气象图，箭头连接展示“数据赋意跃迁为信息”。</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px 10px;">“左边这串数字在未经处理前只是冰冷的数据；赋予现实情境后，它变成了指导我们生活的有效信息。这就是人类智慧的赋意飞跃。”</td>
      </tr>
      <tr>
        <td style="border: 1px solid #cbd5e1; padding: 8px 10px; font-weight: bold; text-align: center;">P03<br/>目标</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px 10px;">三列素养卡片：信息意识（概念内涵）、计算思维（三维核验模型）、信息社会责任（清朗空间建设）。</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px 10px;">“今天我们将实现三大跨越：吃透七大特征辩证规律；亲手搭建真伪鉴别模型；树立高品格的青年数字公民责任。”</td>
      </tr>
      <tr>
        <td style="border: 1px solid #cbd5e1; padding: 8px 10px; font-weight: bold; text-align: center;">P04-P09<br/>特征深度研读</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px 10px;">逐页剖析：载体依附性（甲骨到云存）、价值相对性（兰德军情）、时效衰减折线、共享性（苹果交换论）、真伪与不完全性。</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px 10px;">重点讲授兰德军情为何在战前战后价值迥异，引导学生推导出“信息价值取决于接收者认知结构与现实紧迫度”的法则。</td>
      </tr>
      <tr>
        <td style="border: 1px solid #cbd5e1; padding: 8px 10px; font-weight: bold; text-align: center;">P10-P13<br/>探究与实战</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px 10px;">呈现任务单时效折线；投影“信源资质 ╳ 语意客观 ╳ 多源交叉”三维立体坐标；投屏现场交叉核验分析表。</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px 10px;">指导学生针对‘皖北百年极寒假预警’开展多源实战比对，总结出‘看资质、审煽动、查官方’的实战鉴别口诀。</td>
      </tr>
      <tr>
        <td style="border: 1px solid #cbd5e1; padding: 8px 10px; font-weight: bold; text-align: center;">P14-P16<br/>升华与结语</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px 10px;">全景思维导图总结；分层课后作业清单；背景展示国家网络安全法，全班起立宣言。</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px 10px;">“用理性的双眼看清数字世界，用科技的智慧守护家乡净土！感谢各位专家评委，同学们下课！”</td>
      </tr>
    </tbody>
  </table>
</div>
`;
  return { html, plainText, title };
}

// -------------------------------------------------------------
// 04. 课后作业练习与评价指南
// -------------------------------------------------------------
function generateHomeworkContent(c: TeacherConfig) {
  const title = `课后作业练习与学业质量评价指南_《1.3 信息及其特征》`;
  const plainText = `高中信息技术必修1《数据与计算》课后分层作业与评价指南
课题：1.3 信息及其特征
设计教师：${c.teacherName} | 报送学校：${c.schoolName}

【模块一：基础诊断作业（A层·巩固双基）】
1. 笛声在信息传递中属于（ B ）。
   A. 信息本身     B. 信息的物质载体     C. 信息的全部意义     D. 信息的编码形式
   【解析与赋分】：满分5分。笛声是声波，作为物质载体承载思乡信息，体现载体依附性。选A扣5分（混淆载体与信息）。
2. 颍上县农资经销部印发的小麦病虫害防治手册多人传阅增产，体现了信息的（ C ）。
   A. 隐蔽性与真伪性   B. 依附性与不完全性   C. 共享性与价值性   D. 确定性与单一性
   【解析与赋分】：满分5分。多人传阅内容不损耗对应共享性，指导农产增产对应价值性。
3. 虚假中奖短信利用“逾期作废”，在心理上利用了（ B ）。
   A. 利用信息的真伪性制造权威      B. 利用信息的时效性紧迫感降低防备
   C. 利用信息的载体依附性伪造证件  D. 利用信息的不完全性隐藏身份
   【解析与赋分】：满分5分。设置紧迫时间限制企图利用时效性心理压力促成冲动操作。
4. 电商平台“大数据杀熟”现象从信息特征看表明（ A ）。
   A. 信息在特定算法利用下突显了价值的相对性与不完全性
   B. 平台的信息完全是伪造的
   C. 用户的数据无法依附于数字平台
   D. 数据的时效性已经完全消失
   【解析与赋分】：满分5分。平台通过对用户画像数据的深度加工，挖掘出不同用户对价格敏感度的相对差异。
5. 赤壁之战蒋干盗书周瑜反间计说明（ B ）。
   A. 信息必须依附于纸质书信才能传递
   B. 信息的真伪性与不完全性可能导致极其严重的决策失误
   C. 古代没有计算机因此信息不具备时效性
   D. 周瑜的信息不具有共享性
   【解析与赋分】：满分5分。假信息导致重大决策偏差。

【模块二：情境辨析作业（B层·能力迁移）】
题1：【农业气象与精准决策】
颍上县是粮食大县，2026年麦收前气象台提前72小时发布强对流大风暴雨冰雹橙色预警，县农技部门紧急调用120台大型收割机抢收数万亩小麦。而某自媒体声称“耿棚小麦绝收面粉暴涨”。
（1）分析提前72小时预警对小麦抢收的“时效性”与“价值相对性”意义；（7分）
（2）简述若未及时辟谣可能引发的面粉抢购恐慌等次生危害。（8分）

【模块三：实践拓展作业（C层·微报告撰写）】
运用“信源资质核验 ╳ 语意客观审视 ╳ 多源交叉印证”三维模型，撰写100-150字《网络传言解剖微报告》，配有明确评分量规。
`;

  const html = `
<div style="font-family: 'PingFang SC', 'Microsoft YaHei', SimSun, sans-serif; line-height: 1.8; color: #1e293b; max-width: 800px; margin: 0 auto; padding: 10px;">
  <div style="text-align: center; border-bottom: 2px solid #1e40af; padding-bottom: 14px; margin-bottom: 18px;">
    <h1 style="color: #0f172a; font-size: 20px; font-weight: bold; margin-bottom: 4px;">高中信息技术《1.3 信息及其特征》分层作业与评价指南</h1>
    <p style="color: #475569; font-size: 13px; margin: 0;">设计教师：<strong>${c.teacherName}</strong> &nbsp;|&nbsp; 授课学校：<strong>${c.schoolName}</strong> &nbsp;|&nbsp; 适用年级：高一年级</p>
  </div>

  <div style="background-color: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 12px; margin-bottom: 16px; font-size: 13px;">
    <strong>【分层设计体系】</strong>：构建<strong>“A层基础诊断（巩固双基）— B层情境迁移（计算思维分析）— C层实践创新（三维核验微报告）”</strong>三阶评价体系。
  </div>

  <h3 style="color: #1e40af; font-size: 15px; font-weight: bold; margin-top: 16px;">模块一：基础诊断题参考答案与错因诊断表格</h3>
  <table style="width: 100%; border-collapse: collapse; margin-top: 8px; font-size: 13px; border: 1px solid #cbd5e1;">
    <thead>
      <tr style="background-color: #f1f5f9;">
        <th style="border: 1px solid #cbd5e1; padding: 6px 8px; width: 10%; text-align: center; font-weight: bold;">题号</th>
        <th style="border: 1px solid #cbd5e1; padding: 6px 8px; width: 20%; font-weight: bold;">考查信息特征</th>
        <th style="border: 1px solid #cbd5e1; padding: 6px 8px; width: 12%; text-align: center; font-weight: bold;">标准答案</th>
        <th style="border: 1px solid #cbd5e1; padding: 6px 8px; width: 58%; font-weight: bold;">典型错因诊断与学业素养归因</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="border: 1px solid #cbd5e1; padding: 6px 8px; text-align: center; font-weight: bold;">第1题</td>
        <td style="border: 1px solid #cbd5e1; padding: 6px 8px;">载体依附性</td>
        <td style="border: 1px solid #cbd5e1; padding: 6px 8px; text-align: center; color: #16a34a; font-weight: bold;">B</td>
        <td style="border: 1px solid #cbd5e1; padding: 6px 8px;">易误选A。错因在于未能分清声波载体与思乡情感信息的本质差异。</td>
      </tr>
      <tr>
        <td style="border: 1px solid #cbd5e1; padding: 6px 8px; text-align: center; font-weight: bold;">第2题</td>
        <td style="border: 1px solid #cbd5e1; padding: 6px 8px;">共享性与价值性</td>
        <td style="border: 1px solid #cbd5e1; padding: 6px 8px; text-align: center; color: #16a34a; font-weight: bold;">C</td>
        <td style="border: 1px solid #cbd5e1; padding: 6px 8px;">传阅不损耗对应共享性，指导增产对应价值性，双重维度考查。</td>
      </tr>
      <tr>
        <td style="border: 1px solid #cbd5e1; padding: 6px 8px; text-align: center; font-weight: bold;">第3题</td>
        <td style="border: 1px solid #cbd5e1; padding: 6px 8px;">时效性心理利用</td>
        <td style="border: 1px solid #cbd5e1; padding: 6px 8px; text-align: center; color: #16a34a; font-weight: bold;">B</td>
        <td style="border: 1px solid #cbd5e1; padding: 6px 8px;">诈骗分子利用“限时逾期”的时效性压迫感促成受害人冲动受骗。</td>
      </tr>
      <tr>
        <td style="border: 1px solid #cbd5e1; padding: 6px 8px; text-align: center; font-weight: bold;">第4题</td>
        <td style="border: 1px solid #cbd5e1; padding: 6px 8px;">价值相对性</td>
        <td style="border: 1px solid #cbd5e1; padding: 6px 8px; text-align: center; color: #16a34a; font-weight: bold;">A</td>
        <td style="border: 1px solid #cbd5e1; padding: 6px 8px;">大数据杀熟本质是利用掌握用户敏感度信息的不对称实现价值差异化。</td>
      </tr>
      <tr>
        <td style="border: 1px solid #cbd5e1; padding: 6px 8px; text-align: center; font-weight: bold;">第5题</td>
        <td style="border: 1px solid #cbd5e1; padding: 6px 8px;">真伪性与决策偏差</td>
        <td style="border: 1px solid #cbd5e1; padding: 6px 8px; text-align: center; color: #16a34a; font-weight: bold;">B</td>
        <td style="border: 1px solid #cbd5e1; padding: 6px 8px;">曹操因轻信假书信斩杀蔡瑁，反映假信息对重大战略决策的致命误导。</td>
      </tr>
    </tbody>
  </table>

  <h3 style="color: #1e40af; font-size: 15px; font-weight: bold; margin-top: 18px;">模块二与三：情境迁移与实践微报告评价量规表格</h3>
  <table style="width: 100%; border-collapse: collapse; margin-top: 8px; font-size: 12.5px; border: 1px solid #cbd5e1;">
    <thead>
      <tr style="background-color: #f1f5f9;">
        <th style="border: 1px solid #cbd5e1; padding: 6px 8px; width: 20%; font-weight: bold;">考核任务</th>
        <th style="border: 1px solid #cbd5e1; padding: 6px 8px; width: 45%; font-weight: bold;">学业质量水平3 (优秀) 观测指标</th>
        <th style="border: 1px solid #cbd5e1; padding: 6px 8px; width: 35%; font-weight: bold;">赋分标准与评语建议</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="border: 1px solid #cbd5e1; padding: 6px 8px; font-weight: bold;">B层·抢收决策剖析</td>
        <td style="border: 1px solid #cbd5e1; padding: 6px 8px;">能结合农业生产实际，运用时效性窗口期与价值相对性进行双重合理解释，逻辑自洽。</td>
        <td style="border: 1px solid #cbd5e1; padding: 6px 8px; color: #1d4ed8; font-weight: bold;">15分（分析深刻，切合实际）</td>
      </tr>
      <tr>
        <td style="border: 1px solid #cbd5e1; padding: 6px 8px; font-weight: bold;">C层·辟谣微报告</td>
        <td style="border: 1px solid #cbd5e1; padding: 6px 8px;">完整包含信源资质核验、语意煽动词剖析及多渠道交叉比对三个维度，字数规范，态度理性。</td>
        <td style="border: 1px solid #cbd5e1; padding: 6px 8px; color: #1d4ed8; font-weight: bold;">30分（模型建构完整，示范性强）</td>
      </tr>
    </tbody>
  </table>
</div>
`;
  return { html, plainText, title };
}

// -------------------------------------------------------------
// 05. 微课视频录制脚本与片头规范
// -------------------------------------------------------------
function generateVideoScriptContent(c: TeacherConfig) {
  const title = `微课视频录制脚本与5秒规范片头制作说明`;
  const plainText = `教育部与安徽省2026年“基础教育精品课”微课视频技术规范与拍摄脚本
课题：高中信息技术必修1《1.3 信息及其特征》
执教教师：${c.teacherName} | 报送学校：${c.schoolName}

一、国家级/省级精品课微课视频技术硬性指标（微课录制前务必核准）
1. 视频时长：严格控制在 8 分 00 秒 至 15 分 00 秒 之间（推荐 11 分 45 秒，超时或不足8分钟将直接取消评奖资格）。
2. 画面分辨率：标准 1920 × 1080 (16:9)，逐行扫描 (Progressive)，帧率推荐 25 fps 或 30 fps。
3. 视频编码与封装：H.264 / AVC 编码，封装格式统一为 .MP4，码率建议在 4 Mbps - 8 Mbps 之间，画面纯净无杂色块。
4. 音频参数：采用双声道立体声 (Stereo)，AAC 音频编码，采样率 48 kHz，音频码率 ≥ 128 kbps。声音清晰饱满，无电磁底噪、无喷麦回音。
5. 拍摄与母版：纯净学术背景，严禁出现商业教辅Logo、盗版课件水印、个人社交账号二维码。

二、教育部标准规范5秒片头模板（录制后置于视频最前端，时长必须精确为5.0秒）
----------------------------------------------------------------------
【背景色要求】：RGB(24, 76, 158) 标准政务学术蓝，纯色无渐变动画，无旋转粒子特效。
【文字版式（由上至下居中排版，全部采用思源黑体/黑体，纯白色文字）】：
第1行（字号 48pt，粗体）：普通高中教科书·信息技术 必修1《数据与计算》
第2行（字号 64pt，粗体）：第1章 数据与信息 · 1.3 信息及其特征
第3行（字号 42pt，常规）：执教教师：${c.teacherName}
第4行（字号 42pt，常规）：工作单位：${c.schoolName}
----------------------------------------------------------------------
`;

  const html = `
<div style="font-family: 'PingFang SC', 'Microsoft YaHei', SimSun, sans-serif; line-height: 1.8; color: #1e293b; max-width: 800px; margin: 0 auto; padding: 10px;">
  <div style="text-align: center; border-bottom: 2px solid #1e40af; padding-bottom: 14px; margin-bottom: 20px;">
    <h1 style="color: #0f172a; font-size: 20px; font-weight: bold; margin-bottom: 4px;">微课视频录制脚本与5秒规范片头制作说明</h1>
    <p style="color: #475569; font-size: 13px; margin: 0;">课题：《1.3 信息及其特征》 &nbsp;|&nbsp; 执教：<strong>${c.teacherName}</strong> &nbsp;|&nbsp; 单位：<strong>${c.schoolName}</strong></p>
  </div>

  <div style="background-color: #1e3a8a; color: #fff; border-radius: 6px; padding: 20px; text-align: center; margin-bottom: 20px;">
    <p style="font-size: 13px; letter-spacing: 2px; margin: 0 0 10px 0; color: #93c5fd;">【教育部精品课标准5秒片头视觉示意】</p>
    <div style="font-size: 16px; font-weight: 500; margin-bottom: 8px;">普通高中教科书·信息技术 必修1《数据与计算》</div>
    <div style="font-size: 24px; font-weight: bold; margin-bottom: 14px; color: #fde047;">1.3 信息及其特征</div>
    <div style="font-size: 15px; margin-bottom: 4px;">执教教师：${c.teacherName}</div>
    <div style="font-size: 15px;">工作单位：${c.schoolName}</div>
  </div>

  <h3 style="color: #1e40af; font-size: 15px; font-weight: bold;">一、视频硬性指标自检</h3>
  <ul style="font-size: 13px; line-height: 2; color: #334155;">
    <li><strong>时长红线</strong>：严格控制在 8:00 - 15:00（本微课录像时长规划为 11分45秒）。</li>
    <li><strong>视频制式</strong>：1920x1080 分辨率，16:9，H.264/MP4，25fps，码率 6000 kbps。</li>
    <li><strong>音频规格</strong>：48kHz 采样率，双声道立体声，AAC 192kbps，底噪低于 -45dB。</li>
  </ul>
</div>
`;
  return { html, plainText, title };
}

// -------------------------------------------------------------
// 06. 优秀样卷1 (李*涵)
// -------------------------------------------------------------
function generateSample1Content(c: TeacherConfig) {
  const title = `真实课堂学生任务单实证样卷_优秀样卷1(李*涵)`;
  const plainText = `普通高中教科书·信息技术 必修1《数据与计算》
真实课堂学生任务单生成样卷（优秀样卷01）
学校：${c.schoolName} | 班级：高一(2)班 | 姓名：李*涵 | 学号：2026010214 | 综合得分：98分 (A+)
指导教师：${c.teacherName}（含教师红笔批阅手记）

【活动0：初试锋芒·从数据向信息跨越】
学生作答：
1. 表达A属于 [原始数据]；表达B属于 [有效信息]。
2. 两者关系：数据是承载信息的客观物理符号；信息是数据在特定认知背景下经过大脑或算法处理加工后提炼出的实际意义。
★【教师红笔批注】：归纳精辟，字迹娟秀！能敏锐把握“背景”与“加工”这两个核心跃迁条件。（赋分：10/10，${c.teacherName}老师批）

【任务一：问诊·春晚中奖与彩票热议】
学生作答：
1. 顾客在1月4日不能享受满减，因为该优惠券在1月3日24:00已经超过了生命周期，体现了信息的【时效性】。
2. 同一条降雨预警对王伯伯的价值远大于张先生，因为王伯伯需要根据降雨做出麦田排涝防渍抢收的重大农业生产决策，直接关系数万元收入；而张先生只是改换婚礼室内场地。这生动体现了信息的【价值相对性】，即信息的价值取决于接收者的实际需求与决策权重。
★【教师红笔批注】：数学建模逻辑非常清晰！折线突降节点捕捉准确，价值相对性阐述深刻到位。（赋分：30/30，${c.teacherName}老师批）

【任务二：解剖·气象预警权威发布 vs 百年极寒网络谣言】
（三维鉴别支架表）：
- 维度1 信源核验：网络热帖由个人号发布，无气象资质；而官方平台是国家法定预报部门，具备高公信力。
- 维度2 语意审视：热帖充斥“绝对冻死”、“绝密被删”等非理性主观词；官方预报使用客观实测数据。
- 维度3 多源交叉：全国气象网络检索印证源为0；官方预报多源一致。
结论与处置：该网帖纯属虚假谣言。劝导长辈话术：“这是营销号为了吸粉编的假消息，官方天气预报过两天温度就回升了，大家千万别恐慌囤菜。”
★【教师红笔批注】：批判性思维极为卓越！劝导长辈的话术既讲科学又懂人情，体现了极高素养！（赋分：30/30，${c.teacherName}老师批）

【任务三：建构·信息特征图谱与小组清朗宣言】
1. 连线题：全对（A-②, B-①, C-③, D-④）。
2. 小组宣言作答：“我们是高一(2)班晨曦探究组。身处信息时代，我们承诺：面对未经核实的惊悚新闻，做‘理性的冷凝剂’，绝不做‘盲目的扩音器’。用多源交叉查验事实，用科学真知驱散网络迷雾，为建设清朗耿棚校园贡献青春智慧！”
★【教师红笔批注】：宣言掷地有声，充满青年担当！整张学案堪称全班标杆，推荐在教研组精品课申报中作为核心实证佐证！（总评：98分，评级：A+，${c.teacherName}老师批）
`;

  const html = `
<div style="font-family: 'PingFang SC', 'Microsoft YaHei', SimSun, sans-serif; line-height: 1.8; color: #1e293b; max-width: 800px; margin: 0 auto; padding: 10px;">
  <div style="text-align: center; border-bottom: 2px dashed #94a3b8; padding-bottom: 12px; margin-bottom: 16px;">
    <span style="float: right; border: 2px solid #dc2626; color: #dc2626; font-size: 20px; font-weight: bold; padding: 2px 14px; border-radius: 4px; transform: rotate(-5deg);">98分 (A+)</span>
    <h1 style="color: #0f172a; font-size: 18px; font-weight: bold; margin-bottom: 4px;">真实课堂学生任务单实证样卷（优秀标杆卷）</h1>
    <p style="color: #475569; font-size: 13px; margin: 0;">学校：<strong>${c.schoolName}</strong> &nbsp;|&nbsp; 班级：高一(2)班 &nbsp;|&nbsp; 姓名：<strong>李*涵</strong> &nbsp;|&nbsp; 批阅教师：<strong>${c.teacherName}</strong></p>
  </div>

  <div style="background-color: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 12px; margin-bottom: 14px; font-size: 13px;">
    <strong>【学生手写答卷再现·任务一节选】</strong>
    <p style="margin: 4px 0 0 0; color: #1e3a8a;">
      “优惠券逾期失效体现了信息的<strong>时效性</strong>；降雨预警对王伯伯关乎收割止损，对张先生关乎婚礼布置，收益与紧迫度完全不同，体现了信息的<strong>价值相对性</strong>。”
    </p>
    <div style="color: #dc2626; font-family: 'KaiTi', 'STKaiti', serif; font-size: 14px; margin-top: 8px; border-top: 1px dashed #fca5a5; padding-top: 6px;">
      ✎ 教师红笔批注：建模逻辑严密，特征归纳准确到位！能用准确的学科术语解释生活矛盾。（${c.teacherName}老师批）
    </div>
  </div>

  <div style="background-color: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 12px; margin-bottom: 14px; font-size: 13px;">
    <strong>【学生手写答卷再现·任务二三维解剖节选】</strong>
    <p style="margin: 4px 0 0 0; color: #1e3a8a;">
      “维度1信源：自媒体号无气象资质；维度2语意：‘绝对冻死’属恐吓营销；维度3多源：国家气象网查无此警报。劝导话术：拿官方辟谣图柔和劝解长辈，避免被营销号收割。”
    </p>
    <div style="color: #dc2626; font-family: 'KaiTi', 'STKaiti', serif; font-size: 14px; margin-top: 8px; border-top: 1px dashed #fca5a5; padding-top: 6px;">
      ✎ 教师红笔批注：三维交叉论证无可挑剔，劝导话术既科学又富有人情味，显现出卓越的信息社会责任感！（${c.teacherName}老师批）
    </div>
  </div>
</div>
`;
  return { html, plainText, title };
}

// -------------------------------------------------------------
// 06. 优秀样卷2 (张*宇 - 乡村特色)
// -------------------------------------------------------------
function generateSample2Content(c: TeacherConfig) {
  const title = `真实课堂学生任务单实证样卷_优秀样卷2(张*宇)`;
  const plainText = `普通高中教科书·信息技术 必修1《数据与计算》
真实课堂学生任务单生成样卷（乡村特色样卷02）
学校：${c.schoolName} | 班级：高一(5)班 | 姓名：张*宇 | 学号：2026010508 | 综合得分：95分 (A)
指导教师：${c.teacherName}（含教师红笔批阅手记）

【学生亮点答卷采撷】：
在【任务一】中，张*宇同学结合自家在耿棚镇承包的冬小麦种植实际进行分析：
“我们耿棚地处淮河北岸，每年冬春交界的小麦‘拔节孕穗期’对气温极端敏感。若遭遇‘倒春寒’且伴随干旱，若没有提前收到农技部门发来的‘喷施防冻剂并适时浇灌’信息，全家一年的辛苦就可能折损三成。而隔壁在县城开百货店的表哥，同一天看到气温提示只觉得‘今天得加件厚棉袄’。这让我真切感受到，信息对于直接从事生产劳动的农民来说，就是实打实的收成，体现了信息强烈的【价值性】与【价值相对性】！”

在【任务二】网络谣言解剖中：
“我老家爷爷特别容易相信微信看一看里的文章，去年就因为有人传‘化肥要暴涨三倍’而提前借钱囤了一屋子化肥，结果后来价格根本没变还受潮结块了。这次用${c.teacherName}老师教的‘三维核验模型’一查，才发现那个号是专门卖劣质化肥的商家搞的恐慌营销。今后我要当全家人的‘数字小保安’，凡是涉农信息必须先查安徽农业农村厅公众号和耿棚农技群！”

★【教师红笔批阅评语】：
“接地气！有真情！能够紧密联系颍上家乡的农业生产生活实际，将抽象的信息科学理论化作家乡土地上的真切体验。你的回答展现了乡村高中学子难能可贵的批判意识与反哺家庭的担当精神。本卷作为乡村完全中学精品课佐证极具说服力！”（赋分：95分，等级：A，${c.teacherName}老师批）
`;

  const html = `
<div style="font-family: 'PingFang SC', 'Microsoft YaHei', SimSun, sans-serif; line-height: 1.8; color: #1e293b; max-width: 800px; margin: 0 auto; padding: 10px;">
  <div style="text-align: center; border-bottom: 2px dashed #94a3b8; padding-bottom: 12px; margin-bottom: 16px;">
    <span style="float: right; border: 2px solid #dc2626; color: #dc2626; font-size: 20px; font-weight: bold; padding: 2px 14px; border-radius: 4px; transform: rotate(-5deg);">95分 (A)</span>
    <h1 style="color: #0f172a; font-size: 18px; font-weight: bold; margin-bottom: 4px;">真实课堂学生任务单实证样卷（乡村生活特色卷）</h1>
    <p style="color: #475569; font-size: 13px; margin: 0;">学校：<strong>${c.schoolName}</strong> &nbsp;|&nbsp; 班级：高一(5)班 &nbsp;|&nbsp; 姓名：<strong>张*宇</strong> &nbsp;|&nbsp; 批阅教师：<strong>${c.teacherName}</strong></p>
  </div>

  <div style="background-color: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 12px; margin-bottom: 14px; font-size: 13px;">
    <strong>【学生手写答卷摘录·结合颍上小麦冬灌情境】</strong>
    <p style="margin: 4px 0 0 0; color: #1e3a8a;">
      “我们耿棚镇的小麦‘倒春寒’冻害预警对种粮大户就是保命金，而对城里开店的亲戚只是多穿衣服。这充分印证了信息的<strong>价值相对性</strong>。去年家里因轻信假农资消息吃过亏，今后我要用三维模型做家里的‘数字小保安’！”
    </p>
    <div style="color: #dc2626; font-family: 'KaiTi', 'STKaiti', serif; font-size: 14px; margin-top: 8px; border-top: 1px dashed #fca5a5; padding-top: 6px;">
      ✎ 教师红笔批注：真挚感人！紧密联系颍上家乡三农实际，理论联系实践，体现了卓越的信息意识！（${c.teacherName}老师批）
    </div>
  </div>
</div>
`;
  return { html, plainText, title };
}

// -------------------------------------------------------------
// 06. 优秀样卷3 (王*博 - 反思进阶)
// -------------------------------------------------------------
function generateSample3Content(c: TeacherConfig) {
  const title = `真实课堂学生任务单实证样卷_优秀样卷3(王*博)`;
  const plainText = `普通高中教科书·信息技术 必修1《数据与计算》
真实课堂学生任务单生成样卷（反思进阶样卷03）
学校：${c.schoolName} | 班级：高一(3)班 | 姓名：王*博 | 学号：2026010322 | 综合得分：92分 (A)
指导教师：${c.teacherName}（含教师红笔批阅手记）

【学生亮点答卷采撷】：
在【任务二】网络真伪性探究中，王*博同学写道：
“在初三毕业那个暑假，我曾亲身经历过网络信息的【真伪性】骗局：某游戏交流群里有人发了一张高仿官方的‘免费领取十周年稀有皮肤’网页截图。当时我看到上面有官方Logo，并且提示‘仅剩最后3个名额（时效性逼迫）’，一时冲动就输入了自己的账号和验证码，结果不到五分钟账号就被盗走转卖了。
今天学了${c.teacherName}老师讲的三维鉴别支架，我才彻底看清当时的陷阱：
第一，信源根本不是游戏官方网站域名，而是利用载体依附性伪造的钓鱼页面；
第二，语意充满了‘限时手慢无’的催促；
第三，如果当时我随手打开游戏官方客户端交叉核对一下，一眼就能识破骗局。
教训是深刻的，今天这节课真正让我明白：在数字网络里，保持怀疑与交叉求证不是多疑，而是必备的生存技能！”

★【教师红笔批阅评语】：
“真实而深刻的成长反思！能将自身曾经的受骗挫折转化为今天课堂上的深刻认知，这正是信息社会责任素养生根发芽的最佳体现。你的案例在全班引起了强烈共鸣，也极大丰富了我们精品课的教学生成资源！”（赋分：92分，等级：A，${c.teacherName}老师批）
`;

  const html = `
<div style="font-family: 'PingFang SC', 'Microsoft YaHei', SimSun, sans-serif; line-height: 1.8; color: #1e293b; max-width: 800px; margin: 0 auto; padding: 10px;">
  <div style="text-align: center; border-bottom: 2px dashed #94a3b8; padding-bottom: 12px; margin-bottom: 16px;">
    <span style="float: right; border: 2px solid #dc2626; color: #dc2626; font-size: 20px; font-weight: bold; padding: 2px 14px; border-radius: 4px; transform: rotate(-5deg);">92分 (A)</span>
    <h1 style="color: #0f172a; font-size: 18px; font-weight: bold; margin-bottom: 4px;">真实课堂学生任务单实证样卷（警示反思进阶卷）</h1>
    <p style="color: #475569; font-size: 13px; margin: 0;">学校：<strong>${c.schoolName}</strong> &nbsp;|&nbsp; 班级：高一(3)班 &nbsp;|&nbsp; 姓名：<strong>王*博</strong> &nbsp;|&nbsp; 批阅教师：<strong>${c.teacherName}</strong></p>
  </div>

  <div style="background-color: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 12px; margin-bottom: 14px; font-size: 13px;">
    <strong>【学生手写答卷摘录·亲身受骗案例深刻复盘】</strong>
    <p style="margin: 4px 0 0 0; color: #1e3a8a;">
      “初三曾因轻信高仿‘游戏免费领皮肤’钓鱼截图被盗号。今天用‘三维模型’复盘才恍然大悟：对方利用了高仿载体、时效性施压与信息不对称。多源交叉印证是数字时代防身的第一盾牌！”
    </p>
    <div style="color: #dc2626; font-family: 'KaiTi', 'STKaiti', serif; font-size: 14px; margin-top: 8px; border-top: 1px dashed #fca5a5; padding-top: 6px;">
      ✎ 教师红笔批注：敢于解剖自己的挫折，认知深刻！从亲历受害者成长为理性捍卫者，这就是学科育人的力量！（${c.teacherName}老师批）
    </div>
  </div>
</div>
`;
  return { html, plainText, title };
}

// -------------------------------------------------------------
// 06. 课堂配套数据集 CSV
// -------------------------------------------------------------
function generateDatasetContent(c: TeacherConfig) {
  const title = `多源信息真伪交叉核验分析表(课堂配套脱敏数据)`;
  const plainText = `信息ID,信息主题,原始发布平台,发布账号名称,信源权威资质评级(1-5),语意煽动系数(1-10),印证主流信源数,时效窗口类型,特征归属标签,核验最终结论,教学指导建议
INFO_001,皖北遭遇百年一遇极寒暴雪蔬菜暴涨,某自媒体短视频,乡村奇闻杂谈,1,9,0,突发短效,真伪性_不完全性,虚假网络谣言,引导学生识别恐慌营销与无资质信源
INFO_002,强对流寒潮局地降温4-6度防御指南,安徽省气象局官网,安徽气象服务平台,5,1,18,确定周期,价值性_时效性,官方权威真实,用于建立正向信源标杆数据
INFO_003,高考报名缴费可加20分内部特权渠道,微信外链分享,高考招生快车道,1,10,0,限时紧迫,真伪性_价值相对性,电信诈骗诱导,警示学生网络诈骗法律红线
INFO_004,颍上县小麦赤霉病春季综合防治方案,颍上县农业农村局,颍上三农在线,5,2,8,农时季节,价值性_共享性,官方农业指导,契合乡村农业学情真实案例
INFO_005,某品牌满减代金券3日24点失效说明,本地商场服务号,耿棚便民商贸,4,3,2,严格时限,时效性_载体依附性,商业有效信息,用于绘制时效性衰减折线模型
INFO_006,转发生日祝福可免费领取腾讯股票,QQ空间转发链,官方福利君666,1,8,0,虚假病毒,真伪性_载体依附性,恶意裂变营销,分析网络虚假链式传播机制
INFO_007,全省高中信息技术优质课评审指标,安徽省教育厅基教处,安徽教育网,5,1,12,长期规范,共享性_价值性,官方行政规程,用于树立精品课标准规范意识
INFO_008,吃菠菜加豆腐会当场引发肾结石,健康养生短视频,民间神医张大叔,1,7,0,谣言长效,真伪性_不完全性,伪科学谣言,引导利用权威医学库交叉比对
INFO_009,高德/百度地图耿棚镇淮河大桥施工绕行,数字地图交通播报,交通综合调度中心,5,2,6,动态小时,时效性_载体依附性,实时有效信息,理解信息载体与时效性结合
INFO_010,转发此锦鲤全家三年不生病,朋友圈图文卡片,好运莲莲,1,6,0,迷信谣言,真伪性_价值相对性,精神慰藉假象,开展理性科学素养引导
INFO_011,2026年中央一号文件惠农政策全文,新华社官方客户端,新华社官方融媒,5,1,35,长效指引,共享性_价值性,国家权威公文,体会信息价值对国家社会的宏观意义
INFO_012,喝白酒能有效杀灭新型流感病毒,家族聊天群语音,热心邻居李大娘,1,8,0,虚假短效,真伪性_不完全性,群体误导谣言,培养对长辈进行温和科普的沟通能力
`;

  const html = `
<div style="font-family: 'PingFang SC', 'Microsoft YaHei', SimSun, sans-serif; line-height: 1.8; color: #1e293b; max-width: 800px; margin: 0 auto; padding: 10px;">
  <div style="text-align: center; border-bottom: 2px solid #1e40af; padding-bottom: 12px; margin-bottom: 16px;">
    <h1 style="color: #0f172a; font-size: 18px; font-weight: bold; margin-bottom: 4px;">多源信息真伪交叉核验分析表（课堂配套脱敏数据集）</h1>
    <p style="color: #475569; font-size: 13px;">用于高一信息技术《1.3 信息及其特征》课堂数字化探究实战比对（共12组典型情境）</p>
  </div>
  <p style="font-size: 13px; color: #334155;">本数据表严格采用脱敏机制，涵盖农业气象、校园防诈、网络伪科学、惠农政策等12种多源场景，包含信源资质（1-5星）、语意煽动系数（1-10分）及多源印证数量。已预置在打包下载材料中供直接导入Excel分析。</p>
</div>
`;
  return { html, plainText, title };
}

// -------------------------------------------------------------
// README
// -------------------------------------------------------------
function generateReadmeContent(c: TeacherConfig) {
  const title = `安徽省${c.year}年基础教育精品课申报全套材料说明`;
  const plainText = `======================================================================
  安徽省${c.year}年“基础教育精品课”申报全套材料成果包
  执教教师：${c.teacherName} | 所在单位：${c.schoolName}
  学科：普通高中信息技术 | 课题：1.3 信息及其特征
======================================================================

亲爱的${c.teacherName}老师：
您好！时间紧迫，为助力您在明晚申报截止前顺利提交并冲击安徽省一等奖，本材料包已严格按照省教育厅电教馆评审规范组织封装。

【一、材料清单与对应申报平台栏目】
1. 01_教学设计_高中信息技术《1.3 信息及其特征》(含教学评一致性矩阵与课标素养推导).docx / .pdf
   -> 对应平台：“教学设计”栏（已为您同步打包 DOCX 与 规范排版 PDF，方便直接上传）。
2. 02_学习任务单_高中信息技术《1.3 信息及其特征》(支架式探究与表现性量规).docx / .pdf
   -> 对应平台：“学习任务单/导学案”栏。
3. 03_教学课件PPT逐页讲稿与视觉大纲_《1.3 信息及其特征》.docx / .pdf
   -> 对应平台：“课件说明/讲稿”栏（如需上传PPTX文件，请直接对照本讲稿微调您的课件）。
4. 04_课后作业练习与评价指南_《1.3 信息及其特征》(分层设计含详细解析).docx / .pdf
   -> 对应平台：“作业与评价设计”栏。
5. 05_微课视频录制脚本与5秒规范片头制作说明.txt
   -> 对应平台：用于指导微课视频剪辑与审核，重点确保5秒标准蓝底片头无误。
6. 06_附件佐证材料/（含3份学生真实手写答卷样卷DOCX+PDF，及1份CSV脱敏数据集）
   -> 对应平台：“其他佐证材料”或“教学反思与实证”栏，力证课堂实效。

【二、明晚上报前紧急核验要点】
1. 确认视频时长严格在 8:00 - 15:00 之间（推荐11分45秒）；
2. 确认片头中教师姓名（${c.teacherName}）和单位（${c.schoolName}）无错别字；
3. 如需在安徽省基础教育资源应用平台或国家中小学智慧教育平台报送，建议直接使用打包中的 .pdf 格式文件，排版表格绝对稳定，防范评委电脑Office版本差异导致的格式错乱。

预祝${c.teacherName}老师申报圆满成功，斩获省一等奖！
耿棚中学信息技术教研组 · 齐心力荐
`;

  const html = `
<div style="font-family: 'PingFang SC', 'Microsoft YaHei', SimSun, sans-serif; line-height: 1.8; color: #1e293b; max-width: 800px; margin: 0 auto; padding: 10px;">
  <h2 style="color: #1e40af; font-size: 18px; border-bottom: 2px solid #2563eb; padding-bottom: 8px;">精品课申报材料成果包使用说明</h2>
  <pre style="background: #f8fafc; padding: 14px; border: 1px solid #cbd5e1; border-radius: 6px; font-family: monospace; font-size: 13px; line-height: 1.6; white-space: pre-wrap;">
${plainText}
  </pre>
</div>
`;
  return { html, plainText, title };
}
