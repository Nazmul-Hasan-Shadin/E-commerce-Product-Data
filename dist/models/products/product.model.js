"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const variants = new mongoose_1.Schema({
    type: String,
    value: String,
});
const inventory = new mongoose_1.Schema({
    quantity: { type: Number },
    inStock: Boolean,
});
const productSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    tags: { type: [String], default: undefined },
    variants: [variants],
    inventory: inventory,
});
// for searching multiple field
productSchema.index({ name: "text" });
exports.Product = (0, mongoose_1.model)("Product", productSchema);
