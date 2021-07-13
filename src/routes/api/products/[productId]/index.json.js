import db from "../../../../utils/db";

export async function get(req, res, next) {
	try {
		let queryRes = await db.query(
			`
		select
			p.product_id "id",
			p.product_name "name",
			p.price_usd "priceUsd",
			p.product_description "description",
			p.image_name "imageName",
			p.rating,
			d.department_name "department",
			b.brand_name "brand",
			array_agg(m.material_name) "materials"
		from product p
		inner join department d on p.department_id=d.department_id
		inner join brand b on p.brand_id=b.brand_id
		cross join (
			select m.material_name
			from product_material p_m
			inner join product p on p_m.product_id=p.product_id
			inner join material m on p_m.material_id=m.material_id
			where p.product_id=$1
		) m
		where product_id=$1
		group by
			p.product_id,
			d.department_name,
			b.brand_name`,
			[req.params.productId]
		);
		if (queryRes.length > 0) {
			queryRes = JSON.stringify(queryRes[0]);
			res.writeHead(200, {
				"Content-Type": "application/json",
				"content-length": Buffer.byteLength(queryRes),
			});
			res.end(queryRes);
		} else {
			throw new Error("Item not found");
		}
	} catch (err) {
		next(err);
	}
}
