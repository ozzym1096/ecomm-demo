# Steps to set up project locally:

1. Create a [Cloudinary](https://cloudinary.com) account
	1. The app uses Cloudinary to host all of the product images. There is a free tier that should be flexible enough to host a small amount of images and for fetching the images during development.
2. Add some photos to your Cloudinary account
	1. You can check out some of the websites listed in the GitHub repos [creative-commons-media](https://github.com/shime/creative-commons-media/blob/master/README.md#graphics) and [awesome-stock-resources](https://github.com/neutraltone/awesome-stock-resources/blob/master/README.md#photography) for photos
3. Install PostgreSQL if it isn't already installed on your local machine; Installers are located at https://www.postgresql.org/download/
4. Create a database using the syntax `createdb name`
5. Create a .env file using the variable names that are in .env.example and add the values
	1. Make sure to percent-encode any special characters for the DATABASE_URI
6. `npm run install`
7. `npm run dbSetup`
8. `npm run dev`
9. Code!