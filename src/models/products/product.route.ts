import express from "express";
import { ProductController } from "./product.controller";
const router = express.Router();

router.post("/", ProductController.createProduct);
router.get("/", ProductController.getAllProduct);
// router.get("/search", ProductController.getSearchDocument);
router.get("/:productId", ProductController.getSingleProduct);
router.put("/:productId", ProductController.updateSingleProduct);
router.delete("/:productId", ProductController.deleteProductById);

export const ProductRoutes = router;
