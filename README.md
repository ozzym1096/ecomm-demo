# ecomm-demo
This demo app includes the front end and back end for an e-commerce store.
It's being built from scratch, so there are lots of opportunities for beginners to practice their coding skills!

## Built with:
* [Svelte](https://svelte.dev)
* [Sapper](https://sapper.svelte.dev)
* [PostgreSQL](https://postgresql.org)

## Set up locally:

1. Create a [Cloudinary](https://cloudinary.com) account
	* The app uses Cloudinary to host all of the product images. There is a free tier that should be flexible enough to host a small amount of images and for fetching the images during development.
2. In your Cloudinary media library, create the folder structure `ecomm-demo/products` and upload photos to the `products` folder
	* You can look for photos in the websites listed in the GitHub repos [creative-commons-media](https://github.com/shime/creative-commons-media/blob/master/README.md#graphics) and [awesome-stock-resources](https://github.com/neutraltone/awesome-stock-resources/blob/master/README.md#photography)
3. Install PostgreSQL; Installers are located at https://www.postgresql.org/download/
4. Using the command-line, create a new database using the syntax `createdb name`
5. Create a .env file with the variable names that are present in .env.example file and fill with your custom values
	* Make sure to percent-encode any special characters for DATABASE_URL
6. In `src/utils/db/index.js`, comment out the ssl property of the Pool constructor
	* The ssl property is only needed in production in order to connect to a Heroku database
7. `npm install`
8. `npm run dbSetup`
9. `npm run dev`
10. Code!

## Contributing
Go to [CONTRIBUING.md](CONTRIBUTING.md)
