import express, { Request, Response } from "express";
import { ProductRoutes } from "./models/products/product.route";
export const app = express();


app.use(express.json())
// route 
app.use('/api/products',ProductRoutes)
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

