import express from 'express';

const otro = require('./resultes.json');

const app = express();

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.use(express.static('public'));

app.get('/arquivo', (req, res) => {

	res.send(otro);
});

app.listen(5000, () => {

	console.log('on');
});