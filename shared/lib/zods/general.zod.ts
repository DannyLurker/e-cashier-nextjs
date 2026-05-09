import z from "zod";

export const page = z.coerce.number().min(0).default(0);
export const dataPerPage = z.coerce.number().min(10).default(10);

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
