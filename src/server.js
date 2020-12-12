import express from 'express';
import compression from 'compression';
import * as sapper from '@sapper/server';

const { PORT, CLOUDINARY_NAME } = process.env;
const app = express();

app.use(
	compression({ threshold: 0 }),
	express.static('static')
);

app.use(
	sapper.middleware({
		session: (req, res) => ({
			CLOUDINARY_NAME
		})
	})
);

app.listen(PORT, (err) => {
	if (err) console.log("error", err);
});
