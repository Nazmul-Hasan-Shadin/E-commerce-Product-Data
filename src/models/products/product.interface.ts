import mongoose from "mongoose";


export type TVariants={
    
        type:string,
        value:string,
        _id?:mongoose.Types.ObjectId
    }

 export type TInventory={
    quantity:number;
    inStock:boolean
 }



export type TProducts={
    name:string;
    description:string;
    price:number;
    category:string;
    tags:string[];
    variants:TVariants[];
    inventory:TInventory;


}