let unsaved = 0;
let $Q;
let carai;

declare var axios: any;

document.getElementById('first')!.addEventListener('click', function () {

	if ($Q) {

		$Q.resolve('1');
	}
});

document.getElementById('second')!.addEventListener('click', function () {

	if ($Q) {

		$Q.resolve('0');
	}
});

function ask() {

	var res, rej;

	var promise = new Promise((resolve, reject) => {

		res = resolve;
		rej = reject;
	});

	(promise as any).resolve = res;
	(promise as any).reject = rej;

	$Q = promise;

	return promise;
}

async function compare(final, oto) {

	if (oto[0].length === 0) {

		return Promise.resolve(final.concat(oto[1]));
	}

	if (oto[1].length === 0) {

		return Promise.resolve(final.concat(oto[0]));
	}

	const first = oto[0][0];
	const second = oto[1][0];

	const is = await ask();

	console.log('resolveu', is);
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

	// await save(carai);

	console.log('\nCheckpoint!\n');
	unsaved = 0;

	return res;
}

axios.get('http://localhost:5000/arquivo').then(file => {

	carai = file.data;

	merge(carai)
}).then(jj => {

	console.log(jj, carai);
});