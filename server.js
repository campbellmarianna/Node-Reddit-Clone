require('dotenv').config();
const express = require('express');
const hbs = require('express-handlebars');

// INITIALIZE BODY-PARSER
const bodyParser = require('body-parser');

// IMPORT Express Validator
const expressValidator = require('express-validator');

// IMPORT JWT AS A COOKIE
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

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

router.use(cookieParser()); // ADD THIS AFTER YOU INITIALIZE EXPRESS

// ADD CUSTOM MIDDLEWARE
var checkAuth = (req, res, next) => {
  console.log("Checking authentication");
  if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
    req.user = null;
  } else {
    var token = req.cookies.nToken;
    var decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
  }

  next();
};

router.use(checkAuth);
router.use(express.static('public'));

// Import Model
const Post = require('./models/post');

// ADD CONTROLLERS
require('./controllers/posts')(router);
require('./controllers/comments.js')(router);
require('./controllers/auth.js')(router);
require('./controllers/replies.js')(router);



router.listen(3000, () => {
    console.log('App listening on port 3000!')
})

module.exports = router;
