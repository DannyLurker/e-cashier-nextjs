import sessionValidation from "@/shared/lib/validations/user-session-validation";
import {
  categoryCreateSchema,
  CategoryCreateSchema,
  categoryGetSchema,
  categoryUpdateSchema,
  CategoryUpdateSchema,
} from "@/shared/lib/zods/category.zod";
import categoryRepository from "./category.repository";
import prisma from "@/shared/db/prisma";
import { canManageCategory } from "@/shared/lib/validations/user-access-validation";
import { forbidden } from "@/shared/lib/error-handlers";

const categoryService = {
  get: async (categoryId: string, params: any) => {
    const session = await sessionValidation();
    const validatedParams = categoryGetSchema.parse(params);

    if (!canManageCategory(session.role)) {
      throw forbidden("You're not allowed to access this feature");
    }
    const category = await categoryRepository.get(
      categoryId,
      validatedParams,
      prisma,
    );
    return {
      message: "Category retrieved successfully",
      category,
    };
  },

  getMany: async (params: any) => {
    const session = await sessionValidation();
    const validatedParams = categoryGetSchema.parse(params);

    if (!canManageCategory(session.role)) {
      throw forbidden("You're not allowed to access this feature");
    }

    const categories = await categoryRepository.getMany(
      validatedParams,
      prisma,
    );

    return {
      message: "Categories retrieved successfully",
      categories,
    };
  },

  create: async (data: CategoryCreateSchema) => {
    const session = await sessionValidation();
    const validatedData = categoryCreateSchema.parse(data);

    if (!canManageCategory(session.role)) {
      throw forbidden("You're not allowed to access this feature");
    }

    const category = await categoryRepository.create(
      { name: validatedData.name, createdBy: session.id },
      prisma,
    );

    return {
      message: `${category.name} category was succesfully created`,
    };
  },

  update: async (data: CategoryUpdateSchema) => {
    const session = await sessionValidation();
    const validatedData = categoryUpdateSchema.parse(data);

    if (!canManageCategory(session.role)) {
      throw forbidden("You're not allowed to access this feature");
    }

    const category = await categoryRepository.update(
      { id: validatedData.id, name: validatedData.name },
      prisma,
    );

    return {
      message: `Succesfully updated into ${category.name}`,
    };
  },

  delete: async (categoryId: string) => {
    const session = await sessionValidation();

    if (!canManageCategory(session.role)) {
      throw forbidden("You're not allowed to access this feature");
    }

    const category = await categoryRepository.delete(categoryId, prisma);

    return {
      message: `${category.name} category was succesfully deleted`,
    };
  },
};

export default categoryService;
