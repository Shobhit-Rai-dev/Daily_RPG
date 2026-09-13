const express = require("express");
const { getAll, create, update, remove, complete } = require("../controllers/questController");
const protect = require("../middleware/auth");

const router = express.Router();

router.use(protect);

router.get("/", getAll);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", remove);
router.post("/:id/complete", complete);

module.exports = router;
