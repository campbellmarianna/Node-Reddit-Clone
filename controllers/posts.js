// controllers/posts.js
const Post = require("../models/post");

module.exports = router => {
    // ROOT ROUTE
    router.get('/', (req, res) => {
        res.render('home');
    })

    // NEW
    router.get('/posts/new', (req, res) => {
        res.render('posts-new.hbs');
    })

    // CREATE
    router.post('/posts/new', (req,res) => {
        // INSTANTIATE INSTANCE OF POST MODEL
        const post = new Post(req.body);

        // SAVE INSTANCE OF POST MODEL TO DB
        post.save((err, post) => {
            // REDIRECT TO THE ROOT
            return res.redirect('/');
        })
    });
};
