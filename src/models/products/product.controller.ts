import { Request, Response } from "express";
import { ProductServices } from "./product.services";
import mongoose from "mongoose";

// post product api

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const result = await ProductServices.createProductIntoDb(productData);
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

// find all product api

const getAllProduct = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getAllProductFromDb();
    res.json({
      success: true,
      message: "Product fetched successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "something went wrong",
    });
  }
};

// getSingle product by id

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const stringId=req.params.productId
    const paramId = new mongoose.Types.ObjectId(stringId)
    
    
    const result =await ProductServices.getSingleProductFromDb(paramId);
    res.json({
      success: true,
      message: "Product fetched successfully!",
      data: result,
    });
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: error.message || "something went wrong",
    });
  }
};

export const ProductController = {
  createProduct,
  getAllProduct,
  getSingleProduct
};
