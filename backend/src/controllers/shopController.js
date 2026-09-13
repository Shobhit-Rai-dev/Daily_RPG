const InventoryItem = require("../models/InventoryItem");
const { SHOP_ITEMS } = require("../utils/gameData");

async function getItems(req, res) {
  res.json(SHOP_ITEMS);
}

async function buyItem(req, res, next) {
  try {
    const item = SHOP_ITEMS.find((i) => i.id === req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found in realm registry" });
    }

    const user = req.user;
    if (user.gold < item.price) {
      return res
        .status(400)
        .json({ message: `Insufficient coins! Need ${item.price - user.gold} more gold.` });
    }

    user.gold -= item.price;
    if (item.multiplier) {
      user.activeXpMultiplier = item.multiplier;
    }
    await user.save();

    await InventoryItem.create({
      user: user._id,
      itemId: item.id,
      name: item.name,
      price: item.price,
      category: item.category,
      color: item.color,
      multiplier: item.multiplier,
      description: item.description,
      icon: item.icon
    });

    const inventory = await InventoryItem.find({ user: user._id }).sort({ acquiredAt: 1 });

    res.json({
      item,
      character: user.toCharacter(),
      inventory: inventory.map((i) => i.toClientItem())
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { getItems, buyItem };
