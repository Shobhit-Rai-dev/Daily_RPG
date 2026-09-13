const mongoose = require("mongoose");

const InventoryItemSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    itemId: { type: String, required: true }, // references SHOP_ITEMS catalog id
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    color: { type: String },
    multiplier: { type: Number },
    description: { type: String },
    icon: { type: String },
    acquiredAt: { type: Date, default: Date.now }
  },
  { timestamps: false }
);

InventoryItemSchema.methods.toClientItem = function toClientItem() {
  return {
    instanceId: this._id.toString(),
    id: this.itemId,
    name: this.name,
    price: this.price,
    category: this.category,
    color: this.color,
    multiplier: this.multiplier,
    description: this.description,
    icon: this.icon,
    acquiredAt: this.acquiredAt
  };
};

module.exports = mongoose.model("InventoryItem", InventoryItemSchema);
