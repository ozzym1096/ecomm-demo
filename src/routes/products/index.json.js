import db from "../../utils/db";

export async function get(req, res, next) {
	try {
		const params = [];
		const whereClauses = [];
		if (req.query.department) {
			params.push(req.query.department);
			whereClauses.push(`department = $${params.length}`);
		}
		if (req.query.materials) {
			params.push(req.query.materials.split(','));
			whereClauses.push(`materials && $${params.length}`);
		}

		const sql = `select name, price, image, id from products ${whereClauses.length === 0
			? ''
			: 'where ' + whereClauses.join(' and ')}
		`;

		const { rows } = await db.query(sql, params);
		res.writeHead(200, { "Content-Type": "application/json" });
		res.end(JSON.stringify(rows));
	}
	catch (err) {
		next(err);
	}
}