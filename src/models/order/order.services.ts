import { Product } from "../products/product.model";
import { TOrder } from "./order.interface";
import { Order } from "./order.models";

const createOrderIntoDb = async (payload: TOrder) => {
  const productId = payload.productId;
  const isexistProduct = await Product.findOne({ _id: productId });

  if (!isexistProduct) {
    throw new Error("Invalid productId. Product ID does not exist.");
  }

  if (isexistProduct.inventory.quantity < payload.quantity) {
    throw new Error("Insufficient quantity in stock.");
  }
  if (payload.quantity <= 0) {
    throw new Error("Quantity must be a positive number.");
  }

  if (isexistProduct) {
    const result = await Order.create(payload);

    const updateQuantity = await Product.findOneAndUpdate(
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
