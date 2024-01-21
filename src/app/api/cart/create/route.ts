import CartService from "@/classes/Cart";
import { ScalarCart } from "@/types/user";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { quantity, userId, productId }: ScalarCart = await req.json();

    const newCart = await CartService.create({ quantity, userId, productId });

    return NextResponse.json(newCart);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }
  }
}
