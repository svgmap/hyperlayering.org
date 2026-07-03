/* i18n strings for UI elements */

export const languages = {
	en: "English",
	ja: "日本語",
};

export const defaultLang = "en";

export const ui = {
	en: {
		header: {
			nav: {
				"nav.home": "Home",
				demos: "Demos",
				blog: "Blog",
			},
		},
	},
	ja: {
		header: {
			nav: {
				home: "ホーム",
				demos: "デモ",
				blog: "ブログ",
			},
		},
	},
} as const;
