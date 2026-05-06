import productService from "@/features/products/product.service";
import {
  handleError,
  printConsoleError,
} from "@/shared/lib/error-handlers/handleError";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const result = await productService.create(data);

    return Response.json(
      {
        message: result.message,
      },
      { status: 201 },
    );
  } catch (error) {
    printConsoleError(error, "POST", req.url);
    return handleError(error);
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const transformedParams = Object.fromEntries(searchParams.entries());

    const result = await productService.getMany(transformedParams);

    return Response.json(
      {
        message: result.message,
        products: result.products,
      },
      { status: 200 },
    );
  } catch (error) {
    printConsoleError(error, "GET", req.url);
    return handleError(error);
  }
}

export async function PATCH(req: Request) {
  try {
    const data = await req.json();

    const result = await productService.update(data);

    return Response.json(
      {
        message: result.message,
      },
      { status: 201 },
    );
  } catch (error) {
    printConsoleError(error, "PATCH", req.url);
    return handleError(error);
  }
}
