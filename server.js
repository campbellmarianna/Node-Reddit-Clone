const express = require('express');
const hbs = require('express-handlebars');
// INITIALIZE BODY-PARSER
const bodyParser = require('body-parser');
// IMPORT Express Validator
const expressValidator = require('express-validator');
// Set db
require('./data/reddit-db');
const router = express();

router.engine('hbs', hbs({ defaultLayout: 'main', extname: "hbs" }));
router.set('view engine', 'hbs')

// Use Body Parser
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false}));

// Add after body parser initialization!
router.use(expressValidator());

const postsController = require('./controllers/posts');
postsController(router);

// Import Model
const Post = require('./models/post');

router.listen(3000, () => {
    console.log('App listening on port 3000!')
})

module.exports = router;
