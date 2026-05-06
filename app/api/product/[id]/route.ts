import productService from "@/features/products/product.service";
import {
  handleError,
  printConsoleError,
} from "@/shared/lib/error-handlers/handleError";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const result = await productService.delete(id);

    return Response.json(
      {
        message: result.message,
      },
      { status: 200 },
    );
  } catch (error) {
    printConsoleError(error, "DELETE", req.url);
    return handleError(error);
  }
}
