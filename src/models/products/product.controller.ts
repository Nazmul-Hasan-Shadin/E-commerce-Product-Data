import { Request, Response } from "express";
import { ProductServices } from "./product.services";
import mongoose from "mongoose";
import { TProductsSchema } from "./product.validation";

// post product api

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const zodParseData= TProductsSchema.parse(productData)
    const result = await ProductServices.createProductIntoDb(zodParseData);
    res.json({
      success: true,
      message: "Product created successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as Error).message || "something went wrong"
    });
  }
};

// find all product api

const getAllProduct = async (req: Request, res: Response) => {
  try {
    const queryId = req.query.searchTerm;

    if (queryId) {
      const result = await ProductServices.getSearchDocumentFromDb(
        queryId as string
      );
      res.json({
        message: "Products matching search term 'iphone' fetched successfully!",
        success: true,
        data: result,
      });

      return;
    }

    const result = await ProductServices.getAllProductFromDb();
    res.json({
      success: true,
      message: "Product fetched successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as Error).message || "something went wrong",
    });
  }
};

// getSingle product by id

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const stringId = req.params.productId;
    const paramId = new mongoose.Types.ObjectId(stringId);

    const result = await ProductServices.getSingleProductFromDb(paramId);
    res.json({
      success: true,
      message: "Product fetched successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as Error).message || "something went wrong",
    });
  }
};

// update product by Put method

const updateSingleProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const zodParseData= TProductsSchema.parse(productData)
    const id = new mongoose.Types.ObjectId(req.params.productId);
    console.log(id);

    const result = await ProductServices.updateProductIntoDb(id, zodParseData);

    res.json({
      success: true,
      message: "Product updated successfully!",
      data: result,
    });
  } catch (error) {
   
    
    res.json({
      success: false,
      message: "Product not updated !",
      error: (error as Error).message,
    });
  }
};
// delete product by id

const deleteProductById = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const productIdWithObjId = new mongoose.Types.ObjectId(productId);
    const result = await ProductServices.deleteProductByIdFromDb(
      productIdWithObjId
    );
    res.json({
      success: true,
      message: "Product deleted successfully!",
      data:null,
      info: result,
    });
  } catch (error) {
    res.status(404).json({
      error: (error as Error).message,
    });
  }
};

//  search by keyward controller

export const ProductController = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateSingleProduct,
  deleteProductById,
};
