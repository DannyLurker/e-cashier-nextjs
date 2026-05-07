import sessionValidation from "@/shared/lib/validations/user-session-validation";
import {
  productCreateSchema,
  ProductCreateSchema,
  productGetSchema,
  productUpdateSchema,
  ProductUpdateSchema,
} from "@/shared/lib/zods/product.zod";
import productRepository, { createProductInclude } from "./product.repository";
import prisma from "@/shared/db/prisma";

import { badRequest, forbidden } from "@/shared/lib/error-handlers";
import { canManageProduct } from "@/shared/lib/validations/user-access-validation";
import { Prisma } from "@prisma/client";

const productService = {
  create: async (rawData: ProductCreateSchema) => {
    const session = await sessionValidation();
    const validatedData = productCreateSchema.parse(rawData);

    if (!canManageProduct(session.role)) {
      throw forbidden("You're not allowed to access this feature");
    }

    await productRepository.create(session.id, validatedData, prisma);

    return {
      message: `${validatedData.name} was successfully created`,
    };
  },

  get: async (productId: string) => {
    await sessionValidation();

    if (!productId) throw badRequest("Product ID is missing");

    const productWithStock = createProductInclude({ stocks: true });

    const product = await productRepository.get(
      productId,
      productWithStock,
      prisma,
    );

    return {
      message: `${product?.name} was successfully retrieved`,
      product,
    };
  },

  // I set the params into any because it comes from params that takes everything as a string, it won't match into zod type because it has number, boolean, etc
  getMany: async (params: any) => {
    await sessionValidation();
    const validatedParams = productGetSchema.parse(params);

    let products;

    // TODO: Add aggreate into product.repository and work on getManyByCategory

    if (validatedParams.isByCategory) {
      // products = await productRepository.getManyByCategory(validatedParams)
    } else {
      products = await productRepository.getMany(
        validatedParams,
        undefined,
        prisma,
      );
    }

    return {
      message: "Product data successfully retrieved",
      products,
    };
  },

  update: async (rawData: ProductUpdateSchema) => {
    const session = await sessionValidation();
    const validatedData = productUpdateSchema.parse(rawData);

    if (!canManageProduct(session.role)) {
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

    if (!canManageProduct(session.role)) {
      throw forbidden("You're not allowed to access this feature");
    }

    const product = await productRepository.delete(productId, prisma);

    return {
      message: `${product.name} was successfully deleted`,
    };
  },
};

export default productService;
