const fileSize = (bytes: number): { value: number, unit: string } => {
	const thresh = 1024;

	if (Math.abs(bytes) < thresh) {
		return { value: bytes, unit: 'byte' };
	}

	const units = ['kilobyte', 'megabyte', 'gigabyte', 'terrabyte'];
	let u = -1;
	const r = 10 ** 1;

	do {
		bytes /= thresh;
		++u;
	} while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);


	return { value: bytes, unit: units[u] }
}

export default fileSize;