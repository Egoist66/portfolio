import { Locale } from "../i18n";
import { ResumeData } from "../types/resume";

export type ResumePdfLabels = {
  experience: string;
  skills: string;
  languages: string;
  education: string;
  courses: string;
  additional: string;
  about: string;
  workExperience: string;
  citizenship: string;
  workPermit: string;
  format: string;
  employment: string;
  ownCar: string;
  recommendations: string;
  portfolio: string;
  updated: string;
};

type PdfContent = Record<string, unknown> | string;
type PdfDocumentDefinition = Record<string, unknown>;

type PdfMakeInstance = {
  createPdf: (doc: PdfDocumentDefinition) => {
    download: (filename: string) => void;
  };
  vfs?: Record<string, string>;
};

declare global {
  interface Window {
    pdfMake?: PdfMakeInstance;
  }
}

const PDFMAKE_CDN = "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.10";

const ACCENT = "#5b4fd9";
const MUTED = "#64748b";
const TEXT = "#1e293b";
const BORDER = "#e2e8f0";

const loadedScripts = new Set<string>();

function loadScript(src: string): Promise<void> {
  if (loadedScripts.has(src)) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);
    if (existing) {
      if (existing.dataset.loaded === "true") {
        loadedScripts.add(src);
        resolve();
        return;
      }

      existing.addEventListener("load", () => {
        existing.dataset.loaded = "true";
        loadedScripts.add(src);
        resolve();
      });
      existing.addEventListener("error", () => reject(new Error(`Failed to load ${src}`)));
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => {
      script.dataset.loaded = "true";
      loadedScripts.add(src);
      resolve();
    };
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(script);
  });
}

async function getPdfMake(): Promise<PdfMakeInstance> {
  if (!window.pdfMake?.createPdf) {
    await loadScript(`${PDFMAKE_CDN}/pdfmake.min.js`);
    await loadScript(`${PDFMAKE_CDN}/vfs_fonts.js`);
  }

  if (!window.pdfMake?.createPdf) {
    throw new Error("pdfMake is unavailable");
  }

  return window.pdfMake;
}

function sectionTitle(text: string): PdfContent {
  return {
    text,
    style: "sectionTitle",
    margin: [0, 14, 0, 8],
  };
}

function buildDocument(data: ResumeData, labels: ResumePdfLabels): PdfDocumentDefinition {
  const {
    meta,
    personal,
    about,
    experience,
    education,
    courses,
    skills,
    languages,
    driving,
    recommendations,
  } = data;

  const contactLine = [
    personal.contacts.phone,
    personal.contacts.email,
    personal.contacts.telegram,
    `${labels.portfolio}: ${personal.contacts.portfolio}`,
  ].join("  ·  ");

  const experienceBlocks: PdfContent[] = experience.flatMap((job) => {
    const block: PdfContent[] = [
      {
        columns: [
          {
            width: "*",
            stack: [
              { text: job.role, style: "jobRole" },
              { text: job.company, style: "jobCompany" },
              {
                text: `${job.industry} · ${job.location}`,
                style: "muted",
                margin: [0, 2, 0, 0],
              },
            ],
          },
          {
            width: "auto",
            stack: [
              { text: job.period, style: "jobDate", alignment: "right" },
              {
                text: job.duration,
                style: "mutedSmall",
                alignment: "right",
                margin: [0, 2, 0, 0],
              },
            ],
          },
        ],
        columnGap: 12,
        margin: [0, 0, 0, 6],
      },
      { text: job.description, style: "body", margin: [0, 0, 0, 6] },
    ];

    if (job.highlights.length > 0) {
      block.push({
        ul: job.highlights.map((item) => String(item)),
        style: "bulletList",
        margin: [0, 0, 0, 6],
      });
    }

    if (job.stack.length > 0) {
      block.push({
        text: job.stack.join(" · "),
        style: "stackTags",
        margin: [0, 0, 0, 12],
      });
    }

    block.push({
      canvas: [
        {
          type: "line",
          x1: 0,
          y1: 0,
          x2: 515,
          y2: 0,
          lineWidth: 0.5,
          lineColor: BORDER,
        },
      ],
      margin: [0, 0, 0, 12],
    });

    return block;
  });

  const additionalItems: string[] = [
    `${labels.citizenship}: ${personal.citizenship}. ${labels.workPermit}: ${personal.workPermit.join(", ")}`,
    `${labels.format}: ${personal.workFormats.join(", ")}`,
    `${labels.employment}: ${personal.employmentTypes.join(", ")}`,
  ];

  if (driving.hasCar) {
    additionalItems.push(`${driving.license}. ${labels.ownCar}`);
  }

  additionalItems.push(
    `${labels.recommendations}: ${recommendations.company} — ${recommendations.contact}`
  );

  const content: PdfContent[] = [
    { text: personal.name, style: "name" },
    { text: personal.title, style: "title" },
    { text: contactLine, style: "contact", margin: [0, 8, 0, 6] },
    {
      text: [
        personal.location,
        `${labels.experience}: ${personal.totalExperience}`,
        personal.relocation,
      ].join("  ·  "),
      style: "muted",
      margin: [0, 0, 0, 16],
    },
    sectionTitle(labels.about),
    { text: about, style: "body", margin: [0, 0, 0, 4] },
    sectionTitle(labels.workExperience),
    ...experienceBlocks,
    sectionTitle(labels.skills),
    { text: skills.join(", "), style: "body", margin: [0, 0, 0, 4] },
    sectionTitle(labels.languages),
    {
      ul: languages.map((lang) => `${lang.name} — ${lang.level}`),
      style: "bulletList",
    },
    sectionTitle(labels.education),
    ...education.map((edu) => ({
      text: [
        { text: `${edu.year} · ${edu.type}\n`, bold: true, fontSize: 8.5, color: ACCENT },
        { text: `${edu.degree}\n`, bold: true },
        { text: edu.institution, color: MUTED },
      ],
      margin: [0, 0, 0, 8],
    })),
    sectionTitle(labels.courses),
    ...courses.map((course) => ({
      text: [
        { text: `${course.year}\n`, bold: true, fontSize: 8.5, color: ACCENT },
        { text: `${course.title}\n`, bold: true },
        { text: course.provider, color: MUTED },
      ],
      margin: [0, 0, 0, 8],
    })),
    sectionTitle(labels.additional),
    { ul: [...additionalItems], style: "bulletList" },
  ];

  if (meta.updatedAt) {
    content.push({
      text: `${labels.updated}: ${meta.updatedAt}`,
      style: "footer",
      margin: [0, 16, 0, 0],
    });
  }

  return {
    pageSize: "A4",
    pageMargins: [40, 48, 40, 48],
    defaultStyle: {
      font: "Roboto",
      fontSize: 9.5,
      color: TEXT,
      lineHeight: 1.35,
    },
    content,
    styles: {
      name: { fontSize: 22, bold: true, color: TEXT },
      title: { fontSize: 13, bold: true, color: ACCENT, margin: [0, 4, 0, 0] },
      contact: { fontSize: 8.5, color: MUTED },
      sectionTitle: { fontSize: 11, bold: true, color: TEXT },
      body: { fontSize: 9.5, color: MUTED },
      muted: { fontSize: 9, color: MUTED },
      mutedSmall: { fontSize: 8, color: MUTED },
      jobRole: { fontSize: 10.5, bold: true, color: TEXT },
      jobCompany: { fontSize: 9.5, bold: true, color: ACCENT },
      jobDate: { fontSize: 8.5, bold: true, color: TEXT },
      stackTags: { fontSize: 7.5, bold: true, color: ACCENT },
      bulletList: { fontSize: 9, color: MUTED },
      footer: { fontSize: 7.5, color: MUTED, alignment: "right" },
    },
  };
}

function slugify(value: string): string {
  return value
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/-+/g, "-");
}

export async function generateResumePdf(
  data: ResumeData,
  labels: ResumePdfLabels,
  locale: Locale
): Promise<void> {
  const pdfMake = await getPdfMake();
  const snapshot = JSON.parse(JSON.stringify(data)) as ResumeData;
  const docDefinition = buildDocument(snapshot, labels);
  const fileName = `CV-${slugify(data.personal.name) || "resume"}-${locale}.pdf`;

  pdfMake.createPdf(docDefinition).download(fileName);
}
