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
exports.ProductServices = void 0;
const product_model_1 = require("./product.model");
const createProductIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.create(payload);
    return result;
});
// get all product api
const getAllProductFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.find();
    return result;
});
// search product by id
const getSingleProductFromDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findById(payload);
    return result;
});
// update product  information
const updateProductIntoDb = (productId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const id = productId;
    const updatedData = { $set: {} };
    Object.keys(payload).forEach((property) => {
        const properties = property;
        updatedData.$set[properties] = payload[properties];
    });
    const result = yield product_model_1.Product.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
});
// delete a product by id
const deleteProductByIdFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.deleteOne(id);
    return result;
});
// search api
const getSearchDocumentFromDb = (queryId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(queryId, 'iam inside db');
    const result = yield product_model_1.Product.aggregate([
        // pipeline one fro search
        { $match: { $text: { $search: queryId } } }
    ]);
    return result;
});
exports.ProductServices = {
    createProductIntoDb,
    getAllProductFromDb,
    getSingleProductFromDb,
    updateProductIntoDb,
    deleteProductByIdFromDb,
    getSearchDocumentFromDb,
};
