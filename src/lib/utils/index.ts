export function frequency(arr: number[], num: number): number {
	let f = 0;

	for (const element of arr) {
		if (element === num) f++;
	}

	return f;
}
