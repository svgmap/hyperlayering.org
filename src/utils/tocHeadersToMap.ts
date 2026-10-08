export function tocHeadersToMap(
	tocHeadersArray: TocItem[],
): Map<string, TocItem> | undefined {
	if (!tocHeadersArray.length) return undefined;
	const tocMap =
		new Map(
			tocHeadersArray.map((tocHeader) => {
				return [tocHeader.slug, tocHeader];
			}),
		) ?? undefined;
	return tocMap;
}
