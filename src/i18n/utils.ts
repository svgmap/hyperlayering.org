import { defaultLang, ui } from "./ui";

export function getLangFromUrl(url: URL) {
	const [, lang] = url.pathname.split("/");
	if (lang in ui) return lang as keyof typeof ui;
	return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
	return function t(key: keyof (typeof ui)[typeof defaultLang]) {
		// @ts-expect-error -- intentionally returns default lang if key missing from other lang
		return ui[lang][key] || ui[defaultLang][key];
	};
}

export function pathWithoutLocale(url: URL) {
	const lang = getLangFromUrl(url);
	if(lang === defaultLang) return url.pathname;
	return url.pathname.replace(`/${lang}/`, "/");
}
