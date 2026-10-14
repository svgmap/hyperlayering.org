export function tocHeadersToMap(
	tocHeadersArray: TocItem[],
): Map<string, TocItem> | undefined {
	if (!tocHeadersArray.length || tocHeadersArray.length === 0) return undefined;
	const tocMap =
		new Map(
			tocHeadersArray.map((tocHeader) => {
				return [tocHeader.slug, tocHeader];
			}),
		) ?? undefined;
	return tocMap;
}
