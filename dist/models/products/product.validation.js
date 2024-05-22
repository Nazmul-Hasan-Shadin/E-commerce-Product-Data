"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TProductsSchema = exports.TInventorySchema = exports.TVariantsSchema = void 0;
const zod_1 = require("zod");
exports.TVariantsSchema = zod_1.z.object({
    type: zod_1.z.string(),
    value: zod_1.z.string(),
});
exports.TInventorySchema = zod_1.z.object({
    quantity: zod_1.z.number(),
    inStock: zod_1.z.boolean(),
});
exports.TProductsSchema = zod_1.z.object({
    name: zod_1.z.string().nonempty({ message: "Name is required" }),
    description: zod_1.z.string().nonempty({ message: "Description is required" }),
    price: zod_1.z.number().positive({ message: "Price must be a positive number" }),
    category: zod_1.z.string().nonempty({ message: "Category is required" }),
    tags: zod_1.z.array(zod_1.z.string()),
    variants: zod_1.z.array(exports.TVariantsSchema),
    inventory: exports.TInventorySchema,
});
