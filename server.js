const express = require('express');
const hbs = require('express-handlebars');

const router = express();

router.engine('hbs', hbs({ defaultLayout: 'main', extname: "hbs" }));
router.set('view engine', 'hbs')

router.get('/', (req, res) => {
    res.render('home');
})

router.listen(3000, () => {
    console.log('App listening on port 3000!')
})
