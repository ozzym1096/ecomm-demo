import db from "../../utils/db";

export async function get(req, res, next) {
	try {
		const { rows } = await db.query("select * from products where id = $1", [req.params.productId]);
		if (rows.length > 0) {
			res.writeHead(200, { "Content-Type": "application/json" });
			res.end(JSON.stringify(rows[0]));
		} else {
			res.writeHead(404, { "Content-Type": "application/json" });
			res.end(JSON.stringify({
				"message": "Item not found"
			}))
		}
	}
	catch (err) {
		next(err);
	}
}