import { z } from "zod";

export const productStoreSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().min(1),
  initialStock: z.number().optional(),
});

export type ProductStoreSchema = z.infer<typeof productStoreSchema>;
