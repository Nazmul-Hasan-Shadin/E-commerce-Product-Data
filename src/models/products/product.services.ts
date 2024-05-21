import { Product } from "./product.model";
import { TProducts } from "./product.interface";
import mongoose from "mongoose";

const createProductIntoDb = async (payload: TProducts) => {
  const result = await Product.create(payload);
  return result;
};

// get all product api

const getAllProductFromDb = async () => {
  const result = await Product.find();
  return result;
};

// search product by id

const getSingleProductFromDb = async (payload: mongoose.Types.ObjectId) => {
  const result = await Product.findById(payload);

  return result;
};

// update product  information

const updateProductIntoDb = async (
  productId: mongoose.Types.ObjectId,
  payload: TProducts
) => {
  const id = productId;
  let updatedData: { $set: Partial<TProducts> } = { $set: {} };

  Object.keys(payload).forEach((property) => {
    const properties = property as keyof TProducts;
    updatedData.$set[properties] = payload[properties];
  });

  const result = await Product.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

// delete a product by id

const deleteProductByIdFromDb = async (id: mongoose.Types.ObjectId) => {
  const result = await Product.deleteOne(id);
  return result;
};

// search api

const getSearchDocumentFromDb = async (queryId: string) => {
  console.log(queryId,'iam inside db');

  const result = await Product.aggregate([
    // pipeline one fro search
    { $match: { $text: { $search: queryId } } }
  ]);

  return result;
};

export const ProductServices = {
  createProductIntoDb,
  getAllProductFromDb,
  getSingleProductFromDb,
  updateProductIntoDb,
  deleteProductByIdFromDb,
  getSearchDocumentFromDb,
};
