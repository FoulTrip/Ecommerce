import ProductService from "@/classes/Products";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  const { id }: { id: string } = await req.json();

  try {
    await ProductService.delete(id);
    return NextResponse.json({ Message: "Producto eliminado" });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: "Error desconocido" }, { status: 500 });
  }
}
