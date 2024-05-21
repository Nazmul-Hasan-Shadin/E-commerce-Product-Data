import express, { Request, Response } from "express";
import { ProductRoutes } from "./models/products/product.route";
import { OrderRoutes } from "./models/order/order.routes";
export const app = express();


app.use(express.json())
// route 
app.use('/api/products',ProductRoutes)
app.use('/api/orders',OrderRoutes)


app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

