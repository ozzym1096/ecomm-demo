import fs from "fs-extra";
import path from "path";
import cloudinaryLib from "cloudinary";
import pg from "pg";
import faker from "faker";

const { v2: cloudinary } = cloudinaryLib;

cloudinary.config({
	"cloud_name": process.env.CLOUDINARY_NAME,
	"api_key": process.env.CLOUDINARY_API_KEY,
	"api_secret": process.env.CLOUDINARY_API_SECRET
});

const client = new pg.Client({
	connectionString: process.env.DATABASE_URL
});

async function createTables() {
	const sqlFileString = await fs.readFile(path.resolve("ecomm_demo.sql"), 'utf8');

	// Create Tables
	console.log("Tables are being created in database %s...", client.database);
	await client.query(sqlFileString);
	console.log("Tables were created!");
}

function createSetOfRandomLength(maxItems, fakerFunction) {
	let res = new Set();

	for (let i = 1; i <= Math.ceil(Math.random() * maxItems); i++) {
		const itemToAdd = fakerFunction();

		if (res.has(itemToAdd)) {
			i--;
			continue;
		} else {
			res.add(itemToAdd);
		}
	}

	return res;
}

function addProductsToDb(products, fn) {
	return products.reduce(
		async function (promise, product) {
			await promise;
			return fn(product);
		},
		Promise.resolve()
	);
}

async function addToDatabase(product) {
	let materialsIds = [];

	try {
		await client.query('begin');
		const { rows: { 0: { _department_id: departmentId } } } = await client.query(
			`select * from return_department_id($1)`,
			[product.department]
		);
		const { rows: { 0: { _brand_id: brandId } } } = await client.query(
			`select * from return_brand_id($1)`,
			[product.brand]
		);
		for (const material of product.materials) {
			let { rows: { 0: { _material_id } } } = await client.query(
				`select * from return_material_id($1)`,
				[material]
			)
			materialsIds.push(_material_id);
		}
		const { rows: { 0: { product_id: productId } } } = await client.query(
			`insert into product(product_name, department_id, price_usd, product_description, brand_id, rating, image_name)
			values($1, $2, $3, $4, $5, $6, $7)
			returning product_id`,
			[
				product.name,
				departmentId,
				product.priceUSD,
				product.description,
				brandId,
				product.rating,
				product.imageName
			]
		);
		await client.query(
			`with ins as (
				select p.product_id, m.material_id
				from (values($1::integer)) p(product_id)
				cross join unnest($2::integer[]) m(material_id)
			)
			insert into product_material(product_id, material_id)
			select * from ins`,
			[productId, materialsIds]
		)
		await client.query('commit');
		return Promise.resolve();
	}
	catch (err) {
		await client.query('rollback');
		throw err;
	}
}

; (async () => {
	await client.connect();

	try {
		await createTables();

		let { resources: imagesNames } = await cloudinary
			.search
			.expression("folder=ecomm-demo\/products")
			.execute();
		imagesNames = imagesNames.map(i => i.filename);

		const products = Array.from({ length: imagesNames.length }, (_, i) => {
			return {
				"name": faker.commerce.productName(),
				"department": faker.commerce.department(),
				"priceUSD": parseInt(faker.commerce.price(10, 999), 10),
				"description": faker.lorem.paragraph(),
				"materials": [...createSetOfRandomLength(3, faker.commerce.productMaterial)],
				"brand": faker.company.companyName(),
				"rating": faker.random.number({ min: 1, max: 5 }),
				"imageName": imagesNames[i % imagesNames.length]
			}
		});

		// Insert mock data into database
		console.log("Data is being inserted into database %s...", client.database);
		await addProductsToDb(products, addToDatabase);
		console.log("Data was added to database!");
	}
	catch (err) {
		console.error(err);
	}
	finally {
		await client.end();
	}
})();