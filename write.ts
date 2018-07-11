import { writeFile } from 'fs';

export function save(data: any[]) {

	return new Promise((resolve, reject) => {

		writeFile('./resultes.json', JSON.stringify(data), {
			encoding: 'utf-8'
		}, err => {

			if (err) {

				return reject(err);
			}

			return resolve();
		});
	});
}