const express = require("express");
const { getInventory } = require("../controllers/inventoryController");
const protect = require("../middleware/auth");

const router = express.Router();

router.use(protect);

router.get("/", getInventory);

module.exports = router;
