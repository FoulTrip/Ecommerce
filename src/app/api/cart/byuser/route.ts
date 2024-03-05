import CartService from "@/classes/Cart";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId }: { userId: string } = await req.json();

    if (!userId || typeof userId !== "string") {
      return NextResponse.json(
        { message: "ID de carrito no válido" },
        { status: 400 }
      );
    }

    const cart = await CartService.getByUser(userId);

    if (!cart) {
      return NextResponse.json(
        { message: "Carrito no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(cart);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }
  }
}
