import db from "../../utils/db";

export async function get(req, res, next) {
	try {
		const { rows } = await db.query("select * from products");
		res.writeHead(200, { "Content-Type": "application/json" });
		res.end(JSON.stringify(rows));
	}
	catch (err) {
		next(err);
	}
}