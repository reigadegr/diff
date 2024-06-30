import { createI18n } from 'vue-i18n'
import messages from "./locales";
import { getCookie, setCookie } from "@/utils/auth";

const defaultLanguage = "zh-cn";
const i18n = createI18n({
  // 默认语言
  locale: getDefaultLanguage(),
  legacy: false,
  fallbackLocale: defaultLanguage, // 如果在message中找不到对应的key，就回退到这个语言
  messages,
  globalInjection: true, // 全局注册$t方法
})
export default i18n
export const t = i18n.global.t;
export const locale = i18n.global.locale;

function getDefaultLanguage(){
  const locales = Object.keys(messages);
  // 1. 优先从 cookies 中取得语言
  const chosenLanguage = getCookie("lang") ;
  if (chosenLanguage && locales.includes(chosenLanguage)) return chosenLanguage;

  // 2. 其次从浏览器中取得默认语言
  const browserLanguage = navigator.language.toLowerCase();
  if (locales.includes(browserLanguage)) return browserLanguage;

  // 3. 最后默认语言
  return defaultLanguage;
}

export function setLocale(locale) {
  i18n.global.locale.value = locale;
  setCookie("lang", locale);
}
