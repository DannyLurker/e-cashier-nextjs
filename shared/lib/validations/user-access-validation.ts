import { Roles } from "@prisma/client";

const PERMISSIONS = {
  MANAGE_PRODUCT: ["MANAGER", "OWNER"],
  MANAGE_INVENTORY: ["MANAGER", "OWNER", "INVENTORY"],
};

export const canManageProduct = (role: Roles) => {
  return PERMISSIONS.MANAGE_PRODUCT.includes(role);
};
