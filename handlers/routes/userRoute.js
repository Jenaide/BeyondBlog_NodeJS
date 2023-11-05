const express = require('express');
const router = express.Router();
const Posts = require('../models/postModel');
const User = require('../models/userModel');
const bcrypt = require('bcrypt'); // password hashing and encryption
const jwt = require('jsonwebtoken');// cookie token
//const { isLoggedIn } = require('../config/middleware');
const jwtSecret = process.env.JWT_SECRET;
const userLayout = '../views/layouts/user'

const isLoggedIn = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Unauthorized' });
    }
}

/* GET user - login */
router.get('/login', async (req, res) => {
    try {
        const locals = {
            title: "Admin",
            desc: "a simple NodeJS blog app"
        }
        res.render('user/login', { locals, layout: userLayout });
    } catch (err) {
        console.error(err);
    }
});

/* POST user - check login */
router.post('/login', async (req, res) => {
    try {
        const username = req.body.username;
        console.log('Request received for username:', username);

        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username' });
        }
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        
        const token = jwt.sign({ userId: user.id}, jwtSecret );
        res.cookie('token', token, { httpOnly: true });
        req.session.user = user;
        res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
    }
});

/* GET user - register */
router.get('/signup', async (req, res) => {
    try {
        const locals = {
            title: "Register",
            desc: "a simple NodeJS blog app"
        }

        res.render('user/signup', { locals, layout: userLayout });
    } catch (err) {
        console.error(err);
    }
});

/* POST user - register */
router.post('/signup', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            password: hashedPass,
        });
        newUser.save();
        res.redirect('login');
    } catch (err) {
        res.status(500).json({message: "Internal server error"});
    }
});

/* GET user - dashboard */
router.get('/dashboard', isLoggedIn, async (req, res) => {
    try {
        const locals = {
            title: "Dashboard",
            desc: "a simple NodeJS blog app"
        }
        const data = await Posts.find();
        res.render('pages/dashboard', { locals, data, layout: userLayout });
    } catch (err) {
        console.log(err);
    }
    
});

/* GET  user - Create New post */
router.get('/add-post', isLoggedIn, async (req, res) => {
    try {
        const locals = {
            title: "Add Post",
            desc: "a simple NodeJS blog app"
        }
        const data = await Posts.find();
        res.render('pages/add-post', { locals, layout: userLayout });
    } catch (err) {
        console.log(err);
    }
});

/* POST user - Create New post */
router.post('/add-post', isLoggedIn, async (req, res) => {
    try {
        const newPost = new Posts({ 
            title: req.body.title,
            body: req.body.body
         });

         await Posts.create(newPost);
         res.redirect('/dashboard');
    } catch (err) {
        console.log(err);
    }
});

/* GET user - get edit-post */
router.get('/edit-post/:id', isLoggedIn, async (req, res) => {
    try {
        const locals = {
            title: "Edit Post",
            desc: "a simple NodeJS blog app"
        };
        const data = await Posts.findOne({ _id: req.params.id });

         res.render('pages/edit-post', {
            locals,
            data,
            layout: userLayout,
         })
    } catch (err) {
        console.log(err);
    }
});

/* PUT user - edit post */
router.put('/edit-post/:id', isLoggedIn, async (req, res) => {
    try {
        await Posts.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            body: req.body.body,
            updatedAt: Date.now()
        });
        res.redirect(`/post/${req.params.id}`);
    } catch (err) {
        console.log(err);
    }
});

/* DELETE user - delete post */
router.delete('/delete-post/:id', isLoggedIn, async (req, res) => {
    try {
        await Posts.deleteOne( { _id: req.params.id } );
        res.redirect('/dashboard')
    } catch (err) {
        console.log(err);
    }
});

/* GET user - logout */
router.get('/logout', isLoggedIn, async (req , res) => {
    res.clearCookie('token');// clears the cookie
    res.redirect('/');
});

module.exports = router;