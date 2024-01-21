import OrderService from "@/classes/Orders";
import { ScalarOrder } from "@/types/user";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data: ScalarOrder = await req.json();
    const newOrder = await OrderService.create(data);
    return NextResponse.json(newOrder);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: "Error inesperado" }, { status: 500 });
  }
}
