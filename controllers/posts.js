// controllers/posts.js
const Post = require("../models/post");
const {check, validationResult } = require('express-validator/check');

module.exports = router => {
    // ROOT ROUTE
    router.get('/', (req, res) => {
        Post.find({})
        .then(posts => {
            res.render("posts-index", { posts });
        })
        .catch(err => {
            console.log(err.message);
        })
    });

    // NEW
    router.get('/posts/new', (req, res) => {
        res.render('posts-new.hbs');
    })

    // CREATE
    router.post('/posts/new', [
        // title must be at least 5 chars long
        check('title').isLength({ min: 5}),
        // summary must be at least 10 chars long
        check('summary').isLength({ min: 5 })
    ], (req,res) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        // CHECK DATA
        console.log(req.body)
        // INSTANTIATE INSTANCE OF POST MODEL
        const post = new Post(req.body)
        // console.log(req.body);
        // SAVE INSTANCE OF POST MODEL TO DB
        post.save((err, post) => {
            // REDIRECT TO THE ROOT
            return res.redirect('/');
        // })
        })
    });

    // SHOW
    router.get('/posts/:id', function(req, res) {
        // LOOK UP THE POST
        Post.findById(req.params.id)
        .then(post => {
            res.render("posts-show", { post });
        })
        .catch(err => {
            console.log(err.message);
        });
    });
};
