export function frequency(arr: number[], num: number): number {
	let f = 0;

	for (const element of arr) {
		if (element === num) f++;
	}

	return f;
}

export function scroll_to_bottom() {
	window.scrollTo(0, document.body.scrollHeight);
}
