import z from "zod";

export const page = z
  .string()
  .default("0")
  .transform((val) => Number(val))
  .refine((val) => Number.isInteger(val) && val >= 0, {
    message: "page must be a non-negative integer",
  });

export const sortByEnum = z.enum(["name", "price", "createdAt"]);

export const sortOrderEnum = z.enum(["asc", "desc"]);

export const generateReadableError = (issue: z.core.$ZodIssue): string => {
  const fieldName = issue.path.join(".");

  switch (issue.code) {
    case "invalid_type":
      return issue.input === undefined
        ? `${fieldName} is required`
        : `${fieldName} should be a ${issue.expected}`;
    case "too_small":
      return `${fieldName} must be at least ${issue.minimum} characters`;
    default:
      return issue.message;
  }
};
