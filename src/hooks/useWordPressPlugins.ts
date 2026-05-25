import pluginsData from "../data/wordpress-plugins.json";
import { wordpressPluginTranslations } from "../i18n/wordpress";
import { useLanguage } from "../context/LanguageContext";
import { WordPressPlugin } from "../types/wordpress";

export function useWordPressPlugins(): WordPressPlugin[] {
  const { locale } = useLanguage();

  return pluginsData.plugins.map((plugin, index) => {
    const translation = wordpressPluginTranslations[locale][index];

    return {
      ...plugin,
      name: translation?.name ?? plugin.slug,
      description: translation?.description ?? "",
      features: translation?.features ?? [],
    };
  });
}
