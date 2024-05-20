import { Request, Response } from "express";
import { ProductServices } from "./product.services";

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const result =await ProductServices.createProductIntoDb(productData);
    res.json({
      success: true,
      message: "Product created successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "something went wrong",
    });
  }
};

export const ProductController={
    createProduct
}
