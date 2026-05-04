import prisma from "@/shared/db/prisma";
import { ProductCreateSchema } from "@/shared/lib/zods/product.zod";

const productRepository = {
  store: async (userId: string, data: ProductCreateSchema) => {
    await prisma.product.create({
      data: {
        createdBy: userId,
        name: data.name,
        price: data.price,
        description: data.description,
        stocks:
          data.initialStock && data.expiredAt
            ? {
                create: {
                  createdBy: userId,
                  quantity: data.initialStock,
                  type: "RESTOCK",
                  expiredAt: data.expiredAt,
                },
              }
            : undefined,
      },
    });
  },
};

export default productRepository;
