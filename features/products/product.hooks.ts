import {
  ProductCreateSchema,
  ProductGetSchema,
} from "@/shared/lib/zods/product.zod";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { ProductGetManyResponse, ProductGetResponse } from "./product.types";
import { productApi } from "./product.api";
import PRODUCT_KEYS from "./product.keys";
import { toast } from "sonner";

export const useProducts = (
  params: ProductGetSchema,
  options?: Partial<UseQueryOptions<ProductGetManyResponse>>,
) => {
  return useQuery({
    queryKey: PRODUCT_KEYS.list(params),
    queryFn: () => productApi.getMany(params),
    ...options,
  });
};

export const useProduct = (
  productId: string,
  options?: Partial<UseQueryOptions<ProductGetResponse>>,
) => {
  return useQuery({
    queryKey: PRODUCT_KEYS.detail(productId),
    queryFn: () => productApi.get(productId),
    ...options,
  });
};

export const useCreateProduct = (payload: ProductCreateSchema) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => productApi.create(payload),
    onSuccess: (data) => {
      toast.success(data.message);

      queryClient.invalidateQueries({ queryKey: PRODUCT_KEYS.lists() });
    },
  });
};

export const useUpdateProduct = (payload: ProductCreateSchema) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => productApi.update(payload),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: PRODUCT_KEYS.lists() });
    },
  });
};

export const useDeleteProduct = (productId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => productApi.delete(productId),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: PRODUCT_KEYS.lists() });
    },
  });
};
