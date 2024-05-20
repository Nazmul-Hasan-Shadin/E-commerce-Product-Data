
import { Product } from "./product.model";
import { TProducts } from "./product.interface";

const createProductIntoDb=async(payload:TProducts)=>{

    const result=await Product.create(payload)
    return result
}


export const ProductServices={
    createProductIntoDb,

}