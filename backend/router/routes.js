const express = require("express");
const router = express.Router();
const controller = require("../controller/controller");

router.get("/", controller.getGames);
router.post("/", controller.addGame);
router.patch("/:id/play", controller.playGame);
router.delete("/:id", controller.deleteGame);

module.exports = router;
