import mongoose, { Types } from "mongoose";

export type TOrder = {
  email: string;
  productId:mongoose.Schema.Types.ObjectId;
  price: number;
  quantity: number;
};

