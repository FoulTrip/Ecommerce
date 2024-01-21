import CartService from "@/classes/Cart";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const { id }: { id: string } = await req.json();

    if (!id || typeof id !== "string") {
      return NextResponse.json(
        { message: "ID de carrito no válido" },
        { status: 400 }
      );
    }

    const deletedCart = await CartService.delete(id);

    return NextResponse.json(deletedCart);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }
  }
}
