import UserService from "@/classes/Users";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  const { id }: { id: string } = await req.json();

  try {
    await UserService.delete(id);
    return NextResponse.json({ message: "Usuario eliminado" });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: "Error al eliminar usuario" });
    }
  }
}
