import {Pool} from 'pg';
const pool = new Pool();

pool.on('error', (err) => {
	console.error(err);
	process.exit(-1);
});

const db = {
	query: function (text, params) {
		return pool.query(text, params);
	}
};

export default db;
