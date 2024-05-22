import express, { Request, Response } from "express";
import { ProductRoutes } from "./models/products/product.route";
import { OrderRoutes } from "./models/order/order.routes";
export const app = express();

app.use(express.json());
// route
app.use("/api/products", ProductRoutes);
app.use("/api/orders", OrderRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.all("*", (req, res, next) => {
  const error = new Error(`The requested URL is invalid [${req.url}]`);
  next(error);
});

app.use((err: any, req: Request, res: Response) => {
  res.status(err.status || 500).json({
    message: err.message,
  });
});
