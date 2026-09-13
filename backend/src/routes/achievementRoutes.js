const express = require("express");
const { getAll } = require("../controllers/achievementController");
const protect = require("../middleware/auth");

const router = express.Router();

router.use(protect);

router.get("/", getAll);

module.exports = router;
