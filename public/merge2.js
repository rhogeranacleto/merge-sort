const carai = [[12, 3], [4, 1]];

function defer(fn) {
	
	var res, rej;

	var promise = new Promise((resolve, reject) => {

		res = resolve;
		rej = reject;

		fn();
	});

	promise.resolve = res;
	promise.reject = rej;

	return promise;
}

// function go(parent) {

// 	const childArray = parent.find(child => Array.isArray(child) && child.some(childOfChild => Array.isArray(childOfChild)));

// 	if (childArray) {

// 		return go(childArray);
// 	}

// 	choice(parent);
// }

// function choice(parent) {
	

// }