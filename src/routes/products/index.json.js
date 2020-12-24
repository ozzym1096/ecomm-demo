import db from "../../utils/db";

export async function get(_req, res, next) {
	try {
		const { rows } = await db.query("select name, price, image, id from products");
		res.writeHead(200, { "Content-Type": "application/json" });
		res.end(JSON.stringify(rows));
	}
	catch (err) {
		next(err);
	}
}