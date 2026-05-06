import sessionValidation from "@/shared/lib/validations/user-session-validation";
import {
  productCreateSchema,
  ProductCreateSchema,
  productGetSchema,
  ProductGetSchema,
  productUpdateSchema,
  ProductUpdateSchema,
} from "@/shared/lib/zods/product.zod";
import productRepository from "./product.repository";
import prisma from "@/shared/db/prisma";
import { canManageInventory } from "@/shared/lib/validations/user-access-validation";
import { badRequest, forbidden } from "@/shared/lib/error-handlers";

const productService = {
  create: async (rawData: ProductCreateSchema) => {
    const session = await sessionValidation();
    const validatedData = productCreateSchema.parse(rawData);

    if (!canManageInventory(session.role)) {
      throw forbidden("You're not allowed to access this feature");
    }

    await productRepository.create(session.id, validatedData, prisma);

    return {
      message: `${validatedData.name} was successfully created`,
    };
  },

  // I set the params into any because it comes from params that takes everything as a string, it won't match into zod type because it has number, boolean, etc
  getMany: async (params: any) => {
    await sessionValidation();
    const validatedParams = productGetSchema.parse(params);

    const products = await productRepository.getMany(
      validatedParams,
      undefined,
      prisma,
    );

    return {
      message: "Product data successfully retrieved",
      products,
    };
  },

  update: async (rawData: ProductUpdateSchema) => {
    const session = await sessionValidation();
    const validatedData = productUpdateSchema.parse(rawData);

    if (!canManageInventory(session.role)) {
      throw forbidden("You're not allowed to access this feature");
    }

    await productRepository.update(session.id, validatedData, prisma);

    return {
      message: `${validatedData.name} was successfully updated`,
    };
  },

  delete: async (productId: string) => {
    const session = await sessionValidation();

    if (!productId) throw badRequest("Product id is missing");

    if (!canManageInventory(session.role)) {
      throw forbidden("You're not allowed to access this feature");
    }

    const product = await productRepository.delete(productId, prisma);

    return {
      message: `${product.name} was successfully deleted`,
    };
  },
};

export default productService;
