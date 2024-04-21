const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
    playlist_name: { type: String, required: true },
    user_id: { type: String, required: true }, // Reference to the user who owns the playlist
    songs: [{ type: String }] // Array of strings for song titles
});

module.exports = mongoose.model("Playlist", playlistSchema);
