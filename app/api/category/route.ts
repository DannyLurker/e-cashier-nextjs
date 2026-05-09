import categoryService from "@/features/category/category.service";
import {
  handleError,
  printConsoleError,
} from "@/shared/lib/error-handlers/handleError";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const result = await categoryService.create(data);

    return Response.json(
      {
        message: result.message,
      },
      { status: 201 },
    );
  } catch (error) {
    printConsoleError(error, "POST", request.url);
    return handleError(error);
  }
}

export async function PATCH(request: Request) {
  try {
    const data = await request.json();
    const result = await categoryService.update(data);

    return Response.json(
      {
        message: result.message,
      },
      { status: 200 },
    );
  } catch (error) {
    printConsoleError(error, "PATCH", request.url);
    return handleError(error);
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const data = Object.fromEntries(searchParams.entries());

    const result = await categoryService.getMany(data);

    return Response.json(
      {
        message: result.message,
        categories: result.categories,
      },
      { status: 200 },
    );
  } catch (error) {
    printConsoleError(error, "GET", req.url);
    return handleError(error);
  }
}
