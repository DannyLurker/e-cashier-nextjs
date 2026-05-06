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
import { badRequest, forbidden } from "@/shared/lib/error-handlers";

const productService = {
  create: async (rawData: ProductCreateSchema) => {
    try {
      const session = await sessionValidation();
      const validatedData = productCreateSchema.parse(rawData);

      console.log(validatedData);

      if (!canManageInventory(session.role)) {
        throw forbidden("You're not allowed to access this feature");
      }

      await productRepository.create(session.id, validatedData, prisma);

      return {
        message: `${validatedData.name} was successfully created`,
      };
    } catch (error) {
      throw error;
    }
  },

  update: async (rawData: ProductUpdateSchema) => {
    try {
      const session = await sessionValidation();
      const validatedData = productUpdateSchema.parse(rawData);

      if (!canManageInventory(session.role)) {
        throw forbidden("You're not allowed to access this feature");
      }

      await productRepository.update(session.id, validatedData, prisma);

      return {
        message: `${validatedData.name} was successfully updated`,
      };
    } catch (error) {
      throw error;
    }
  },

  delete: async (productId: string) => {
    try {
      const session = await sessionValidation();

      if (!productId) throw badRequest("Product id is missing");

      if (!canManageInventory(session.role)) {
        throw forbidden("You're not allowed to access this feature");
      }

      const result = await productRepository.delete(productId, prisma);

      return {
        message: `${result.name} was successfully deleted`,
      };
    } catch (error) {
      throw error;
    }
  },
};

export default productService;
