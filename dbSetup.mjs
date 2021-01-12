import axios from "axios";
import defaultCloudinary from "cloudinary";
import pg from "pg";

const { v2: cloudinary } = defaultCloudinary;

cloudinary.config({
	"cloud_name": process.env.CLOUDINARY_NAME,
	"api_key": process.env.CLOUDINARY_API_KEY,
	"api_secret": process.env.CLOUDINARY_API_SECRET
});

const client = new pg.Client({
	connectionString: process.env.DATABASE_URL
});

; (async () => {
	try {
		const { resources: imagesData } = await cloudinary.search.expression("folder=ecomm-demo\/products").execute();
		const imageNames = [].concat(imagesData).map(l => l.filename);

		const { data: products } = await axios.post(
			"https://micro-jaymock.now.sh/",
			{
				"id": "random.uuid",
				"name": "commerce.productName",
				"department": "commerce.department",
				"price": "commerce.price",
				"adjectives": "commerce.productAdjective|3",
				"materials": "commerce.productMaterial|2",
				"description": "lorem.paragraph",
				"_repeat": imageNames.length
			}
		);
		products.forEach((product, i) => {
			product.price = parseInt(product.price, 10);
			product.image = imageNames[i % imageNames.length]
		});

		await client.connect();
		await client.query("create table products (" +
			"id uuid primary key," +
			"name text not null," +
			"department text not null," +
			"price integer not null," +
			"adjectives text[]," +
			"materials text[]," +
			"description text not null," +
			"image text not null)");
		await client.query({
			text: "insert into products (select * from json_populate_recordset(null::products, $1))",
			values: [JSON.stringify(products)]
		});
		console.log("Data was inserted into table 'products'");
	}
	catch (err) {
		console.error(err);
	}
	finally {
		await client.end();
	}
})();