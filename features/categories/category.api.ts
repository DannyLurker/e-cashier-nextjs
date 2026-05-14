import { api, ApiResponse } from "@/shared/lib/api-client";
import {
  CategoryCreateResponse,
  CategoryDeleteResponse,
  CategoryGetManyResponse,
  CategoryGetResponse,
  CategoryUpdateResponse,
} from "./category.types";
import {
  CategoryCreateSchema,
  CategoryGetSchema,
  CategoryUpdateSchema,
} from "@/shared/lib/zods/category.zod";

const categoryApi = {
  get: async (categoryId: string) => {
    const response = await api.get<ApiResponse<CategoryGetResponse>>(
      `/categories/${categoryId}`,
    );

    return response.data.data;
  },

  getMany: async (params: CategoryGetSchema) => {
    const response = await api.get<ApiResponse<CategoryGetManyResponse>>(
      "/categories",
      { params },
    );

    return response.data.data;
  },

  create: async (payload: CategoryCreateSchema) => {
    const response = await api.post<ApiResponse<CategoryCreateResponse>>(
      "/categories",
      payload,
    );

    return response.data.data;
  },

  update: async (payload: CategoryUpdateSchema) => {
    const response = await api.put<ApiResponse<CategoryUpdateResponse>>(
      `/categories`,
      payload,
    );
    return response.data.data;
  },

  delete: async (categoryId: string) => {
    const response = await api.delete<ApiResponse<CategoryDeleteResponse>>(
      `/categories/${categoryId}`,
    );
    return response.data.data;
  },
};

export default categoryApi;
