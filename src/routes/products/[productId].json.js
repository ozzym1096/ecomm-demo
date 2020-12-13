import db from "../../utils/db";

export async function get(req, res, next) {
	try {
		const { rows } = await db.query("select * from products where id = $1", [req.params.productId]);
		res.setHeader("Content-Type", "application/json");
		res.json(rows[0]);
	}
	catch (err) {
		next(err);
	}
}