import OrderService from "@/classes/Orders";
import { NextResponse } from "next/server";

export async function getOrderById(req: Request) {
  try {
    const { id }: { id: string } = await req.json();
    if (!id) {
      return NextResponse.json(
        { message: "Se requiere el parámetro 'id'" },
        { status: 400 }
      );
    }

    const order = await OrderService.get(id);
    
    if (!order) {
      return NextResponse.json(
        { message: "Pedido no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(order);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: "Error inesperado" }, { status: 500 });
  }
}
