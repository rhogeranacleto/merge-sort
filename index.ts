import express from 'express';
import bodyParser from 'body-parser';
import { save } from './write';

let otro = require('./resultes.json');

const app = express();

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.use(bodyParser.json())

app.use(express.static('public'));

app.get('/arquivo', (req, res) => {

	res.send(otro);
});

app.post('/arquivo', async (req, res) => {

	await save(req.body);
	console.log('salvo');
	otro = req.body;

	res.send('ok');
});

app.listen(5000, () => {

	console.log('on');
});