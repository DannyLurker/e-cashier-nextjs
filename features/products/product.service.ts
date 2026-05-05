import sessionValidation from "@/shared/lib/validations/user-session-validation";
import {
  productCreateSchema,
  ProductCreateSchema,
  productUpdateSchema,
  ProductUpdateSchema,
} from "@/shared/lib/zods/product.zod";
import productRepository from "./product.repository";
import prisma from "@/shared/db/prisma";
import { canManageInventory } from "@/shared/lib/validations/user-access-validation";
import { forbidden } from "@/shared/lib/error-handlers";

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
};

export default productService;
