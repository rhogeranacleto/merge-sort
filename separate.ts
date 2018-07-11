import { save } from "./write";

const list = require('./otro.json');

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

save(separate(list)).then(() => console.log('salvou'));