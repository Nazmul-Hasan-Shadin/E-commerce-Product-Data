"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = require("zod");
exports.OrderSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    productId: zod_1.z.string().transform((val) => new mongoose_1.default.Types.ObjectId(val)),
    price: zod_1.z.number().positive(),
    quantity: zod_1.z.number().int().positive(),
});
