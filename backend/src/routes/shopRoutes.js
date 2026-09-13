const express = require("express");
const { getItems, buyItem } = require("../controllers/shopController");
const protect = require("../middleware/auth");

const router = express.Router();

router.use(protect);

router.get("/", getItems);
router.post("/:id/buy", buyItem);

module.exports = router;
