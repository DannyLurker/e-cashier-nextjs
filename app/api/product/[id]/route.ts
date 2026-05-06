import productService from "@/features/products/product.service";
import {
  handleError,
  printConsoleError,
} from "@/shared/lib/error-handlers/handleError";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ productId: string }> },
) {
  try {
    const { productId } = await params;

    const result = await productService.delete(productId);

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
