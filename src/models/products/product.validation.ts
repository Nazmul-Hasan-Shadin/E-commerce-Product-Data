import { z } from "zod";


export const TVariantsSchema = z.object({
    type: z.string(),
    value: z.string(),
  });

  export const TInventorySchema = z.object({
    quantity: z.number(),
    inStock: z.boolean(),
  });


export const TProductsSchema = z.object({

  name: z.string().nonempty({ message: "Name is required" }),
  description: z.string().nonempty({ message: "Description is required" }),
  price: z.number().positive({ message: "Price must be a positive number" }),
  category: z.string().nonempty({ message: "Category is required" }),
  tags: z.array(z.string()),
  variants: z.array(TVariantsSchema),
  inventory: TInventorySchema,
});
