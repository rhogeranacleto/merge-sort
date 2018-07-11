let unsaved = 0;
let $Q;
let carai;

declare var axios: any;
declare var $: any;

$('#first').on('click', function () {

	if ($Q) {

		$Q.resolve('1');
	}
});

$('#second').on('click', function () {

	if ($Q) {

		$Q.resolve('0');
	}
});

function set(first, second) {

	$('#first')
		.find('img').attr('src', first.album).end()
		.find('h1').text(first.title).end()
		.find('h2').text(first.artist);

	$('#second')
		.find('img').attr('src', second.album).end()
		.find('h1').text(second.title).end()
		.find('h2').text(second.artist);

	$('#content').removeClass('loading');
}

function ask(first, second) {

	var res, rej;

	var promise = new Promise((resolve, reject) => {

		res = resolve;
		rej = reject;

		set(first, second)
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

	const is = await ask(first, second);

	$('#content').addClass('loading');

	console.log('resolveu', is);
	if (is === '1') {

		final.push(first);
		oto[0].shift();
	} else if (is === '0') {

		final.push(second);
		oto[1].shift();
	}

	console.log(`\n${++unsaved} não salvos.`);
	$('#info').text(`${++unsaved} não salvos.`);
	return compare(final, oto);
}

async function merge(initial) {

	const oto: any[] = [];

	if (initial.length > 2) {

		return initial;
	}

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

	await axios.post('http://localhost:5000/arquivo', carai);

	$('#info').text('Salvo!');
	unsaved = 0;

	return res;
}

axios.get('http://localhost:5000/arquivo').then(file => {

	carai = file.data;

	return merge(carai)
}).then(jj => {

	console.log(jj, carai);
});