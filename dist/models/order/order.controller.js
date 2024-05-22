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
exports.OrderController = void 0;
const order_services_1 = require("./order.services");
// post order controller
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderInfo = req.body;
        // const zodValidateParser = OrderSchema.parse(orderInfo);
        const result = yield order_services_1.OrderServices.createOrderIntoDb(orderInfo);
        res.status(200).json({
            success: true,
            message: "Order created successfully and updated stock",
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "something went wrong || check your order id not found ",
            error: error.message,
        });
    }
});
// get all order based on query
const getallOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queryEmail = req.query.email;
        console.log(queryEmail);
        let result;
        if (typeof queryEmail == "string" && queryEmail) {
            result = yield order_services_1.OrderServices.getAllOrdeFromDb(queryEmail);
        }
        else {
            result = yield order_services_1.OrderServices.getAllOrdeFromDb();
        }
        res.status(200).json({
            success: true,
            message: "Order fetched  successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
});
exports.OrderController = {
    createOrder,
    getallOrder,
};
