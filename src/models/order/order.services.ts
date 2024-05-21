import { Product } from "../products/product.model";
import { TOrder } from "./order.interface";
import { Order } from "./order.models";

const createOrderIntoDb = async (payload: TOrder) => {
  const productId = payload.productId;
  const isexistProduct = await Product.find({ _id: productId });
  console.log(isexistProduct);

  if (isexistProduct) {
    const result = await Order.create(payload);
    return result;
  }
  
};

const getAllOrdeFromDb = async (emailQuery?: string) => {
  if (emailQuery) {
    const result = await Order.find({ email: emailQuery });
    return result;
  }

  //  if (emailQuery) {
  //     const result= await Order.aggregate([
  //         {$match:{email:emailQuery}},

  //         {
  //             $lookup:{
  //                 from:'products',
  //                 foreignField: '_id',
  //                 localField:'productId',
  //                 as:'orders'
  //             }
  //         }

  //     ])
  //     return result
  //  }

  const result = await Order.find();
  return result;
};

export const OrderServices = {
  createOrderIntoDb,
  getAllOrdeFromDb,
};
