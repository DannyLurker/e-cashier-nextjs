import { ZodError } from "zod/v3";
import AppError from "./AppError";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import prismaErrorCode from "./prisma-error-code";

export function handleError(error: unknown) {
  console.error("[API_ERROR]", {
    type: error instanceof Error ? error.name : "Unknown",
    message: error,
  });

  if (error instanceof PrismaClientKnownRequestError) {
    const prismaError = error as { code: string };
    if (prismaError.code === prismaErrorCode.notFound) {
      return Response.json({ message: "Data not found" }, { status: 404 });
    }

    if (prismaError.code === prismaErrorCode.uniqueConstraintFailed) {
      return Response.json({ message: "Data is duplicate" }, { status: 404 });
    }
  }

  if (error instanceof ZodError) {
    return Response.json(
      {
        message: "Validation failed",
        errors: error.errors.map((e) => ({
          field: e.path.join(", "),
          message: e.message,
        })),
      },
      { status: 400 },
    );
  }

  // 2. Custom AppError
  if (error instanceof AppError) {
    return Response.json(
      { message: error.message },
      { status: error.statusCode },
    );
  }

  // 3. Unknown error
  return Response.json(
    {
      code: "INTERNAL_SERVER_ERROR",
      message: "Internal server error",
    },
    { status: 500 },
  );
}

type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

export function printConsoleError(
  error: unknown,
  httpMethod: HttpMethod,
  apiUrl: string,
) {
  console.error("API_ERROR", {
    route: `(${httpMethod}) ${apiUrl}`,
    message: error instanceof Error ? error.message : String(error),
  });
}
