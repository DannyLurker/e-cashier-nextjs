import {
  ProductCreateSchema,
  ProductUpdateSchema,
} from "@/shared/lib/zods/product.zod";
import { Prisma, PrismaClient } from "@prisma/client";

const productRepository = {
  create: async (
    userId: string,
    data: ProductCreateSchema,
    tx: PrismaClient | Prisma.TransactionClient,
  ) => {
    await tx.product.create({
      data: {
        createdBy: userId,
        name: data.name,
        description: data.description,
        image: data.image,
        price: data.price,
        attributes: data.attributes ? data.attributes : undefined,
        stocks: data.initialStock
          ? {
              create: {
                createdBy: userId,
                quantity: data.initialStock,
                type: "RESTOCK",
                expiredAt: data.expiredAt ? data.expiredAt : undefined,
              },
            }
          : undefined,
      },
    });
  },
  update: async (
    userId: string,
    data: ProductUpdateSchema,
    tx: PrismaClient | Prisma.TransactionClient,
  ) => {
    await tx.product.update({
      where: {
        id: data.productId,
      },
      data: {
        updatedBy: userId,
        name: data.name,
        description: data.description,
        image: data.image,
        price: data.price,
        attributes: data.attributes ? data.attributes : undefined,
      },
    });
  },
};

export default productRepository;
