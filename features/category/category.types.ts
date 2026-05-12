import categoryService from "./category.service";

export type CategoryGetManyResponse = Awaited<
  ReturnType<typeof categoryService.getMany>
>;

export type CategoryCreateResponse = Awaited<
  ReturnType<typeof categoryService.create>
>;

export type CategoryGetResponse = Awaited<
  ReturnType<typeof categoryService.get>
>;

export type CategoryUpdateResponse = Awaited<
  ReturnType<typeof categoryService.update>
>;

export type CategoryDeleteResponse = Awaited<
  ReturnType<typeof categoryService.delete>
>;
