const readline = require('readline');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

// rl.question('What do you think of Node.js? ', (answer) => {
// 	// TODO: Log the answer in a database
// 	console.log(`Thank you for your valuable feedback: ${answer}`);

// 	rl.close();
// });

export function ask(first, second) {

	return new Promise(resolve => {

		rl.question(`Qual é melhor?
y: ${first}
n: ${second}\nResp: `, answer => {

				resolve(answer === 'y');
			});
	});
}