import { Issue } from "../types/zod.type";

export const isRequiredMessage = (field: string) => {
  return `${field} is required`;
};

export const formatZodErrors = (issues: Issue[]) => {
  return issues.map((issue) => {
    const field = issue.path.join(".") || "root";

    switch (issue.code) {
      case "invalid_type":
        return `${field} must be a ${issue.expected}`;

      case "unrecognized_keys":
        return `Unknown field(s): ${issue.keys?.join(", ")}`;

      case "invalid_string":
        return `${field} is invalid`;

      case "too_small":
        return `${field} is too short`;

      case "too_big":
        return `${field} is too long`;

      case "custom":
        return issue.message;

      default:
        return issue.message;
    }
  });
};
