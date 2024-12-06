import { usePathname } from "next/navigation";
import { i18n, type Locale } from "../i18n-config";
import ZH_CONFIG from "../dictionaries/zh.json";
import EN_CONFIG from "../dictionaries/en.json";

export const getDictionary = (locale: Locale) => {
  if (i18n.locales.includes(locale)) {
    const dict_map = {
      zh: ZH_CONFIG,
      en: EN_CONFIG,
    };
    return dict_map[locale];
  }
  return {};
};

export const useLocale = () => {
  const pathname = usePathname();
  const locale = pathname.split("/")[1];
  return locale as Locale;
};

export const useDictionary = () => {
  const locale = useLocale();
  const dict = getDictionary(locale);
  return {
    locale,
    dictionary: dict,
  };
};
