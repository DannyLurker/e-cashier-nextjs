import categoryApi from "./category.api";

export type CategoryListResponse = Awaited<
  ReturnType<typeof categoryApi.getMany>
>;
export type CategoryListItem = CategoryListResponse[number];

export type CategoryCreateApiResult = Awaited<
  ReturnType<typeof categoryApi.create>
>;
export type CategoryUpdateApiResult = Awaited<
  ReturnType<typeof categoryApi.update>
>;
export type CategoryDeleteApiResult = Awaited<
  ReturnType<typeof categoryApi.delete>
>;

export type CategoryGetResponse = Awaited<
  ReturnType<typeof categoryApi.get>
>;
