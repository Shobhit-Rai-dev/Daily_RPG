const express = require("express");
const { getCharacter, updateCharacter } = require("../controllers/characterController");
const protect = require("../middleware/auth");

const router = express.Router();

router.use(protect);

router.get("/", getCharacter);
router.put("/", updateCharacter);

module.exports = router;
