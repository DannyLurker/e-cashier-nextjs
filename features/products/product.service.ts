import sessionValidation from "@/shared/lib/session-validations";
import { ProductCreateSchema } from "@/shared/lib/zods/product.zod";

const productService = () => {
  return {
    store: async (data: ProductCreateSchema) => {
      const inventorySession = await sessionValidation.inventory();
    },
  };
};

export default productService;
