import categoryService from "./category.service";

export type CategoryListResponse = Awaited<
  ReturnType<typeof categoryService.getMany>
>;
export type CategoryListItem = CategoryListResponse["categories"][number];

export type CategoryCreateApiResult = Awaited<
  ReturnType<typeof categoryService.create>
>;
export type CategoryUpdateApiResult = Awaited<
  ReturnType<typeof categoryService.update>
>;
export type CategoryDeleteApiResult = Awaited<
  ReturnType<typeof categoryService.delete>
>;

export type CategoryGetResponse = Awaited<
  ReturnType<typeof categoryService.get>
>;
