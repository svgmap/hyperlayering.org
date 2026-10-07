import { getCollection } from "astro:content";
import { defaultLang, languages } from "@i18n/ui";
import { parseValidLang } from "@i18n/utils";

export async function getAuthor(authorSlug: string, lang: string) {
    const validatedLang = parseValidLang(lang);
    const authors = await getCollection("authors");
    const selectedAuthor = authors.filter((author) => {
        const [authorFileLang, authorId] = author.id.split("/");
        if (authorId === authorSlug && authorFileLang === validatedLang) return true;
        return false;
    });
    if (selectedAuthor.length !== 1) return null;
    return selectedAuthor[0];
}

export async function getAuthorName(authorSlug: string, lang: string) { }
