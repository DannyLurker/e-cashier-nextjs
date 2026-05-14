import { api, ApiResponse } from "@/shared/lib/api-client";
import {
  CategoryCreateApiResult,
  CategoryDeleteApiResult,
  CategoryListResponse,
  CategoryGetResponse,
  CategoryUpdateApiResult,
} from "./category.types";
import {
  CategoryCreateSchema,
  categoryGetSchema,
  CategoryGetSchema,
  CategoryUpdateSchema,
} from "@/shared/lib/zods/category.zod";

const categoryApi = {
  get: async (
    categoryId: string,
    params: CategoryGetSchema = categoryGetSchema.parse({}),
  ) => {
    const response = await api.get<ApiResponse<CategoryGetResponse>>(
      `/categories/${categoryId}`,
      { params },
    );

    return response.data.data;
  },

  getMany: async (params: CategoryGetSchema) => {
    const response = await api.get<ApiResponse<CategoryListResponse>>(
      "/categories",
      { params },
    );

    return response.data.data;
  },

  create: async (payload: CategoryCreateSchema) => {
    const response = await api.post<ApiResponse<string>>(
      "/categories",
      payload,
    );

    return {
      message: response.data.message,
      id: response.data.data,
    } satisfies CategoryCreateApiResult;
  },

  update: async (payload: CategoryUpdateSchema) => {
    const response = await api.patch<ApiResponse<null>>(
      `/categories`,
      payload,
    );
    return {
      message: response.data.message,
    } satisfies CategoryUpdateApiResult;
  },

  delete: async (categoryId: string) => {
    const response = await api.delete<ApiResponse<null>>(
      `/categories/${categoryId}`,
    );
    return {
      message: response.data.message,
    } satisfies CategoryDeleteApiResult;
  },
};

export default categoryApi;
