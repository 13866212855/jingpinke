import JSZip from "jszip";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { TeacherConfig, materialsList, generateDocumentContent } from "./documents-data";

/**
 * 转义 XML 特殊字符
 */
function escapeXml(unsafe: string): string {
  if (!unsafe) return "";
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export interface ExtractedDocImage {
  id: string; // rIdImg1
  fileName: string; // image1.png
  extension: string; // png
  contentType: string; // image/png
  base64Data: string;
  alt: string;
}

/**
 * 将 HTML 结构深度解析为原生标准 OpenXML Word 元素（支持真实的 <w:tbl> 表格、单元格、<w:drawing> 图片与版式）
 */
function convertHtmlToOpenXml(
  htmlContent: string,
  plainFallback: string,
  imagesCollector?: ExtractedDocImage[]
): string {
  if (typeof window === "undefined" || !window.DOMParser) {
    return plainFallback
      .split("\n")
      .map(
        (l) => `<w:p><w:r><w:t xml:space="preserve">${escapeXml(l)}</w:t></w:r></w:p>`
      )
      .join("\n");
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, "text/html");
  const body = doc.body;
  const xmlParts: string[] = [];

  function processNode(node: Node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent?.trim();
      if (text) {
        xmlParts.push(`
          <w:p>
            <w:r>
              <w:rPr>
                <w:rFonts w:ascii="SimSun" w:eastAsia="SimSun" w:hAnsi="SimSun"/>
                <w:sz w:val="24"/>
                <w:color w:val="1E293B"/>
              </w:rPr>
              <w:t xml:space="preserve">${escapeXml(text)}</w:t>
            </w:r>
          </w:p>
        `);
      }
      return;
    }

    if (node.nodeType !== Node.ELEMENT_NODE) return;
    const el = node as HTMLElement;
    const tagName = el.tagName.toLowerCase();

    // 处理插入的图片标签 (真正的 OpenXML DrawingML 嵌入)
    if (tagName === "img" || el.classList?.contains("editor-inserted-image")) {
      const alt = el.getAttribute("alt") || "教学实操与佐证图片";
      const src = el.getAttribute("src") || "";

      if (src.startsWith("data:image/") && imagesCollector) {
        const match = src.match(/^data:image\/([a-zA-Z0-9]+);base64,(.+)$/);
        if (match) {
          const rawExt = match[1].toLowerCase();
          const ext = rawExt === "jpeg" || rawExt === "jpg" ? "jpeg" : "png";
          const imgIdx = imagesCollector.length + 1;
          const relId = `rIdImg${imgIdx}`;
          const fileName = `image_${imgIdx}.${ext === "jpeg" ? "jpg" : "png"}`;
          const rawBase64 = match[2];

          imagesCollector.push({
            id: relId,
            fileName,
            extension: ext,
            contentType: ext === "jpeg" ? "image/jpeg" : "image/png",
            base64Data: rawBase64,
            alt,
          });

          xmlParts.push(`
            <w:p>
              <w:pPr>
                <w:jc w:val="center"/>
                <w:spacing w:before="140" w:after="60"/>
              </w:pPr>
              <w:r>
                <w:drawing>
                  <wp:inline distT="0" distB="0" distL="0" distR="0" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing">
                    <wp:extent cx="4572000" cy="3048000"/>
                    <wp:effectExtent l="0" t="0" r="0" b="0"/>
                    <wp:docPr id="${imgIdx}" name="Picture${imgIdx}"/>
                    <wp:cNvGraphicFramePr>
                      <a:graphicFrameLocks xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" noChangeAspect="1"/>
                    </wp:cNvGraphicFramePr>
                    <a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">
                      <a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture">
                        <pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture">
                          <pic:nvPicPr>
                            <pic:cNvPr id="${imgIdx}" name="Picture${imgIdx}"/>
                            <pic:cNvPicPr/>
                          </pic:nvPicPr>
                          <pic:blipFill>
                            <a:blip xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" r:embed="${relId}"/>
                            <a:stretch><a:fillRect/></a:stretch>
                          </pic:blipFill>
                          <pic:spPr>
                            <a:xfrm><a:off x="0" y="0"/><a:ext cx="4572000" cy="3048000"/></a:xfrm>
                            <a:prstGeom prst="rect"><a:avLst/></a:prstGeom>
                          </pic:spPr>
                        </pic:pic>
                      </a:graphicData>
                    </a:graphic>
                  </wp:inline>
                </w:drawing>
              </w:r>
            </w:p>
            <w:p>
              <w:pPr>
                <w:jc w:val="center"/>
                <w:spacing w:before="40" w:after="120"/>
              </w:pPr>
              <w:r>
                <w:rPr>
                  <w:rFonts w:ascii="KaiTi" w:eastAsia="KaiTi" w:hAnsi="KaiTi"/>
                  <w:sz w:val="20"/>
                  <w:color w:val="475569"/>
                </w:rPr>
                <w:t>【图】${escapeXml(alt)}</w:t>
              </w:r>
            </w:p>
          `);
          return;
        }
      }

      xmlParts.push(`
        <w:p>
          <w:pPr>
            <w:jc w:val="center"/>
            <w:spacing w:before="140" w:after="80"/>
            <w:shd w:val="clear" w:color="auto" w:fill="F8FAFC"/>
          </w:pPr>
          <w:r>
            <w:rPr>
              <w:rFonts w:ascii="KaiTi" w:eastAsia="KaiTi" w:hAnsi="KaiTi"/>
              <w:b/>
              <w:sz w:val="22"/>
              <w:color w:val="2563EB"/>
            </w:rPr>
            <w:t>【图片佐证已内嵌排版：${escapeXml(alt)}】</w:t>
          </w:r>
        </w:p>
      `);
      return;
    }

    // 标题 H1
    if (tagName === "h1") {
      xmlParts.push(`
        <w:p>
          <w:pPr>
            <w:jc w:val="center"/>
            <w:spacing w:before="240" w:after="140"/>
          </w:pPr>
          <w:r>
            <w:rPr>
              <w:rFonts w:ascii="SimHei" w:eastAsia="SimHei" w:hAnsi="SimHei"/>
              <w:b/>
              <w:sz w:val="34"/>
              <w:color w:val="0F2B5C"/>
            </w:rPr>
            <w:t>${escapeXml(el.textContent || "")}</w:t>
          </w:r>
        </w:p>
      `);
      return;
    }

    // 标题 H2
    if (tagName === "h2") {
      xmlParts.push(`
        <w:p>
          <w:pPr>
            <w:jc w:val="center"/>
            <w:spacing w:before="180" w:after="100"/>
          </w:pPr>
          <w:r>
            <w:rPr>
              <w:rFonts w:ascii="SimHei" w:eastAsia="SimHei" w:hAnsi="SimHei"/>
              <w:b/>
              <w:sz w:val="28"/>
              <w:color w:val="1E40AF"/>
            </w:rPr>
            <w:t>${escapeXml(el.textContent || "")}</w:t>
          </w:r>
        </w:p>
      `);
      return;
    }

    // 标题 H3
    if (tagName === "h3") {
      xmlParts.push(`
        <w:p>
          <w:pPr>
            <w:spacing w:before="180" w:after="80"/>
          </w:pPr>
          <w:r>
            <w:rPr>
              <w:rFonts w:ascii="SimHei" w:eastAsia="SimHei" w:hAnsi="SimHei"/>
              <w:b/>
              <w:sz w:val="26"/>
              <w:color w:val="1E40AF"/>
            </w:rPr>
            <w:t>${escapeXml(el.textContent || "")}</w:t>
          </w:r>
        </w:p>
      `);
      return;
    }

    // 表格 TABLE -> 核心解决“一格排版格式的问题”，构建符合规范的标准 OpenXML 单元格表格
    if (tagName === "table") {
      const rows = Array.from(el.querySelectorAll("tr"));
      const tableXmlRows: string[] = [];

      rows.forEach((tr, rowIndex) => {
        const cells = Array.from(tr.querySelectorAll("th, td"));
        const cellXmlList: string[] = [];

        cells.forEach((cell) => {
          const isTh = cell.tagName.toLowerCase() === "th" || rowIndex === 0;
          const cellText = cell.textContent?.trim() || "";
          const isRed = cellText.includes("教师红笔") || cellText.includes("批注") || cellText.includes("✎");

          cellXmlList.push(`
            <w:tc>
              <w:tcPr>
                <w:tcW w:w="0" w:type="auto"/>
                <w:shd w:val="clear" w:color="auto" w:fill="${isTh ? 'F1F5F9' : isRed ? 'FEF2F2' : 'FFFFFF'}"/>
                <w:tcMar>
                  <w:top w:w="120" w:type="dxa"/>
                  <w:left w:w="140" w:type="dxa"/>
                  <w:bottom w:w="120" w:type="dxa"/>
                  <w:right w:w="140" w:type="dxa"/>
                </w:tcMar>
                <w:vAlign w:val="center"/>
              </w:tcPr>
              <w:p>
                <w:pPr>
                  <w:spacing w:line="320" w:lineRule="auto" w:after="0" w:before="0"/>
                  ${isTh ? '<w:jc w:val="center"/>' : ''}
                </w:pPr>
                <w:r>
                  <w:rPr>
                    <w:rFonts w:ascii="${isTh ? 'SimHei' : isRed ? 'KaiTi' : 'SimSun'}" w:eastAsia="${isTh ? 'SimHei' : isRed ? 'KaiTi' : 'SimSun'}" w:hAnsi="${isTh ? 'SimHei' : isRed ? 'KaiTi' : 'SimSun'}"/>
                    ${isTh || isRed ? '<w:b/>' : ''}
                    <w:sz w:val="22"/>
                    <w:color w:val="${isRed ? 'DC2626' : isTh ? '0F2B5C' : '1E293B'}"/>
                  </w:rPr>
                  <w:t xml:space="preserve">${escapeXml(cellText)}</w:t>
                </w:r>
              </w:p>
            </w:tc>
          `);
        });

        tableXmlRows.push(`
          <w:tr>
            <w:trPr>
              ${rowIndex === 0 ? '<w:tblHeader/>' : ''}
              <w:cantSplit/>
            </w:trPr>
            ${cellXmlList.join("\n")}
          </w:tr>
        `);
      });

      xmlParts.push(`
        <w:tbl>
          <w:tblPr>
            <w:tblW w:w="5000" w:type="pct"/>
            <w:tblBorders>
              <w:top w:val="single" w:sz="6" w:space="0" w:color="CBD5E1"/>
              <w:left w:val="single" w:sz="6" w:space="0" w:color="CBD5E1"/>
              <w:bottom w:val="single" w:sz="6" w:space="0" w:color="CBD5E1"/>
              <w:right w:val="single" w:sz="6" w:space="0" w:color="CBD5E1"/>
              <w:insideH w:val="single" w:sz="4" w:space="0" w:color="E2E8F0"/>
              <w:insideV w:val="single" w:sz="4" w:space="0" w:color="E2E8F0"/>
            </w:tblBorders>
            <w:tblCellMar>
              <w:top w:w="120" w:type="dxa"/>
              <w:left w:w="140" w:type="dxa"/>
              <w:bottom w:w="120" w:type="dxa"/>
              <w:right w:w="140" w:type="dxa"/>
            </w:tblCellMar>
          </w:tblPr>
          ${tableXmlRows.join("\n")}
        </w:tbl>
        <w:p><w:pPr><w:spacing w:after="100"/></w:pPr></w:p>
      `);
      return;
    }

    // 教师红笔批注或高亮框
    const text = el.textContent?.trim() || "";
    if (text.includes("教师红笔批") || text.includes("✎ 教师") || text.includes("★【教师")) {
      xmlParts.push(`
        <w:p>
          <w:pPr>
            <w:ind w:left="360" w:right="360"/>
            <w:spacing w:before="100" w:after="100"/>
            <w:shd w:val="clear" w:color="auto" w:fill="FEF2F2"/>
          </w:pPr>
          <w:r>
            <w:rPr>
              <w:rFonts w:ascii="KaiTi" w:eastAsia="KaiTi" w:hAnsi="KaiTi"/>
              <w:b/>
              <w:sz w:val="23"/>
              <w:color w:val="DC2626"/>
            </w:rPr>
            <w:t xml:space="preserve">${escapeXml(text)}</w:t>
          </w:r>
        </w:p>
      `);
      return;
    }

    // 普通段落
    if (tagName === "p" || tagName === "div") {
      const isSubtitle = text.includes("授课单位：") || text.includes("执教教师：") || text.includes("报送学校：");
      xmlParts.push(`
        <w:p>
          <w:pPr>
            ${isSubtitle ? '<w:jc w:val="center"/>' : '<w:ind w:firstLine="480"/>'}
            <w:spacing w:line="360" w:lineRule="auto" w:after="100"/>
          </w:pPr>
          <w:r>
            <w:rPr>
              <w:rFonts w:ascii="${isSubtitle ? 'KaiTi' : 'SimSun'}" w:eastAsia="${isSubtitle ? 'KaiTi' : 'SimSun'}" w:hAnsi="${isSubtitle ? 'KaiTi' : 'SimSun'}"/>
              <w:sz w:val="${isSubtitle ? '22' : '24'}"/>
              <w:color w:val="${isSubtitle ? '475569' : '1E293B'}"/>
            </w:rPr>
            <w:t xml:space="preserve">${escapeXml(text)}</w:t>
          </w:r>
        </w:p>
      `);
      return;
    }

    Array.from(el.childNodes).forEach(processNode);
  }

  Array.from(body.childNodes).forEach(processNode);

  if (xmlParts.length === 0) {
    return plainFallback
      .split("\n")
      .map(
        (l) => `<w:p><w:r><w:t xml:space="preserve">${escapeXml(l)}</w:t></w:r></w:p>`
      )
      .join("\n");
  }

  return xmlParts.join("\n");
}

/**
 * 构建高兼容性的 .docx OpenXML 结构
 */
export async function buildDocxBlob(
  title: string,
  contentHtml: string,
  plainText: string
): Promise<Blob> {
  const zip = new JSZip();
  const extractedImages: ExtractedDocImage[] = [];
  const bodyXml = convertHtmlToOpenXml(contentHtml, plainText, extractedImages);

  zip.file(
    "[Content_Types].xml",
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Default Extension="png" ContentType="image/png"/>
  <Default Extension="jpeg" ContentType="image/jpeg"/>
  <Default Extension="jpg" ContentType="image/jpeg"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
</Types>`
  );

  zip.folder("_rels")?.file(
    ".rels",
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`
  );

  let documentRelsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
  ${extractedImages
    .map(
      (img) =>
        `<Relationship Id="${img.id}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/${img.fileName}"/>`
    )
    .join("\n")}
</Relationships>`;
  zip.folder("word")?.folder("_rels")?.file("document.xml.rels", documentRelsXml);

  // 将提取出的图片以二进制形式直接写入 word/media
  extractedImages.forEach((img) => {
    zip.folder("word")?.folder("media")?.file(img.fileName, img.base64Data, { base64: true });
  });

  zip.folder("word")?.file(
    "styles.xml",
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:docDefaults>
    <w:rPrDefault>
      <w:rPr>
        <w:rFonts w:ascii="SimSun" w:eastAsia="SimSun" w:hAnsi="SimSun" w:cs="SimSun"/>
        <w:sz w:val="24"/>
        <w:szCs w:val="24"/>
        <w:lang w:val="zh-CN"/>
      </w:rPr>
    </w:rPrDefault>
  </w:docDefaults>
  <w:style w:type="paragraph" w:default="1" w:styleId="Normal">
    <w:name w:val="Normal"/>
    <w:pPr>
      <w:spacing w:line="360" w:lineRule="auto" w:after="100"/>
    </w:pPr>
  </w:style>
</w:styles>`
  );

  const documentXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"
            xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <w:body>
    ${bodyXml}
    <w:sectPr>
      <w:pgSz w:w="11906" w:h="16838"/>
      <w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="720" w:footer="720"/>
    </w:sectPr>
  </w:body>
</w:document>`;
  zip.folder("word")?.file("document.xml", documentXml);

  return await zip.generateAsync({
    type: "blob",
    mimeType:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    compression: "DEFLATE",
    compressionOptions: { level: 6 },
  });
}

/**
 * 利用 html2canvas 与 jsPDF 动态生成高清标准 A4 规格 PDF 文件（支持插入的图片及真实表格）
 */
export async function buildPdfBlob(
  title: string,
  htmlContent: string
): Promise<Blob> {
  if (typeof document === "undefined") {
    return new Blob([], { type: "application/pdf" });
  }

  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.left = "-9999px";
  container.style.top = "0";
  container.style.width = "820px";
  container.style.padding = "36px 42px";
  container.style.backgroundColor = "#ffffff";
  container.style.color = "#1e293b";
  container.style.fontFamily = "'PingFang SC', 'Microsoft YaHei', SimSun, sans-serif";
  container.style.boxSizing = "border-box";
  container.innerHTML = htmlContent;

  document.body.appendChild(container);

  try {
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
    });

    const imgWidth = 595.28;
    const pageHeight = 841.89;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });

    let heightLeft = imgHeight;
    let position = 0;

    const imgData = canvas.toDataURL("image/jpeg", 0.96);

    pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    return pdf.output("blob");
  } finally {
    document.body.removeChild(container);
  }
}

/**
 * 单独下载单个 Word (.docx) 文件（支持使用用户在线编辑版本）
 */
export async function downloadSingleFile(
  itemId: string,
  config: TeacherConfig,
  customDoc?: { html: string; plainText: string; title: string }
): Promise<void> {
  const item = materialsList.find((m) => m.id === itemId);
  if (!item) return;

  const doc = customDoc || generateDocumentContent(itemId, config);

  if (item.fileType === "docx") {
    const blob = await buildDocxBlob(doc.title, doc.html, doc.plainText);
    saveAs(blob, item.fileName);
  } else if (item.fileType === "csv") {
    const blob = new Blob(["\uFEFF" + doc.plainText], {
      type: "text/csv;charset=utf-8;",
    });
    saveAs(blob, item.fileName);
  } else {
    const blob = new Blob([doc.plainText], {
      type: "text/plain;charset=utf-8;",
    });
    saveAs(blob, item.fileName);
  }
}

/**
 * 单独下载对应的 PDF (.pdf) 文件（支持使用用户在线编辑版本）
 */
export async function downloadSinglePdf(
  itemId: string,
  config: TeacherConfig,
  customDoc?: { html: string; plainText: string; title: string }
): Promise<void> {
  const item = materialsList.find((m) => m.id === itemId);
  if (!item) return;

  const doc = customDoc || generateDocumentContent(itemId, config);
  const pdfBlob = await buildPdfBlob(doc.title, doc.html);
  const pdfFileName = item.fileName.replace(/\.docx$/, ".pdf");
  saveAs(pdfBlob, pdfFileName);
}

/**
 * 打包导出全套申报材料 (ZIP)，若用户在线编辑过某些材料，自动优先打包已编辑的专属版本
 */
export async function downloadAllZip(
  config: TeacherConfig,
  onProgress: (percent: number, statusText: string) => void,
  customDocs?: Record<string, { html: string; plainText: string; title: string }>
): Promise<void> {
  const zip = new JSZip();
  const rootFolderName = `安徽省${config.year}基础教育精品课_耿棚中学_信息技术《1.3信息及其特征》全套申报材料_刘家阳`;
  const root = zip.folder(rootFolderName) || zip;

  const total = materialsList.length;

  for (let i = 0; i < total; i++) {
    const item = materialsList[i];
    const percent = Math.round(((i + 1) / (total + 2)) * 85);
    onProgress(percent, `正在生成并封装【${item.fileName}】...`);

    const doc =
      customDocs && customDocs[item.id]
        ? customDocs[item.id]
        : generateDocumentContent(item.id, config);

    if (item.fileType === "docx") {
      const docxBlob = await buildDocxBlob(doc.title, doc.html, doc.plainText);
      root.file(item.fileName, docxBlob);

      if (item.hasPdf) {
        onProgress(percent, `正在同步生成对应【${item.fileName.replace(/\.docx$/, ".pdf")}】...`);
        try {
          const pdfBlob = await buildPdfBlob(doc.title, doc.html);
          root.file(item.fileName.replace(/\.docx$/, ".pdf"), pdfBlob);
        } catch (pdfErr) {
          console.warn("PDF generation fallback:", pdfErr);
        }
      }
    } else if (item.fileType === "csv") {
      root.file(item.fileName, "\uFEFF" + doc.plainText);
    } else {
      root.file(item.fileName, doc.plainText);
    }

    await new Promise((r) => setTimeout(r, 60));
  }

  onProgress(92, "正在执行 ZIP 双格式数据流高压缩打包...");
  const zipBlob = await zip.generateAsync({
    type: "blob",
    compression: "DEFLATE",
    compressionOptions: { level: 6 },
  });

  onProgress(100, "成果包（含 DOCX + PDF 双格式）构建完毕，正在下载保存...");
  saveAs(zipBlob, `${rootFolderName}.zip`);
}
