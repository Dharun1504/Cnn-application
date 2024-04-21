const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    user_id: { type: String, required: true },
    likedsongs: [{ type: String }] // Array of strings for liked song titles
});

module.exports = mongoose.model("User", userSchema);
