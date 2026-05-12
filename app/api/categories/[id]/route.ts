import categoryService from "@/features/category/category.service";
import {
  handleError,
  printConsoleError,
} from "@/shared/lib/error-handlers/handleError";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const result = await categoryService.delete(id);

    return Response.json(
      {
        message: result.message,
      },
      { status: 200 },
    );
  } catch (error) {
    printConsoleError(error, "DELETE", request.url);
    return handleError(error);
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const { searchParams } = new URL(request.url);

    const data = Object.fromEntries(searchParams.entries());

    const result = await categoryService.get(id, data);

    return Response.json(
      {
        message: result.message,
        category: result.category,
      },
      { status: 200 },
    );
  } catch (error) {
    printConsoleError(error, "GET", request.url);
    return handleError(error);
  }
}
