import { usePathname } from "next/navigation";
import { i18n, type Locale } from "../i18n-config";
import ZH_CONFIG from "../dictionaries/zh.json";
import EN_CONFIG from "../dictionaries/en.json";

// 定义 dictionary 类型
interface Dictionary {
  sidebar: {
    platform: string;
    recent_project: string;
    support: string;
    feedback: string;
    settings: {
      title: string;
      account: string;
      general: string;
    };
    drones: {
      title: string;
    };
    applications: {
      title: string;
      inspection: string;
    };
    data: {
      title: string;
    };
    user: {
      logout: string;
    };
  };
  application: {
    inspection: {
      title: string;
      start: string;
      stop: string;
    };
  };
}

export const getDictionary = (locale: Locale): Dictionary => {
  if (i18n.locales.includes(locale)) {
    const dict_map = {
      zh: ZH_CONFIG,
      en: EN_CONFIG,
    };
    return dict_map[locale] as Dictionary;
  }
  return {} as Dictionary;
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
