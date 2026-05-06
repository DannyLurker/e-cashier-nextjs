import { z } from "zod";
import { page, sortByEnum, sortOrderEnum } from "./general.zod";

export const productCreateSchema = z.object({
  name: z.string().trim().min(1),
  description: z.string().trim().min(1),
  image: z.string().optional(),
  price: z.number().min(1),
  attributes: z.json().optional(),
  initialStock: z.number().optional(),
  expiredAt: z.string().optional(),
});

export type ProductCreateSchema = z.infer<typeof productCreateSchema>;

export const productUpdateSchema = z.object({
  productId: z.string().trim().min(1),
  name: z.string().trim().min(1),
  description: z.string().trim().min(1),
  image: z.string().optional(),
  price: z.number().min(1),
  attributes: z.json().optional(),
});

export type ProductUpdateSchema = z.infer<typeof productUpdateSchema>;

export const productGetSchema = z.object({
  page: z.coerce.number().min(0).default(0),
  dataPerPage: z.coerce.number().min(10).default(10),
  isTakeAll: z.preprocess((val) => val === "true", z.boolean()).default(false),
  search: z.string().trim().optional(),
  sortBy: sortByEnum.default("name"),
  orderBy: sortOrderEnum.default("asc"),
});

export type ProductGetSchema = z.infer<typeof productGetSchema>;
