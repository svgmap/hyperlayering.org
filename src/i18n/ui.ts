/* i18n strings for UI elements */

export const languages = {
	en: "English",
	ja: "日本語",
};

export const defaultLang = "en";

export const ui = {
	en: {
		"nav.home": "Home",
		"nav.tutorials": "Tutorials",
		"nav.demos": "Demos",
		"nav.updates": "Updates",
		"nav.lang-btn.label": "Change Language",
		"nav.mobile-toggle.label.open": "Open Navigation Menu",
		"nav.mobile-toggle.label.close": "Close Navigation Menu",
		"nav.github.message": "Explore the project on GitHub",
		"nav.documentation": "Documentation",
		"nav.documentation.tutorials": "Tutorials",
		"nav.documentation.api": "API Documentation",
		"nav.resources": "Resources",
		"nav.resources.naming-branding": "Naming & Branding Guidelines",
		"nav.resources.brand-guideline": "Brand Guideline",
		"nav.copyright": `&#169; ${new Date().getFullYear()} Hyper Layering Community`,
		"page.home.title": "Hyper Layering",
		"page.home.tagline": "Client-centric, de-centralized web mapping",
		"page.home.get-started-btn": "Get Started",
		"page.home.about-btn": "About the project",
		"page.home.features.title": "Why Hyper Layering?",
		"page.home.features.decentralized.title": "Decentralized",
		"page.home.features.decentralized.body":
			"In HLA, mapping layers are loosely coupled via hyperlinks, functioning as independent web applications.",
		"page.home.features.layering.title": "Layering on Client",
		"page.home.features.layering.body":
			"HLA empowers users to dynamically compose these independent layers directly on their own devices.",
		"page.home.features.open-source.title": "Open Source",
		"page.home.features.open-source.body":
			"HLA is a fully open-source project that is actively maintained and has been used by enterprises for 15+ years.",
		"page.home.demos.title": "See Hyper Layering in action",
		"page.updates.title": "Updates",
		"page.demos.title": "Demos",
		"page.guidelines.last-updated": "Last Updated:",
		"page.404.title": "404",
		"page.404.subtitle": "This page could not found",
		"page.404.return-btn": "Return to home",
	},
	ja: {
		"nav.lang-btn.label": "言語を変更する",
		"nav.mobile-toggle.label.open": "ナビゲーションメニューを開く",
		"nav.mobile-toggle.label.close": "ナビゲーションメニューを閉じる",
		"nav.github.message": "GitHubでこのプロジェクトを詳しく見る",
		"nav.resources.brand-guideline": "ハイパー・レイヤリング ブランドガイドライン",
		"page.home.tagline": "クライアント中心の分散型ウェブマッピング",
		"page.home.get-started-btn": "HLMapをはじめる",
		"page.home.about-btn": "プロジェクトについて",
		"page.home.features.title": "なぜハイパー・レイヤリングなのか？",
		"page.home.features.decentralized.title": "分散型",
		"page.home.features.decentralized.body":
			"HLAでは、マッピングレイヤーはハイパーリンクを介して疎結合されており、独立したWebアプリケーションとして機能します。",
		"page.home.features.layering.title": "クライアント側でのレイヤリング",
		"page.home.features.layering.body":
			"HLAにより、ユーザーは自身のデバイス上で、これらの独立したレイヤーを動的に組み合わせることができるようになります。",
		"page.home.features.open-source.title": "オープンソース",
		"page.home.features.open-source.body":
			"HLAは、積極的にメンテナンスが行われている完全なオープンソースプロジェクトであり、15年以上にわたり企業で利用されてきました。",
		"page.home.demos.title":
			"「ハイパー・レイヤリング」の実際の動作をご覧ください",
		"page.guidelines.last-updated": "最終更新日:",
		"page.404.subtitle": "このページは見つかりませんでした",
		"page.404.return-btn": "ホームに戻る",
	},
} as const;
