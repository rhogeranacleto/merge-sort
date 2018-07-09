import { ask } from "./read";
import { separate } from "./separate";

async function compare(final, oto) {

	if (oto[0].length === 0) {

		return Promise.resolve(final.concat(oto[1]));
	}

	if (oto[1].length === 0) {

		return Promise.resolve(final.concat(oto[0]));
	}

	const first = oto[0][0];
	const second = oto[1][0];

	const is = await ask(first, second)

	if (is) {

		final.push(first);
		oto[0].shift();
	} else {

		final.push(second);
		oto[1].shift();
	}

	return compare(final, oto);
}

async function merge(initial) {

	const oto: any[] = [];

	for (let i = 0; i < initial.length; i++) {

		const item = initial[i];

		if (Array.isArray(item)) {

			const r = await merge(item);

			oto.push(r);
		} else {

			oto.push([item]);
		}
	}

	return compare([], oto);
}

merge(separate([4, 52, 345, 5, 23, 0, 6, 3, 87, 10])).then(r => {

	console.log(r);
});