/* i18n strings for UI elements */

export const languages = {
	en: "English",
	ja: "日本語",
};

export const defaultLang = "en";

export const ui = {
	en: {
		"nav.home": "Home",
		"nav.demos": "Demos",
		"nav.blog": "Blog",
		"nav.lang-btn.label": "Change Language",
		"nav.github.message": "Explore the project on GitHub",
		"page.home.title": "Hyper Layering",
		"page.home.tagline": "Client-centric, de-centralized web mapping",
		"page.home.get-started-btn": "Get Started",
		"page.home.about-btn": "About the project",
		"page.blog.title": "Blog",
		"page.demos.title": "Demos",
		"page.404.title": "404",
		"page.404.subtitle": "This page could not found",
		"page.404.return-btn": "Return to home",
	},
	ja: {
		"nav.lang-btn.label": "言語を変更する",
		"nav.github.message": "GitHubでこのプロジェクトを詳しく見る",
		"page.home.tagline": "クライアント中心の分散型ウェブマッピング",
		"page.home.get-started-btn": "はじめに",
		"page.home.about-btn": "プロジェクトについて",
		"page.404.subtitle": "このページは見つかりませんでした",
		"page.404.return-btn": "ホームに戻る",
	},
} as const;
