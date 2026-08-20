/**
 * English pillar content for the 6 PDF tool categories.
 * Mirrors the tool-content authoring style but at the category (cluster) level.
 */

import type { ToolCategory } from '@/types/tool';
import type { CategoryContent } from './index';

export const categoryContentEn: Record<ToolCategory, CategoryContent> = {
  'edit-annotate': {
    title: 'Edit & Annotate PDF — Free Online PDF Editor',
    metaDescription:
      'Edit text, add annotations, stamps, watermarks and highlights to any PDF online for free. No registration, fully browser-based and private.',
    keywords: [
      'edit PDF',
      'annotate PDF',
      'PDF editor online',
      'highlight PDF',
      'add watermark to PDF',
      'stamp PDF',
      'free PDF editor',
      'redact PDF',
      'comment on PDF',
      'fill PDF form',
    ],
    description: `
      <p>Editing a PDF used to mean buying expensive desktop software. With PDFCraft's Edit &amp; Annotate tools you can change text, mark up pages, add stamps and watermarks, fill forms and redact sensitive content — entirely in your browser, for free.</p>
      <p>Everything runs locally on your device. Your files are never uploaded to a server, so confidential contracts, drafts and personal documents stay private. Pick any tool below to get started.</p>
    `,
    sections: [
      {
        heading: 'What you can do in this category',
        body: `
          <p>The Edit &amp; Annotate cluster covers the everyday changes people need to make to a finished PDF:</p>
          <ul>
            <li><strong>Text &amp; content</strong> — edit existing text, recolor it, and adjust page elements.</li>
            <li><strong>Markup</strong> — highlight, underline, strike through and add comment notes.</li>
            <li><strong>Branding</strong> — insert watermarks, header/footer text and custom stamps.</li>
            <li><strong>Forms</strong> — fill interactive forms and build new fillable fields.</li>
            <li><strong>Privacy</strong> — permanently redact text and remove annotations before sharing.</li>
          </ul>
        `,
      },
      {
        heading: 'Typical workflow',
        body: `
          <ol>
            <li>Open the specific tool (for example <em>Edit PDF</em> or <em>Add Watermark</em>).</li>
            <li>Drop your file into the upload area or browse to select it.</li>
            <li>Make your change — type, draw, place a stamp or set redaction areas.</li>
            <li>Preview the result and download the updated PDF.</li>
          </ol>
          <p>Most operations finish in seconds and you can chain several tools (edit, then watermark, then redact) for a complete pass.</p>
        `,
      },
      {
        heading: 'Tips &amp; best practices',
        body: `
          <ul>
            <li>Use <strong>redaction</strong>, not just a black box, when hiding secrets — redaction removes the underlying text so it cannot be recovered.</li>
            <li>Apply a <strong>watermark</strong> as the last step so it sits above all other content.</li>
            <li>For batch jobs, prefer the dedicated batch tools (e.g. batch watermark remover) over repeating a single-file tool.</li>
            <li>Keep an un-redacted original if you may need to reference the hidden text later.</li>
          </ul>
        `,
      },
    ],
    faq: [
      {
        question: 'Is the PDF editor really free?',
        answer:
          'Yes. Every Edit & Annotate tool on PDFCraft is free to use, with no account, watermark-on-output or hidden limits.',
      },
      {
        question: 'Are my documents uploaded to a server?',
        answer:
          'No. Processing happens in your browser. Files are not sent to our servers, which keeps contracts and personal PDFs private.',
      },
      {
        question: 'Can I edit scanned (image-only) PDFs?',
        answer:
          'Image-only scans are not directly editable as text. Run the OCR tool first to recognize text, then use the editor.',
      },
      {
        question: 'How do I permanently hide sensitive text?',
        answer:
          'Use the redact tool. Unlike drawing a black rectangle, redaction deletes the text from the file so it cannot be revealed later.',
      },
    ],
  },

  'convert-to-pdf': {
    title: 'Convert to PDF — Free File to PDF Converter',
    metaDescription:
      'Turn Word, Excel, images, ePub and 20+ formats into PDF online for free. Fast, private, browser-based conversion with no sign-up.',
    keywords: [
      'convert to PDF',
      'Word to PDF',
      'image to PDF',
      'JPG to PDF',
      'Excel to PDF',
      'ePub to PDF',
      'free PDF converter',
      'file to PDF',
      'online converter',
      'PDF maker',
    ],
    description: `
      <p>PDF is the universal format for sharing documents that look the same everywhere. The Convert to PDF cluster lets you turn Word, Excel, PowerPoint, images, text, e-books and more into a clean PDF — without installing anything.</p>
      <p>Choose a source format below, upload your file, and download a polished PDF in seconds. All conversion runs in your browser, so your files never leave your device.</p>
    `,
    sections: [
      {
        heading: 'Formats you can convert to PDF',
        body: `
          <ul>
            <li><strong>Office</strong> — Word, Excel, PowerPoint, RTF.</li>
            <li><strong>Images</strong> — JPG, PNG, WebP, BMP, TIFF, SVG, HEIC.</li>
            <li><strong>eBooks &amp; text</strong> — ePub, MOBI, FB2, plain text, Markdown.</li>
            <li><strong>Other</strong> — XPS, email files, PostScript/PSD and more.</li>
          </ul>
        `,
      },
      {
        heading: 'How conversion works',
        body: `
          <ol>
            <li>Select the tool that matches your source format (e.g. <em>Word to PDF</em>).</li>
            <li>Upload one or more files.</li>
            <li>The file is rendered to PDF locally in your browser.</li>
            <li>Download the resulting PDF, or convert another batch.</li>
          </ol>
        `,
      },
      {
        heading: 'Tips for better results',
        body: `
          <ul>
            <li>For multi-page documents, combine images first with the <strong>image to PDF</strong> tool to keep one tidy file.</li>
            <li>Fonts are embedded during conversion, so the PDF displays correctly on any device.</li>
            <li>If a source has very large images, run <strong>Optimize &amp; Repair</strong> afterward to shrink the file.</li>
          </ul>
        `,
      },
    ],
    faq: [
      {
        question: 'Which formats can I turn into PDF?',
        answer:
          'Over 20: Microsoft Office files, common images, e-books (ePub/MOBI/FB2), text, Markdown, XPS and more.',
      },
      {
        question: 'Will the layout stay the same?',
        answer:
          'Yes. Fonts and layout are preserved so the PDF matches your original as closely as possible.',
      },
      {
        question: 'Is there a file size limit?',
        answer:
          'PDFCraft imposes no artificial size limit. Very large files may take longer but will still convert in your browser.',
      },
      {
        question: 'Do I need to install software?',
        answer:
          'No. Conversion runs entirely in your web browser — no plugins, no desktop app, no sign-up.',
      },
    ],
  },

  'convert-from-pdf': {
    title: 'Convert from PDF — Free PDF to File Converter',
    metaDescription:
      'Extract content from PDF into Word, Excel, images, text, Markdown and more — free online. Keep formatting, privately, in your browser.',
    keywords: [
      'convert from PDF',
      'PDF to Word',
      'PDF to Excel',
      'PDF to image',
      'PDF to text',
      'PDF to Markdown',
      'extract from PDF',
      'free PDF converter',
      'PDF to JPG',
      'PDF to DOCX',
    ],
    description: `
      <p>Need the content back out of a PDF? The Convert from PDF cluster turns finished PDFs into editable Office files, images, plain text, Markdown, JSON and more — so you can reuse the data instead of retyping it.</p>
      <p>Pick a target format below. Conversion happens locally in your browser, your original stays intact, and you download exactly the file you need.</p>
    `,
    sections: [
      {
        heading: 'What you can extract from a PDF',
        body: `
          <ul>
            <li><strong>Editable docs</strong> — Word (DOCX), PowerPoint (PPTX), Excel (XLSX).</li>
            <li><strong>Images</strong> — JPG, PNG, TIFF, SVG, with per-page or bulk export.</li>
            <li><strong>Structured text</strong> — plain text, Markdown, JSON and greyscale renders.</li>
            <li><strong>Data</strong> — tables pulled into spreadsheet-ready output.</li>
          </ul>
        `,
      },
      {
        heading: 'How extraction works',
        body: `
          <ol>
            <li>Choose the target format tool (e.g. <em>PDF to Word</em>).</li>
            <li>Upload your PDF.</li>
            <li>The converter parses the pages and rebuilds the target file.</li>
            <li>Download the result and open it in your favorite editor.</li>
          </ol>
        `,
      },
      {
        heading: 'Tips &amp; best practices',
        body: `
          <ul>
            <li>For scanned PDFs, run <strong>OCR</strong> first so text becomes selectable before converting to Word or text.</li>
            <li>Use <strong>PDF to Markdown</strong> when moving content into docs or knowledge bases.</li>
            <li>Need just the figures? <strong>Extract images</strong> pulls every embedded graphic as a separate file.</li>
          </ul>
        `,
      },
    ],
    faq: [
      {
        question: 'Will the converted Word file be editable?',
        answer:
          'Yes. PDF to Word rebuilds an editable DOCX with your text and layout, ready to tweak in any word processor.',
      },
      {
        question: 'Can I convert a scanned PDF?',
        answer:
          'Run OCR first to recognize the text, then convert. Image-only pages cannot be edited until they are OCRed.',
      },
      {
        question: 'Does it keep my tables?',
        answer:
          'PDF to Excel extracts tables into spreadsheet cells so you can work with the numbers directly.',
      },
      {
        question: 'Is conversion private?',
        answer:
          'Yes. Files are processed in your browser and are not uploaded to any server.',
      },
    ],
  },

  'organize-manage': {
    title: 'Organize & Manage PDF — Merge, Split & Reorder',
    metaDescription:
      'Merge, split, rotate, reorder and manage PDF pages online for free. Combine files, extract pages and tidy documents in your browser.',
    keywords: [
      'merge PDF',
      'split PDF',
      'rotate PDF',
      'reorder PDF pages',
      'organize PDF',
      'delete PDF pages',
      'combine PDF',
      'free PDF tools',
      'extract pages',
      'PDF page manager',
    ],
    description: `
      <p>Long PDFs rarely arrive in the order you need. The Organize &amp; Manage cluster gives you full control over pages: merge several files, split one into many, rotate, delete, extract, reorder and more — all free and in your browser.</p>
      <p>Whether you are assembling a report from chapters or trimming a 200-page scan down to the pages you need, start with the right tool below.</p>
    `,
    sections: [
      {
        heading: 'Page operations available',
        body: `
          <ul>
            <li><strong>Combine</strong> — merge PDFs or alternate pages from two files.</li>
            <li><strong>Split</strong> — break a file by page range, size or bookmarks.</li>
            <li><strong>Rearrange</strong> — rotate, reverse, n-up, and reorder pages.</li>
            <li><strong>Trim</strong> — delete pages, remove blanks, extract a range.</li>
            <li><strong>Assemble</strong> — add blank pages, booklets and page labels.</li>
          </ul>
        `,
      },
      {
        heading: 'Common workflows',
        body: `
          <ol>
            <li><strong>Build a packet</strong>: merge cover letter + report + appendix into one PDF.</li>
            <li><strong>Share a chapter</strong>: split a long document and send only the relevant pages.</li>
            <li><strong>Fix scans</strong>: rotate sideways pages and delete accidental blanks.</li>
          </ol>
        `,
      },
      {
        heading: 'Tips &amp; best practices',
        body: `
          <ul>
            <li>Use the <strong>PDF Multi-Tool</strong> when you need several operations in one pass.</li>
            <li>For print booklets, the <strong>booklet</strong> tool imposes pages in the correct order.</li>
            <li>Add <strong>page labels</strong> after merging so the final file has a clear structure.</li>
          </ul>
        `,
      },
    ],
    faq: [
      {
        question: 'Can I merge PDFs without losing quality?',
        answer:
          'Yes. Merging simply combines pages; the original content and resolution are preserved.',
      },
      {
        question: 'How do I extract just a few pages?',
        answer:
          'Use Split PDF and specify a page range, or use Extract Pages to pull a selection into a new file.',
      },
      {
        question: 'Is there a page or file limit?',
        answer:
          'No artificial limit. You can merge up to 100 files and work with very large documents.',
      },
      {
        question: 'Are merged files private?',
        answer:
          'Yes. All page operations run in your browser; nothing is uploaded to a server.',
      },
    ],
  },

  'optimize-repair': {
    title: 'Optimize & Repair PDF — Compress & Fix',
    metaDescription:
      'Compress, repair, linearize and clean up PDF files online for free. Shrink large PDFs and fix broken files without software.',
    keywords: [
      'compress PDF',
      'repair PDF',
      'optimize PDF',
      'reduce PDF size',
      'fix PDF',
      'linearize PDF',
      'PDF cleanup',
      'free PDF optimizer',
      'PDF too large',
      'sanitize PDF',
    ],
    description: `
      <p>PDFs get bloated and occasionally corrupted. The Optimize &amp; Repair cluster shrinks oversized files for email and web, fixes broken ones, and cleans hidden metadata so you share a tidy, fast-loading document.</p>
      <p>Select a tool below to compress a huge file, repair a file that will not open, or strip unnecessary data before publishing.</p>
    `,
    sections: [
      {
        heading: 'Optimization vs. repair',
        body: `
          <ul>
            <li><strong>Optimize</strong> — compress images, linearize for fast web viewing, rasterize or downscale.</li>
            <li><strong>Repair</strong> — fix structurally damaged PDFs that fail to open.</li>
            <li><strong>Clean</strong> — remove metadata, sanitize scripts and flatten interactive elements.</li>
            <li><strong>Prepare</strong> — deskew scans and convert to PDF/A for archiving.</li>
          </ul>
        `,
      },
      {
        heading: 'When to use each',
        body: `
          <ol>
            <li><strong>Email a big file?</strong> Run Compress PDF first.</li>
            <li><strong>Slow to open online?</strong> Linearize it for web streaming.</li>
            <li><strong>Won't open?</strong> Repair PDF rebuilds the structure.</li>
            <li><strong>Publishing publicly?</strong> Sanitize to strip hidden data.</li>
          </ol>
        `,
      },
      {
        heading: 'Tips &amp; best practices',
        body: `
          <ul>
            <li>Compress before attaching — most email providers cap attachments around 25 MB.</li>
            <li>Use <strong>PDF/A</strong> conversion for long-term archival compliance.</li>
            <li>Deskew scanned pages so text sits straight before OCR or compression.</li>
          </ul>
        `,
      },
    ],
    faq: [
      {
        question: 'How much can compression shrink a PDF?',
        answer:
          'It depends on the content. Image-heavy PDFs often shrink dramatically; already-optimized files shrink less.',
      },
      {
        question: 'Can a corrupted PDF be recovered?',
        answer:
          'Often, yes. The Repair tool rebuilds damaged structure so the file opens again in most readers.',
      },
      {
        question: 'What does sanitize do?',
        answer:
          'It removes scripts, hidden metadata and interactive elements that are not needed for viewing, reducing risk and size.',
      },
      {
        question: 'Is optimization free?',
        answer:
          'Yes. All Optimize & Repair tools are free and run in your browser.',
      },
    ],
  },

  'secure-pdf': {
    title: 'Secure PDF — Encrypt, Decrypt & Redact',
    metaDescription:
      'Encrypt, decrypt, sign and redact PDF files online for free. Protect sensitive documents with passwords and digital signatures.',
    keywords: [
      'encrypt PDF',
      'password protect PDF',
      'decrypt PDF',
      'sign PDF',
      'digital signature PDF',
      'redact PDF',
      'secure PDF',
      'free PDF security',
      'PDF permissions',
      'protect PDF',
    ],
    description: `
      <p>Some PDFs should not be open to everyone. The Secure PDF cluster protects documents with passwords, restricts permissions, adds legally recognized digital signatures, and permanently redacts confidential content.</p>
      <p>Choose a tool below to lock a file, unlock one you own, sign it, or scrub sensitive text before sharing.</p>
    `,
    sections: [
      {
        heading: 'Security operations',
        body: `
          <ul>
            <li><strong>Encrypt</strong> — add a password and set open/permission restrictions.</li>
            <li><strong>Decrypt</strong> — remove a password from a file you are authorized to open.</li>
            <li><strong>Sign</strong> — apply a digital signature or timestamp to prove authenticity.</li>
            <li><strong>Redact</strong> — permanently delete sensitive text and images.</li>
            <li><strong>Permissions</strong> — control printing, copying and editing.</li>
          </ul>
        `,
      },
      {
        heading: 'How to protect a document',
        body: `
          <ol>
            <li>Open <em>Encrypt PDF</em> and upload your file.</li>
            <li>Set a strong password and choose permission limits.</li>
            <li>For high-assurance needs, add a <em>digital signature</em> or timestamp.</li>
            <li>Download the secured PDF and keep the password safe.</li>
          </ol>
        `,
      },
      {
        heading: 'Tips &amp; best practices',
        body: `
          <ul>
            <li>Redact <em>before</em> encrypting so the hidden text is gone, not just hidden.</li>
            <li>Use digital signatures when you need to prove a file was not altered.</li>
            <li>Store passwords separately from the files — do not email both together.</li>
          </ul>
        `,
      },
    ],
    faq: [
      {
        question: 'Is password protection secure?',
        answer:
          'Encrypt PDF applies standard PDF encryption. Use a strong password and keep it separate from the file.',
      },
      {
        question: 'Can I remove a password I added?',
        answer:
          'Yes. If you know the password, Decrypt PDF removes it so the file opens freely again.',
      },
      {
        question: 'What is a digital signature?',
        answer:
          'A digital signature cryptographically binds your identity to the file, letting recipients verify it was not changed.',
      },
      {
        question: 'Does redaction really delete text?',
        answer:
          'Yes. Redaction removes the underlying content from the file, unlike a black box which can be reversed.',
      },
    ],
  },
};
