export interface WordPressPluginBase {
  slug: string;
  version: string;
  wpMin: string;
  phpMin: string;
  downloadUrl: string;
  tags: string[];
  updatedAt: string;
}

export interface WordPressPluginTranslation {
  name: string;
  description: string;
  features: string[];
}

export interface WordPressPlugin extends WordPressPluginBase {
  name: string;
  description: string;
  features: string[];
}

export interface WordPressPluginsData {
  plugins: WordPressPluginBase[];
}
