import {
  ProductCreateSchema,
  ProductGetSchema,
  ProductUpdateSchema,
} from "@/shared/lib/zods/product.zod";
import { Prisma, PrismaClient } from "@prisma/client";

export const createProductInclude = <T extends Prisma.ProductInclude>(
  include: T,
) => include;

const productRepository = {
  get: async <T extends Prisma.ProductInclude>(
    productId: string,
    include: Prisma.Subset<Prisma.ProductInclude, T> | undefined,
    tx: PrismaClient | Prisma.TransactionClient,
  ) => {
    return await tx.product.findUnique({
      where: {
        id: productId,
      },
      include,
    });
  },

  getMany: async <T extends Prisma.ProductInclude>(
    params: ProductGetSchema,
    include: Prisma.Subset<Prisma.ProductInclude, T> | undefined,
    tx: PrismaClient | Prisma.TransactionClient,
  ) => {
    return await tx.product.findMany({
      where:
        params.search && params.search.length >= 3
          ? {
              name: {
                contains: params.search,
                mode: "insensitive",
              },
            }
          : undefined,
      include,
      take: params.isTakeAll ? undefined : params.dataPerPage,
      skip: params.isTakeAll ? undefined : params.page * params.dataPerPage,
      orderBy: {
        name:
          params.sortBy === "name"
            ? params.orderBy === "asc"
              ? "asc"
              : "desc"
            : undefined,
        price:
          params.sortBy === "price"
            ? params.orderBy === "asc"
              ? "asc"
              : "desc"
            : undefined,
        createdAt:
          params.sortBy === "createdAt"
            ? params.orderBy === "asc"
              ? "asc"
              : "desc"
            : undefined,
      },
    });
  },

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
                expiredAt: data.expiredAt,
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

  delete: async (
    productId: string,
    tx: PrismaClient | Prisma.TransactionClient,
  ) => {
    return await tx.product.delete({
      where: {
        id: productId,
      },
      select: {
        name: true,
      },
    });
  },
};

export default productRepository;
