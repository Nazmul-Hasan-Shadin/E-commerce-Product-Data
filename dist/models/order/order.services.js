"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderServices = void 0;
const product_model_1 = require("../products/product.model");
const order_models_1 = require("./order.models");
// create order into db and updating quantity of stock
const createOrderIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = payload.productId;
    const isexistProduct = yield product_model_1.Product.findOne({ _id: productId });
    if (!isexistProduct) {
        throw new Error("Invalid productId(userid). Product ID does not exist.");
    }
    if (isexistProduct.inventory.quantity < payload.quantity) {
        throw new Error("Insufficient quantity in stock.");
    }
    if (payload.quantity <= 0) {
        throw new Error("Quantity must be a positive number.");
    }
    if (isexistProduct) {
        const result = yield order_models_1.Order.create(payload);
        yield product_model_1.Product.findOneAndUpdate({ _id: productId }, {
            $inc: { "inventory.quantity": -payload.quantity },
            $set: {
                "inventory.inStock": isexistProduct.inventory.quantity - payload.quantity > 0,
            },
        });
        return result;
    }
});
// pull all order from db
const getAllOrdeFromDb = (emailQuery) => __awaiter(void 0, void 0, void 0, function* () {
    if (emailQuery) {
        const result = yield order_models_1.Order.find({ email: emailQuery });
        return result;
    }
    //  if (emailQuery) {
    //     const result= await Order.aggregate([
    //         {$match:{email:emailQuery}},
    //         {
    //             $lookup:{
    //                 from:'products',
    //                 foreignField: '_id',
    //                 localField:'productId',
    //                 as:'orders'
    //             }
    //         }
    //     ])
    //     return result
    //  }
    const result = yield order_models_1.Order.find();
    return result;
});
exports.OrderServices = {
    createOrderIntoDb,
    getAllOrdeFromDb,
};
