import { Pool } from "pg";

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	// Comment out ssl when testing locally
	ssl: {
		rejectUnauthorized: false
	}
});

pool.on("error", (err) => {
	console.error(err);
	process.exit(-1);
});

const db = {
	query: async (text, params) => {
		const { rows: res } = await pool.query(text, params);
		return res;
	},
	getClient: async () => {
		const client = await pool.connect()
		const query = client.query
		const release = client.release
		// set a timeout of 5 seconds, after which we will log this client's last query
		const timeout = setTimeout(() => {
			console.error('A client has been checked out for more than 5 seconds!')
			console.error(`The last executed query on this client was: ${client.lastQuery}`)
		}, 5000)
		// monkey patch the query method to keep track of the last query executed
		client.query = (...args) => {
			client.lastQuery = args
			return query.apply(client, args)
		}
		client.release = () => {
			// clear our timeout
			clearTimeout(timeout)
			// set the methods back to their old un-monkey-patched version
			client.query = query
			client.release = release
			return release.apply(client)
		}
		return client
	}
};

export default db;
