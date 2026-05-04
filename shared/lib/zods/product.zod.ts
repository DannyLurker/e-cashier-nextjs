import { z } from "zod";

export const productCreateSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().min(1),
  initialStock: z.number().optional(),
  expiredAt: z.date().optional(),
});

export type ProductCreateSchema = z.infer<typeof productCreateSchema>;
