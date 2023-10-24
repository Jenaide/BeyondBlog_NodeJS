require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const cookieParser = require('cookie-parser'); // store all session cookies
const MongoStore = require('connect-mongo');
const methodOverRide = require('method-override');
const session = require('express-session');

const app = express();

const connectDB = require('./handlers/config/db');
const { isActiveRoute } = require('./handlers/helpers/routeHelper');

// connect to the database
connectDB();

app.use(express.urlencoded({ extended : true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverRide('_method'));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL
  }),
  cookie: { maxAge: 3600000 }
}));

const PORT = 5000 || process.env.PORT;

// template engine
app.use(expressLayout)
app.set('view engine', "ejs");
app.set('layout', './layouts/main');
app.use(express.static(path.join(__dirname, 'public')));

// global variables
app.locals.isActiveRoute = isActiveRoute;

// main routes
app.use('/', require('./handlers/routes/postRoute'));
app.use('/', require('./handlers/routes/userRoute'));

// ROutes
// about route
app.get('/about', (req, res) => {
  res.render('pages/about', { currentRoute: '/about' });
});

// contact route
app.get('/contact', (req, res) => {
  res.render('pages/contact', { currentRoute: '/contact' });
});

// server connection
app.listen(PORT, () => {
  console.log(`The server is listening on ${PORT}`)
});