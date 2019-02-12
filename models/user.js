const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    createdAt: { type: Date},
    updatedAt: { type: Date},
    password: { type: String, select: false},
    username: { type: String, required: true },
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }]
});

// MUST USE FUNCTION HERE! => FUNCTIONS DO NOT BIND THIS!
UserSchema.pre("save", function(next) {
    // SET createdAt AND updateAt
    const now = new Date();
    this.updateAt = now;
    if (!this.createdAt) {
        this.createdAt = now;
    }

    // ENCRYPT PASSWORD
    const user = this;
    if (!user.isModified("password")) {
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            user.password = hash;
            next();
        });
    });
});

// NEED TO USE FUNCTION TO ENABLE THIS.PASSWORD to work.
UserSchema.methods.comparePassword = function(password, done) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        done(err, isMatch);
    });
};


module.exports = mongoose.model("User", UserSchema);
