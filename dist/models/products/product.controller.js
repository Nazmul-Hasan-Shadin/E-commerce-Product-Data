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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const product_services_1 = require("./product.services");
const mongoose_1 = __importDefault(require("mongoose"));
const product_validation_1 = require("./product.validation");
// post product api
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = req.body;
        const zodParseData = product_validation_1.TProductsSchema.parse(productData);
        const result = yield product_services_1.ProductServices.createProductIntoDb(zodParseData);
        res.json({
            success: true,
            message: "Product created successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "something went wrong"
        });
    }
});
// find all product api
const getAllProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queryId = req.query.searchTerm;
        if (queryId) {
            const result = yield product_services_1.ProductServices.getSearchDocumentFromDb(queryId);
            res.json({
                message: "Products matching search term 'iphone' fetched successfully!",
                success: true,
                data: result,
            });
            return;
        }
        const result = yield product_services_1.ProductServices.getAllProductFromDb();
        res.json({
            success: true,
            message: "Product fetched successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "something went wrong",
        });
    }
});
// getSingle product by id
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stringId = req.params.productId;
        const paramId = new mongoose_1.default.Types.ObjectId(stringId);
        const result = yield product_services_1.ProductServices.getSingleProductFromDb(paramId);
        res.json({
            success: true,
            message: "Product fetched successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "something went wrong",
        });
    }
});
// update product by Put method
const updateSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = req.body;
        const zodParseData = product_validation_1.TProductsSchema.parse(productData);
        const id = new mongoose_1.default.Types.ObjectId(req.params.productId);
        console.log(id);
        const result = yield product_services_1.ProductServices.updateProductIntoDb(id, zodParseData);
        res.json({
            success: true,
            message: "Product updated successfully!",
            data: result,
        });
    }
    catch (error) {
        res.json({
            success: false,
            message: "Product not updated !",
            error: error.message,
        });
    }
});
// delete product by id
const deleteProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const productIdWithObjId = new mongoose_1.default.Types.ObjectId(productId);
        const result = yield product_services_1.ProductServices.deleteProductByIdFromDb(productIdWithObjId);
        res.json({
            success: true,
            message: "Product deleted successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(404).json({
            error: error.message,
        });
    }
});
//  search by keyward controller
exports.ProductController = {
    createProduct,
    getAllProduct,
    getSingleProduct,
    updateSingleProduct,
    deleteProductById,
};
