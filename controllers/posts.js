// controllers/posts.js
const Post = require("../models/post");
const {check, validationResult } = require('express-validator/check');

module.exports = router => {
    // ROOT ROUTE
    router.get('/', (req, res) => {
        var currentUser = req.user;

        Post.find({})
        .then(posts => {
            res.render("posts-index", { posts, currentUser });
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
    router.post('/posts/new', (req,res) => {
         if (req.user) {
             // INSTANTIATE INSTANCE OF POST MODEL
             const post = new Post(req.body);

             // SAVE INSTANCE OF POST MODEL TO DB
             post.save(function(err, post) {
                 // REDIRECT TO THE ROOT
                 return res.redirect('/');
             });
         } else {
             return res.status(401); // UNAUTHORIZED
         }
    });

    // SHOW
    router.get('/posts/:id', function(req, res) {
        // LOOK UP THE POST
        Post.findById(req.params.id).populate('comments')
        .then((post) => {
            res.render("posts-show", { post });
        })
        .catch(err => {
            console.log(err.message);
        });
    });

    // SUBREDDIT
    router.get("/n/:subreddit", function(req, res) {
        Post.find({ subreddit: req.params.subreddit })
            .then(posts => {
                res.render("posts-index", { posts });
            })
            .catch(err => {
                console.log(err);
            });
    });
};
