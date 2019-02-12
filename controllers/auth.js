// controllers/auth.js
const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = (router) => {
    // SIGN UP FORM
    router.get("/sign-up", (req, res) => {
        res.render("sign-up");
    });

    // SIGN UP POST
    router.post("/sign-up", (req, res) => {
        // CREATE USER and JWT
        const user = new User(req.body);

        user
            .save()
            .then(user => {
                var token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: "60 days" });
                res.cookie('nToken', token, { maxAge: 900000, httpOnly: true});
                res.redirect("/");
            })
            .catch(err => {
                console.log(err.message);
                return res.status(400).send({ err: err });
            });
    });

    // LOGOUT
    router.get('/logout', (req, res) => {
        res.clearCookie('nToken');
        res.redirect('/');
    });
};
