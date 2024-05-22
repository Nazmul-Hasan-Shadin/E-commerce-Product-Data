"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const product_route_1 = require("./models/products/product.route");
const order_routes_1 = require("./models/order/order.routes");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
// route
exports.app.use("/api/products", product_route_1.ProductRoutes);
exports.app.use("/api/orders", order_routes_1.OrderRoutes);
exports.app.get("/", (req, res) => {
    res.send("Hello World!");
});
