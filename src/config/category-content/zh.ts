/**
 * 简体中文（zh）类目支柱内容，覆盖 6 个 PDF 工具大类。
 * 结构与 en.ts 保持一致。
 */

import type { ToolCategory } from '@/types/tool';
import type { CategoryContent } from './index';

export const categoryContentZh: Record<ToolCategory, CategoryContent> = {
  'edit-annotate': {
    title: '编辑与批注 PDF — 免费在线 PDF 编辑器',
    metaDescription:
      '免费在线编辑文字、添加批注、图章、水印与高亮，修改任意 PDF。无需注册，全程浏览器本地处理，私密安全。',
    keywords: [
      '编辑PDF',
      'PDF批注',
      '在线PDF编辑器',
      'PDF高亮',
      'PDF加水印',
      'PDF图章',
      '免费PDF编辑器',
      'PDF涂销',
      'PDF评论',
      '填写PDF表单',
    ],
    description: `
      <p>过去编辑 PDF 往往要购买昂贵的桌面软件。借助 PDFCraft 的「编辑与批注」工具，你可以修改文字、标注页面、添加图章与水印、填写表单并涂销敏感内容——全程在浏览器中免费完成。</p>
      <p>所有处理都在你的设备本地进行，文件不会上传到服务器，合同、草稿和个人文档始终私密。选择下方任意工具即可开始。</p>
    `,
    sections: [
      {
        heading: '本类目能做什么',
        body: `
          <p>「编辑与批注」簇覆盖了人们对成品 PDF 最常做的改动：</p>
          <ul>
            <li><strong>文字与内容</strong>——修改已有文字、调整颜色、重排页面元素。</li>
            <li><strong>标注</strong>——高亮、下划线、删除线以及添加评论备注。</li>
            <li><strong>品牌化</strong>——插入水印、页眉页脚与自定义图章。</li>
            <li><strong>表单</strong>——填写交互式表单并新建可填字段。</li>
            <li><strong>隐私</strong>——永久涂销文字、移除批注后再分享。</li>
          </ul>
        `,
      },
      {
        heading: '典型操作流程',
        body: `
          <ol>
            <li>打开对应工具（如「编辑 PDF」或「添加水印」）。</li>
            <li>将文件拖入上传区或点击选择文件。</li>
            <li>进行改动——输入、绘制、放置图章或设定涂销区域。</li>
            <li>预览结果并下载更新后的 PDF。</li>
          </ol>
          <p>多数操作几秒即可完成，你还可以串联多个工具（先编辑、再加水印、最后涂销）一次性处理完毕。</p>
        `,
      },
      {
        heading: '技巧与最佳实践',
        body: `
          <ul>
            <li>隐藏机密时请使用<strong>涂销</strong>而非简单黑框——涂销会从文件中删除底层文字，无法被还原。</li>
            <li>将<strong>水印</strong>作为最后一步添加，使其覆盖在所有内容之上。</li>
            <li>批量任务请优先使用专用批量工具（如批量去水印），而非反复使用单文件工具。</li>
            <li>若日后可能仍需参考被隐藏的文字，请保留一份未涂销的原件。</li>
          </ul>
        `,
      },
    ],
    faq: [
      {
        question: 'PDF 编辑器真的免费吗？',
        answer: '是的。PDFCraft 上的每一个「编辑与批注」工具都免费使用，无需账号、输出不带水印、也无隐藏限制。',
      },
      {
        question: '我的文档会被上传到服务器吗？',
        answer: '不会。处理在你的浏览器中进行，文件不会发送到我们的服务器，合同与个人 PDF 始终私密。',
      },
      {
        question: '能编辑扫描件（纯图片）PDF 吗？',
        answer: '纯图片扫描件无法直接作为文字编辑。请先使用 OCR 工具识别文字，再使用编辑器。',
      },
      {
        question: '如何永久隐藏敏感文字？',
        answer: '使用涂销工具。与绘制黑色矩形不同，涂销会从文件中删除该文字，之后无法被还原显示。',
      },
    ],
  },

  'convert-to-pdf': {
    title: '转为 PDF — 免费文件转 PDF 转换器',
    metaDescription:
      '免费在线将 Word、Excel、图片、电子书等 20 多种格式转为 PDF。快速、私密，浏览器本地转换，无需注册。',
    keywords: [
      '转为PDF',
      'Word转PDF',
      '图片转PDF',
      'JPG转PDF',
      'Excel转PDF',
      '电子书转PDF',
      '免费PDF转换器',
      '文件转PDF',
      '在线转换器',
      'PDF生成器',
    ],
    description: `
      <p>PDF 是跨设备保持一致排版的通用格式。「转为 PDF」簇让你把 Word、Excel、PowerPoint、图片、文本、电子书等转换为干净的 PDF——无需安装任何软件。</p>
      <p>在下方选择源格式，上传文件，几秒即可下载精致的 PDF。所有转换在你的浏览器本地完成，文件从不离开你的设备。</p>
    `,
    sections: [
      {
        heading: '可转为 PDF 的格式',
        body: `
          <ul>
            <li><strong>办公文档</strong>——Word、Excel、PowerPoint、RTF。</li>
            <li><strong>图片</strong>——JPG、PNG、WebP、BMP、TIFF、SVG、HEIC。</li>
            <li><strong>电子书与文本</strong>——ePub、MOBI、FB2、纯文本、Markdown。</li>
            <li><strong>其他</strong>——XPS、邮件文件、PostScript/PSD 等。</li>
          </ul>
        `,
      },
      {
        heading: '转换如何进行',
        body: `
          <ol>
            <li>选择匹配源格式的工具（如「Word 转 PDF」）。</li>
            <li>上传一个或多个文件。</li>
            <li>文件在你的浏览器本地被渲染为 PDF。</li>
            <li>下载生成的 PDF，或继续转换下一批。</li>
          </ol>
        `,
      },
      {
        heading: '获得更好结果的技巧',
        body: `
          <ul>
            <li>多页文档请先用「图片转 PDF」合并图片，保持为一个整洁文件。</li>
            <li>转换时会嵌入字体，PDF 可在任何设备上正确显示。</li>
            <li>若源文件图片很大，转换后用「优化与修复」簇压缩体积。</li>
          </ul>
        `,
      },
    ],
    faq: [
      {
        question: '可以把哪些格式转成 PDF？',
        answer: '超过 20 种：微软办公文件、常见图片、电子书（ePub/MOBI/FB2）、文本、Markdown、XPS 等。',
      },
      {
        question: '排版会保持一致吗？',
        answer: '会。字体与排版都会被保留，PDF 尽可能与你的原稿一致。',
      },
      {
        question: '有文件大小限制吗？',
        answer: 'PDFCraft 不设置人为大小限制。极大的文件可能耗时更久，但仍会在浏览器中完成转换。',
      },
      {
        question: '需要安装软件吗？',
        answer: '不需要。转换完全在你的网页浏览器中进行——无插件、无桌面应用、无需注册。',
      },
    ],
  },

  'convert-from-pdf': {
    title: '从 PDF 转换 — 免费 PDF 转文件转换器',
    metaDescription:
      '免费在线将 PDF 提取为 Word、Excel、图片、文本、Markdown 等。保留格式，浏览器本地处理，私密安全。',
    keywords: [
      '从PDF转换',
      'PDF转Word',
      'PDF转Excel',
      'PDF转图片',
      'PDF转文本',
      'PDF转Markdown',
      'PDF提取',
      '免费PDF转换器',
      'PDF转JPG',
      'PDF转DOCX',
    ],
    description: `
      <p>需要把内容从 PDF 中取出来？「从 PDF 转换」簇将成品 PDF 转换为可编辑的办公文件、图片、纯文本、Markdown、JSON 等——让你复用数据，而不必重新录入。</p>
      <p>在下方选择目标格式。转换在你的浏览器本地进行，原文件完好无损，下载的正是你需要的文件。</p>
    `,
    sections: [
      {
        heading: '可从 PDF 提取什么',
        body: `
          <ul>
            <li><strong>可编辑文档</strong>——Word（DOCX）、PowerPoint（PPTX）、Excel（XLSX）。</li>
            <li><strong>图片</strong>——JPG、PNG、TIFF、SVG，支持逐页或批量导出。</li>
            <li><strong>结构化文本</strong>——纯文本、Markdown、JSON 及灰度渲染。</li>
            <li><strong>数据</strong>——将表格提取为适合电子表格的输出。</li>
          </ul>
        `,
      },
      {
        heading: '提取如何进行',
        body: `
          <ol>
            <li>选择目标格式工具（如「PDF 转 Word」）。</li>
            <li>上传你的 PDF。</li>
            <li>转换器解析页面并重建目标文件。</li>
            <li>下载结果并在常用编辑器中打开。</li>
          </ol>
        `,
      },
      {
        heading: '技巧与最佳实践',
        body: `
          <ul>
            <li>扫描版 PDF 请先运行<strong>OCR</strong>，让文字可选后再转为 Word 或文本。</li>
            <li>将内容迁移到文档或知识库时，使用<strong>PDF 转 Markdown</strong>。</li>
            <li>只要插图？<strong>提取图片</strong>会把每个嵌入图形单独导出为文件。</li>
          </ul>
        `,
      },
    ],
    faq: [
      {
        question: '转换出的 Word 文件可编辑吗？',
        answer: '可以。PDF 转 Word 会重建可编辑的 DOCX，保留文字与排版，可在任意文字处理软件中修改。',
      },
      {
        question: '能转换扫描版 PDF 吗？',
        answer: '请先运行 OCR 识别文字，再转换。纯图片页面在被 OCR 之前无法编辑。',
      },
      {
        question: '会保留表格吗？',
        answer: 'PDF 转 Excel 会把表格提取为电子表格单元格，让你直接处理其中的数字。',
      },
      {
        question: '转换过程私密吗？',
        answer: '是的。文件在你的浏览器中处理，不会上传到任何服务器。',
      },
    ],
  },

  'organize-manage': {
    title: '整理与管理 PDF — 合并、拆分与重排',
    metaDescription:
      '免费在线合并、拆分、旋转、重排并管理 PDF 页面。在浏览器中组合文件、提取页面、整理文档。',
    keywords: [
      '合并PDF',
      '拆分PDF',
      '旋转PDF',
      '重排PDF页面',
      '整理PDF',
      '删除PDF页面',
      '组合PDF',
      '免费PDF工具',
      '提取页面',
      'PDF页面管理',
    ],
    description: `
      <p>长篇 PDF 很少一上来就是你需要的结构。「整理与管理」簇让你完全掌控页面：合并多个文件、拆分一个为多个、旋转、删除、提取、重排等——全部免费且在浏览器中完成。</p>
      <p>无论是把各章节拼成报告，还是把 200 页扫描件裁到需要的页面，都可以从下方合适的工具开始。</p>
    `,
    sections: [
      {
        heading: '可用的页面操作',
        body: `
          <ul>
            <li><strong>组合</strong>——合并 PDF，或交替合并两个文件的页面。</li>
            <li><strong>拆分</strong>——按页码范围、大小或书签拆分文件。</li>
            <li><strong>重排</strong>——旋转、反转、拼版（n-up）与重新排序页面。</li>
            <li><strong>裁剪</strong>——删除页面、移除空白页、提取某段范围。</li>
            <li><strong>装配</strong>——添加空白页、小册子与页码标签。</li>
          </ul>
        `,
      },
      {
        heading: '常见工作流',
        body: `
          <ol>
            <li><strong>制作资料包</strong>：将封面信 + 报告 + 附录合并为一个 PDF。</li>
            <li><strong>分享某一章</strong>：拆分长文档，只发送相关页面。</li>
            <li><strong>修正扫描件</strong>：旋转侧放的页面并删除误扫的空白页。</li>
          </ol>
        `,
      },
      {
        heading: '技巧与最佳实践',
        body: `
          <ul>
            <li>需要连续多步操作时，使用<strong>PDF 多功能工具</strong>一次完成。</li>
            <li>打印小册子时，<strong>小册子</strong>工具会按正确顺序拼版。</li>
            <li>合并后添加<strong>页码标签</strong>，让最终文件结构清晰。</li>
          </ul>
        `,
      },
    ],
    faq: [
      {
        question: '合并 PDF 会损失质量吗？',
        answer: '不会。合并只是将页面组合在一起，原始内容与分辨率都得到保留。',
      },
      {
        question: '如何只提取几页？',
        answer: '使用「拆分 PDF」并指定页码范围，或使用「提取页面」将所选页面拉入新文件。',
      },
      {
        question: '有页数或文件数限制吗？',
        answer: '没有人为限制。你可以合并最多 100 个文件，也能处理非常大的文档。',
      },
      {
        question: '合并后的文件私密吗？',
        answer: '是的。所有页面操作都在浏览器中进行，没有任何内容上传到服务器。',
      },
    ],
  },

  'optimize-repair': {
    title: '优化与修复 PDF — 压缩与修复',
    metaDescription:
      '免费在线压缩、修复、线性化并清理 PDF 文件。为邮件与网页缩小超大 PDF，修复损坏文件，无需软件。',
    keywords: [
      '压缩PDF',
      '修复PDF',
      '优化PDF',
      '减小PDF体积',
      '修复PDF文件',
      '线性化PDF',
      'PDF清理',
      '免费PDF优化器',
      'PDF太大',
      '清理PDF',
    ],
    description: `
      <p>PDF 会变得臃肿，偶尔还会损坏。「优化与修复」簇为过大的文件减肥以便邮件与网页使用，修复打不开的文件，并清理隐藏的元数据，让你分享一个整洁、加载迅速的文档。</p>
      <p>在下方选择工具，压缩超大文件、修复无法打开的文件，或在发布前清除不必要的数据。</p>
    `,
    sections: [
      {
        heading: '优化与修复的区别',
        body: `
          <ul>
            <li><strong>优化</strong>——压缩图片、为网页流式浏览做线性化、栅格化或降采样。</li>
            <li><strong>修复</strong>——修复结构损坏、无法打开的 PDF。</li>
            <li><strong>清理</strong>——移除元数据、清理脚本并扁平化交互元素。</li>
            <li><strong>准备</strong>——对扫描件去斜，并转为 PDF/A 以便归档。</li>
          </ul>
        `,
      },
      {
        heading: '何时使用哪个',
        body: `
          <ol>
            <li><strong>邮件发送大文件？</strong>先运行「压缩 PDF」。</li>
            <li><strong>在线打开慢？</strong>做线性化以实现网页流式浏览。</li>
            <li><strong>打不开？</strong>「修复 PDF」会重建结构。</li>
            <li><strong>公开发布？</strong>清理以剔除隐藏数据。</li>
          </ol>
        `,
      },
      {
        heading: '技巧与最佳实践',
        body: `
          <ul>
            <li>附件前先压缩——多数邮件服务商对附件限制约 25 MB。</li>
            <li>长期归档请使用<strong>PDF/A</strong>转换以符合规范。</li>
            <li>对扫描页去斜，让文字摆正后再做 OCR 或压缩。</li>
          </ul>
        `,
      },
    ],
    faq: [
      {
        question: '压缩能让 PDF 小多少？',
        answer: '取决于内容。图片密集的 PDF 往往大幅缩小；已优化过的文件缩小幅度较小。',
      },
      {
        question: '损坏的 PDF 能恢复吗？',
        answer: '多数情况下可以。「修复」工具会重建损坏的结构，让文件在大多数阅读器中重新打开。',
      },
      {
        question: '清理会做什么？',
        answer: '它会移除查看所不需要的脚本、隐藏元数据与交互元素，降低风险与体积。',
      },
      {
        question: '优化是免费的吗？',
        answer: '是的。所有「优化与修复」工具都免费，并在你的浏览器中运行。',
      },
    ],
  },

  'secure-pdf': {
    title: '保护 PDF — 加密、解密与涂销',
    metaDescription:
      '免费在线加密、解密、签名并涂销 PDF 文件。用密码与数字签名保护敏感文档。',
    keywords: [
      '加密PDF',
      'PDF密码保护',
      '解密PDF',
      'PDF签名',
      '数字签名PDF',
      'PDF涂销',
      '保护PDF',
      '免费PDF安全',
      'PDF权限',
      'PDF加密',
    ],
    description: `
      <p>有些 PDF 不该对所有人开放。「保护 PDF」簇通过密码保护文档、限制权限、添加具法律效力的数字签名，并永久涂销机密内容。</p>
      <p>在下方选择工具，锁定文件、解锁你拥有的文件、为其签名，或在分享前清除敏感文字。</p>
    `,
    sections: [
      {
        heading: '安全操作',
        body: `
          <ul>
            <li><strong>加密</strong>——添加密码并设置打开/权限限制。</li>
            <li><strong>解密</strong>——移除你有权打开的文件的密码。</li>
            <li><strong>签名</strong>——应用数字签名或时间戳以证明真实性。</li>
            <li><strong>涂销</strong>——永久删除敏感文字与图片。</li>
            <li><strong>权限</strong>——控制打印、复制与编辑。</li>
          </ul>
        `,
      },
      {
        heading: '如何保护一份文档',
        body: `
          <ol>
            <li>打开「加密 PDF」并上传文件。</li>
            <li>设置强密码并选择权限限制。</li>
            <li>对高保证需求，添加<em>数字签名</em>或时间戳。</li>
            <li>下载受保护 PDF 并妥善保管密码。</li>
          </ol>
        `,
      },
      {
        heading: '技巧与最佳实践',
        body: `
          <ul>
            <li>先<strong>涂销</strong>再<strong>加密</strong>，让隐藏文字被删除而非仅仅隐藏。</li>
            <li>需要证明文件未被篡改时，使用数字签名。</li>
            <li>密码与文件分开保存——不要一同通过邮件发送。</li>
          </ul>
        `,
      },
    ],
    faq: [
      {
        question: '密码保护安全吗？',
        answer: '「加密 PDF」采用标准 PDF 加密。请使用强密码，并与文件分开保管。',
      },
      {
        question: '能移除我自己加的密码吗？',
        answer: '可以。如果你知道密码，「解密 PDF」会移除它，让文件重新自由打开。',
      },
      {
        question: '什么是数字签名？',
        answer: '数字签名以加密方式把你的身份绑定到文件，让收件人能验证文件未被改动。',
      },
      {
        question: '涂销真的会删除文字吗？',
        answer: '是的。涂销会从文件中移除底层内容，不同于可被还原的黑色矩形。',
      },
    ],
  },
};
