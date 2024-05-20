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

const getSingleProductFromDb = async (payload:mongoose.Types.ObjectId) => {
  const result = await Product.findById(payload);
  console.log(result);
  
  return result;
};

export const ProductServices = {
  createProductIntoDb,
  getAllProductFromDb,
  getSingleProductFromDb
};
