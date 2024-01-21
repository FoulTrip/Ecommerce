import OrderService from "@/classes/Orders";
import { NextResponse } from "next/server";

export async function deleteOrderById(req: Request) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json(
        { message: "Se requiere el parámetro 'orderId'" },
        { status: 400 }
      );
    }

    const deletedOrder = await OrderService.delete(id);

    return NextResponse.json(deletedOrder);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: "Error inesperado" }, { status: 500 });
  }
}
