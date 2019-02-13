// test/posts.js
const router = require("./../server");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

// Import the Post model from our models folder so we can use it in our tests
const Post = require('../models/post');
const server = require('../server');
const agent = chai.request.agent(app);

chai.should();
chai.use(chaiHttp);

describe('Posts', function() {
    const agent = chai.request.agent(server);

    // Post that we'll use for testing purposes
    const newPost = {
        title: 'post title',
        url: 'https://www.google.com',
        summary: 'post summary',
    };

    const user = {
        username: 'poststest',
        password: 'testposts'
    }

    before(function (done) {
        agent
            .post('/sign-up')
            .set("content-type", "application/x-www-form-urlencoded")
            .send(user)
            .then(function (res) {
                done();
            })
            .catch(function (err) {
                done(err);
            });
    });

    it("should create with valid attributes at POST /posts/new", function (done) {
        // Check how many posts there are now
        const initialDocCount = Post.estimatedDocumentCount();
        .then(function (initialDocCount) {
            chai.request(router)
                .post("/posts/new")
                // This line fakes a form post,
                // since we're not actually filling out a form
                .set("content-type", "application/x-www-form-urlencoded")
                // Make a request to create another
                .send(newPost)
                .then(function (res) {
                    const newDocCount = Post.estimatedDocumentCount()
                    .then(function (newDocCount) {
                        // Check that the database has one more post in it
                        expect(res).to.have.status(200);
                        // Check that the database has one more post in it
                        expect(newDocCount).to.be.equal(initialDocCount + 1)
                        done();
                    })
                    .catch(function (err) {
                        done(err);
                    });
            })
            .catch(function (err) {
                done(err);
            });
        })
        .catch(function (err) {
            done(err);
        });
    });
});

after(function (done) {
    Post.findoneAndDelete(newPost)
    .then(function (res) {
        agent.close()

        User.findOneAndDelete({
            username: user.username
        })
            .then(function (res) {
                done()
            })
            .catch(function (err) {
                done(err);
            });
    })
    .catch(function (err) {
        done(err);
    });

    // LOGIN
    it("should be able to login", function(done) {
        agent
            .post("/login")
            .send({ username: "testone", password: "password" })
            .end(function(err, res) {
                res.should.have.status(200);
                agent.should.have.cookie("nToken");
                done();
            });
    });

    // LOGOUT
    it("should be able to logout", function(done) {
        agent.get("/logout").end(function(err, res) {
            res.should.have.status(200);
            agent.should.not.have.cookie("nToken");
            done();
        });
    });
});
