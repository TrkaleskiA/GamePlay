const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
  name: { type: String, required: true },
  size: { type: Number, required: true },
  played: { type: Boolean, default: false },
});

module.exports = mongoose.model("Game", GameSchema);
