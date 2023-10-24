# Blog Platform

This is a simple blog platform built with Node.js and EJS (Embedded JavaScript) that allows you to create and manage blog posts. It provides features for user registration, authentication, and the ability to create, view, and edit blog posts.

## Installation

Before getting started, make sure you have [Node.js](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/try/download/community) installed on your system.

1. Clone this repository to your local machine:

```bash
git clone https://github.com/Jenaide/BeyondBlog_NodeJS.git
```

2. Navigate to the project directory:

```bash
cd BeyondBlog_NodeJS
```

3. Install the project dependencies:

```bash
npm install
```

4. Create a `.env` file in the root directory of the project and set your environment variables. You can use the provided `.env.example` file as a template.

5. Start the application:

```bash
npm start
```

You can also run the application in development mode with automatic server restart using `nodemon`:

```bash
npm run dev
```

## Dependencies

- [bcrypt](https://www.npmjs.com/package/bcrypt): Library for hashing and comparing passwords.
- [connect-mongo](https://www.npmjs.com/package/connect-mongo): Middleware for storing Express sessions in MongoDB.
- [cookie-parser](https://www.npmjs.com/package/cookie-parser): Middleware for parsing cookies.
- [dotenv](https://www.npmjs.com/package/dotenv): Module for loading environment variables from a .env file.
- [ejs](https://www.npmjs.com/package/ejs): Templating engine for rendering views.
- [express](https://www.npmjs.com/package/express): Web application framework for Node.js.
- [express-ejs-layouts](https://www.npmjs.com/package/express-ejs-layouts): Middleware for creating and using layouts with EJS.
- [express-session](https://www.npmjs.com/package/express-session): Middleware for handling sessions in Express.
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): Library for creating and verifying JSON Web Tokens (JWT).
- [method-override](https://www.npmjs.com/package/method-override): Middleware for supporting HTTP methods like PUT and DELETE in forms.
- [mongodb](https://www.npmjs.com/package/mongodb): MongoDB driver for Node.js.
- [mongoose](https://www.npmjs.com/package/mongoose): ODM (Object Data Modeling) library for MongoDB.

## Development Dependencies

- [nodemon](https://www.npmjs.com/package/nodemon): Utility that monitors for changes in your source code and automatically restarts the server.

## Usage

Visit `http://localhost:5000` in your web browser to access the blog platform. You can create an account, log in, and start managing your blog posts.

## License

This project is licensed under the MIT License. Feel free to use and modify it for your own purposes.

If you encounter any issues or have questions, please open an [issue](https://github.com/yourusername/blog-platform/issues) on the GitHub repository. Enjoy your blogging!