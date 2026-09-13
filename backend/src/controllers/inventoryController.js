const InventoryItem = require("../models/InventoryItem");

async function getInventory(req, res, next) {
  try {
    const inventory = await InventoryItem.find({ user: req.userId }).sort({ acquiredAt: 1 });
    res.json(inventory.map((i) => i.toClientItem()));
  } catch (err) {
    next(err);
  }
}

module.exports = { getInventory };
