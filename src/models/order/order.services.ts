import { Product } from "../products/product.model";
import { TOrder } from "./order.interface";
import { Order } from "./order.models";

// create order into db and updating quantity of stock
const createOrderIntoDb = async (payload: TOrder) => {
  const productId = payload.productId;
  const isexistProduct = await Product.findOne({ _id: productId });

  if (!isexistProduct) {
    throw new Error("Invalid productId(userid). Product ID does not exist.");
  }

  if (isexistProduct.inventory.quantity < payload.quantity) {
    throw new Error("Insufficient quantity available in inventory");
  }
  if (payload.quantity <= 0) {
    throw new Error("Quantity must be a positive number.");
  }

  if (isexistProduct) {
    const result = await Order.create(payload);

     await Product.findOneAndUpdate(
      { _id: productId },
      {
        $inc: { "inventory.quantity": -payload.quantity },
        $set: {
          "inventory.inStock":
            isexistProduct.inventory.quantity - payload.quantity > 0,
        },
      }
    );

    return result;
  }
};

// pull all order from db

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
