import express from 'express';
import compression from 'compression';
import * as sapper from '@sapper/server';

const { PORT } = process.env;
const app = express();

app.use(
	compression({ threshold: 0 }),
	express.static('static')
);

app.use(
	sapper.middleware()
);

app.listen(PORT, (err) => {
	if (err) console.log("error", err);
});
