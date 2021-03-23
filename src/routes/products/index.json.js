import db from "../../utils/db";

export async function get(req, res, next) {
	try {
		let params = [];
		let joinClauses = [];

		if (req.query.department) {
			params.push(req.query.department);
			joinClauses.push(`
			inner join (select department_id, department_name from department where department_name=$${params.length}) d on p.department_id=d.department_id`)
		}
		if (req.query.materials) {
			params.push(req.query.materials.split(','));
			joinClauses.push(`
			inner join (
				select p_m.product_id, m_temp.material_name
				from material m_temp
				inner join product_material p_m on m_temp.material_id=p_m.material_id
				where m_temp.material_name = any ($${params.length})
			) m on p.product_id=m.product_id`)
		}

		const queryText =
			`select
				p.product_id "id",
				p.product_name "name",
				p.price_usd "priceUsd",
				p.image_name "imageName"${req.query.department ? `,
				d.department_name "department"` : ''}${req.query.materials ? `,
				array_agg(m.material_name) "materials"` : ''}
			from product p${joinClauses.length > 0 ? joinClauses.join('\r') : ''}
			group by
				p.product_id${req.query.department ? `,
				d.department_name` : ''}`;

		let rows = JSON.stringify(await db.query(queryText, params));

		res.writeHead(200, { "Content-Type": "application/json", "content-length": Buffer.byteLength(rows) });
		res.end(rows);
	}
	catch (err) {
		next(err);
	}
}