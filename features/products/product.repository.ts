import { ProductCreateSchema } from "@/shared/lib/zods/product.zod";
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
        price: data.price,
        description: data.description,
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
};

export default productRepository;
