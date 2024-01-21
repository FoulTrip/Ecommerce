import CartService from "@/classes/Cart";
import { ScalarCart } from "@/types/user";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const { id }: { id: string } = await req.json();
    const { quantity, userId, productId }: ScalarCart = await req.json();

    if (!id || typeof id !== "string") {
      return NextResponse.json(
        { message: "ID de carrito no válido" },
        { status: 400 }
      );
    }

    const updatedCart = await CartService.update(id, {
      quantity,
      userId,
      productId,
    });

    return NextResponse.json(updatedCart);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }
  }
}
