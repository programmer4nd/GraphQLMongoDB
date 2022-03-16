const mongoose = require("mongoose");
var UserSchema = mongoose.Schema({
    name: String,
    email: String,
    mobile: String,
    status: String
});

const User = mongoose.model("User", UserSchema);
module.exports = { User }