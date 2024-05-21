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
    const stringId = req.params.productId;
    const paramId = new mongoose.Types.ObjectId(stringId);

    const result = await ProductServices.getSingleProductFromDb(paramId);
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

// update product by Put method

const updateSingleProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const id = new mongoose.Types.ObjectId(req.params.productId);
    console.log(id);

    const result = await ProductServices.updateProductIntoDb(id, productData);

    res.json({
      success: true,
      message: "Product updated successfully!",
      data: result,
    });
  } catch (error: any) {
    console.log(error.message);
  }
};
// delete crypto product asset

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
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      error: error.message,
    });
  }
};

//  search by keyward controller

const getSearchDocument = async (req: Request, res: Response) => {
  try {
    const queryId = req.query.searchTerm;

    if (typeof queryId !== "string") {
      return res.status(400).json({
        success: false,
        message: 'Query parameter "searchTerm" must be a string',
      });
    }
    const result = await ProductServices.getSearchDocumentFromDb(queryId);
    res.json({
      message: "Products matching search term 'iphone' fetched successfully!",
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,

      message: error.message || "something went wrong",
    });
  }
};

export const ProductController = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateSingleProduct,
  deleteProductById,
  getSearchDocument,
};
