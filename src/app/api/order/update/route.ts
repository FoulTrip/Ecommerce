import OrderService from "@/classes/Orders";
import { ScalarOrder } from "@/types/user";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ message: "Se requiere el parámetro 'orderId'" }, { status: 400 });
    }

    const data: ScalarOrder = await req.json();
    const updatedOrder = await OrderService.update(id, data);

    return NextResponse.json(updatedOrder);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: "Error inesperado" }, { status: 500 });
  }
}
