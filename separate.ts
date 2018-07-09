const musics = [4, 23, 52, 345, 4, 5, 345, 23, 0, 6, 3, 87, 10];

export function separate(items) {

	if (items.length === 1) {

		return items[0];
	}

	const maria = [
		separate(items.slice(0, items.length / 2)),
		separate(items.slice(items.length / 2, items.length))
	];

	return maria;
}

// console.log(JSON.stringify(separate(musics)));