export interface ResumeMeta {
  sourcePdf: string;
  updatedAt: string;
  version: number;
}

export interface ResumeContacts {
  phone: string;
  email: string;
  telegram: string;
  telegramUrl: string;
  portfolio: string;
}

export interface ResumePersonal {
  name: string;
  title: string;
  birthDate: string;
  age: number;
  location: string;
  citizenship: string;
  workPermit: string[];
  relocation: string;
  totalExperience: string;
  employmentTypes: string[];
  workFormats: string[];
  contacts: ResumeContacts;
  pdfUrl: string;
}

export interface ResumeExperience {
  company: string;
  location: string;
  industry: string;
  role: string;
  period: string;
  duration: string;
  description: string;
  highlights: string[];
  stack: string[];
  website?: string;
}

export interface ResumeEducation {
  year: string;
  institution: string;
  degree: string;
  type: string;
}

export interface ResumeCourse {
  year: string;
  title: string;
  provider: string;
}

export interface ResumeLanguage {
  name: string;
  level: string;
}

export interface ResumeDriving {
  hasCar: boolean;
  license: string;
}

export interface ResumeRecommendations {
  company: string;
  contact: string;
}

export interface ResumeData {
  meta: ResumeMeta;
  personal: ResumePersonal;
  about: string;
  experience: ResumeExperience[];
  education: ResumeEducation[];
  courses: ResumeCourse[];
  skills: string[];
  languages: ResumeLanguage[];
  driving: ResumeDriving;
  recommendations: ResumeRecommendations;
}

export const RESUME_JSON_URL = "/resume/resume.json";
