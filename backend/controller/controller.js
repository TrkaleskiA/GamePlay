const mongoose = require("mongoose");
const Game = require("../model/Games");

// Врати ги сите игри
exports.getGames = async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Додај нова игра (name, size, played)
exports.addGame = async (req, res) => {
  try {
    const { name, size, played } = req.body;
    if (!name || !size) {
      return res.status(400).json({ message: "Name and size are required" });
    }

    const sizeNum = parseFloat(size);
    if (isNaN(sizeNum) || sizeNum <= 0) {
      return res.status(400).json({ message: "Size must be a positive number" });
    }
    
    const game = new Game({
      name,
      size,
      played: played || false,
    });

    const savedGame = await game.save();
    res.status(201).json(savedGame);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Обележи игра како played (или смена на статус)
exports.playGame = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    game.played = true;
    await game.save();
    res.json(game);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Избриши игра по id
exports.deleteGame = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid game ID" });
    }

    const result = await Game.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Game not found" });
    }

    res.json({ message: "Game deleted" });
  } catch (error) {
    console.error("Delete game error:", error);
    res.status(500).json({ message: error.message });
  }
};
