import { ask } from "./read";
import { separate } from "./separate";
import { save } from "./write";

const carai = require('./result.json');
let unsaved = 0;

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
	
	if (is === '1') {
		
		final.push(first);
		oto[0].shift();
	} else if (is === '0') {
		
		final.push(second);
		oto[1].shift();
	}
	
	console.log(`\n${++unsaved} não salvos.`);
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

	const res = await compare([], oto);

	initial.splice(0, initial.length);

	res.forEach(r => initial.push(r));

	await save(carai);

	console.log('\nCheckpoint!\n');
	unsaved = 0;

	return res;
}

merge(carai).then(r => {

	console.log(r);
});