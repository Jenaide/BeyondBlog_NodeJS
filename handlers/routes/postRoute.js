const express = require('express');
const router = express.Router();
const Posts = require('../models/postModel');


/* GET homepage with pagination */
router.get('/', async (req, res) => {
    
    try {
        const locals = {
        title: "BeyondBlogs",
        desc: "a simple NodeJS blog app"
    }
    let perPage = 5 // number of pages to show
    let page = req.query.page || 1 // set the default page number for the current page

    const data = await Posts.aggregate([ { $sort: { createdAt: -1 } } ])// sort the results by created date
    .skip(perPage * page - perPage)
    .limit(perPage) // limit the results to 10 entries
    .exec();

    const count = await Posts.count();
    const nextPage = parseInt(page) + 1;//converts the next page number to an integer
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    res.render('pages/index', { 
        locals, 
        data,
        current: page,
        nextPage: hasNextPage ? nextPage : null,
        currentRoute: '/'
     });
    } catch (err) {
        console.error(err);
    }
});

/* GET POSTS:id */
router.get('/post/:id', async (req, res) => {
    try {
        let slug = req.params.id;

        const data = await Posts.findById({ _id: slug });

        const locals = {
            title: "BeyondBlogs",
            desc: "a simple NodeJS blog app",
            
        }

        res.render('pages/post', { 
            locals, 
            data, 
            currentRoute: `/post/${slug}`
        });
    } catch (err) {
        console.error(err);
    }

});

/* POST / searchTerm */
router.post('/search', async (req, res) => {
    try {
        const locals = {
        title: "BeyondBlogs",
        desc: "a simple NodeJS blog app"
        }
        let searchTerm = req.body.searchTerm;
        const searchNoSpecialChar = searchTerm.replace(/[ ^a-zA-Z0-9 ]/g, "")
        const data = await Posts.find({
            $or: [
                { title: { $regex: new RegExp(searchNoSpecialChar, 'i') }},
                { body: { $regex: new RegExp(searchNoSpecialChar, 'i') }}
            ]
        })
        res.render('pages/search', { locals, data, currentRoute: '/search' });
    } catch (err) {
        console.error(err);
    }
});



module.exports = router;