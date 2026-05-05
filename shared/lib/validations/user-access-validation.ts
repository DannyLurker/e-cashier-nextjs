import { Roles } from "@prisma/client";

export const canManageInventory = (role: Roles) => {
  return role === "INVENTORY" || role === "MANAGER";
};
