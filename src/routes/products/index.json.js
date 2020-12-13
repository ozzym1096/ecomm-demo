import db from "../../utils/db";

export async function get(req, res, next) {
	try {
		const { rows } = await db.query("select * from products");
		res.setHeader("Content-Type", "application/json");
		res.json(rows);
	}
	catch (err) {
		next(err);
	}
}
