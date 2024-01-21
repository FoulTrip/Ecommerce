import ProductService from "@/classes/Products";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { id }: { id: string } = await req.json();
    const product = await ProductService.get(id);
    if (product) {
      return NextResponse.json(product);
    } else {
      return NextResponse.json(
        { message: "Producto no encontrado" },
        { status: 404 }
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: "Error desconocido" }, { status: 500 });
  }
}
