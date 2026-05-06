import { z } from "zod";

export const productCreateSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  image: z.string().optional(),
  price: z.number().min(1),
  attributes: z.json().optional(),
  initialStock: z.number().optional(),
  // expiredAt: z
  //   .string()
  //   .transform((val) => new Date(val))
  //   .optional(),
  expiredAt: z.coerce.date().optional(),
});

export type ProductCreateSchema = z.infer<typeof productCreateSchema>;

export const productUpdateSchema = z.object({
  productId: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  image: z.string().optional(),
  price: z.number().min(1),
  attributes: z.json().optional(),
});

export type ProductUpdateSchema = z.infer<typeof productUpdateSchema>;
