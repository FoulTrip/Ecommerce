import UserService from "@/classes/Users";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { id }: { id: string } = await req.json();

  try {
    const getUser = await UserService.get(id);

    if (!getUser) {
      throw new Error("Error al encontrar usuario");
    }
    return NextResponse.json(getUser);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }
  }
}
