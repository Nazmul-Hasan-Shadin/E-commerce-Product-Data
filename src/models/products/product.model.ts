import { Schema, model } from "mongoose";
import { TInventory, TProducts, TVariants } from "./product.interface";

const variants = new Schema<TVariants>({
  type: String,
  value: String,
});

const inventory = new Schema<TInventory>({
  quantity: { type: Number },
  inStock: Boolean,
});

const productSchema = new Schema<TProducts>({
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

export const Product = model<TProducts>("Product", productSchema);
