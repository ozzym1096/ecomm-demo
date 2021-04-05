drop table if exists "product_material";
drop table if exists "product";
drop table if exists "department";
drop table if exists "material";
drop table if exists "brand";
drop type if exists "product_rating";

CREATE TYPE "product_rating" AS ENUM (
  '1',
  '2',
  '3',
  '4',
  '5'
);

CREATE TABLE "product" (
  "product_id" SERIAL PRIMARY KEY,
  "product_name" varchar NOT NULL,
  "department_id" int NOT NULL,
  "price_usd" int NOT NULL,
  "product_description" text,
  "image_name" varchar,
  "brand_id" int NOT NULL,
  "rating" product_rating DEFAULT null
);

CREATE TABLE "department" (
  "department_id" SERIAL PRIMARY KEY,
  "department_name" varchar UNIQUE NOT NULL
);

CREATE TABLE "material" (
  "material_id" SERIAL PRIMARY KEY,
  "material_name" varchar UNIQUE NOT NULL
);

CREATE TABLE "brand" (
  "brand_id" SERIAL PRIMARY KEY,
  "brand_name" varchar UNIQUE NOT NULL
);

CREATE TABLE "product_material" (
  "product_id" int,
  "material_id" int,
  PRIMARY KEY ("product_id", "material_id")
);

ALTER TABLE "product" ADD FOREIGN KEY ("department_id") REFERENCES "department" ("department_id");

ALTER TABLE "product" ADD FOREIGN KEY ("brand_id") REFERENCES "brand" ("brand_id");

ALTER TABLE "product_material" ADD FOREIGN KEY ("product_id") REFERENCES "product" ("product_id");

ALTER TABLE "product_material" ADD FOREIGN KEY ("material_id") REFERENCES "material" ("material_id");


COMMENT ON TABLE "product" IS 'If department=clothing, product should have sizes';

/* Stored functions will be useful if admin API is ever implemented */
CREATE OR REPLACE FUNCTION return_department_id(_name text, OUT _department_id int)
AS
$func$
BEGIN
LOOP
	SELECT department_id
	FROM   department
	WHERE  department_name = _name
	INTO   _department_id;

	EXIT WHEN FOUND;

	INSERT INTO department AS d (department_name)
	VALUES (_name)
	ON     CONFLICT (department_name) DO NOTHING
	RETURNING d.department_id
	INTO   _department_id;

	EXIT WHEN FOUND;
END LOOP;
END
$func$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION return_brand_id(_name text, OUT _brand_id int)
AS
$func$
BEGIN
LOOP
	SELECT brand_id
	FROM   brand
	WHERE  brand_name = _name
	INTO   _brand_id;

	EXIT WHEN FOUND;

	INSERT INTO brand AS b (brand_name)
	VALUES (_name)
	ON     CONFLICT (brand_name) DO NOTHING
	RETURNING b.brand_id
	INTO   _brand_id;

	EXIT WHEN FOUND;
END LOOP;
END
$func$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION return_material_id(_name text, OUT _material_id int)
AS
$func$
BEGIN
LOOP
	SELECT material_id
	FROM   material
	WHERE  material_name = _name
	INTO   _material_id;

	EXIT WHEN FOUND;

	INSERT INTO material AS m (material_name)
	VALUES (_name)
	ON     CONFLICT (material_name) DO NOTHING
	RETURNING m.material_id
	INTO   _material_id;

	EXIT WHEN FOUND;
END LOOP;
END
$func$ LANGUAGE plpgsql;