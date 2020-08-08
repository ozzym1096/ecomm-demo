export function toUrlSegment(title) {
	return title.toLowerCase().replace(/\s/g, "-");
}