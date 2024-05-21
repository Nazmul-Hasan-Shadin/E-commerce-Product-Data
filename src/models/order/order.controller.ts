import { Request, Response } from "express";
import { OrderServices } from "./order.services";

// post order controller
const createOrder = async (req: Request, res: Response) => {
  try {
    const orderInfo = req.body;
    const result = await OrderServices.createOrderIntoDb(orderInfo);
    res.status(200).json({
      success: true,
      message: "Order created successfully and updated stock",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      //   message: "sir Id is not vaild ",
      error: error.message,
    });
  }
};

// get all order based on query

const getallOrder = async (req: Request, res: Response) => {
  try {
    const queryEmail = req.query.email;
    console.log(queryEmail);
    let result;
    if (typeof queryEmail == "string" && queryEmail) {
      result = await OrderServices.getAllOrdeFromDb(queryEmail);
    } else {
      result = await OrderServices.getAllOrdeFromDb();
    }

    res.status(200).json({
      success: true,
      message: "Order fetched  successfully!",

      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

export const OrderController = {
  createOrder,
  getallOrder,
};
