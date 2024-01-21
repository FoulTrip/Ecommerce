import UserService from "@/classes/Users";
import { ScalarUser } from "@/types/user";
import { NextResponse } from "next/server";

/**
 * Función para manejar las solicitudes PUT para actualizar un usuario existente.
 *
 * @param req - Se espera que sea un objeto JSON que contenga los campos { id, email, password, firstName, lastName }
 *
 * @returns - Si la actualización del usuario es exitosa, la respuesta será un objeto JSON que representa al usuario actualizado. Si ocurre un error, la respuesta será un objeto JSON que contiene un mensaje de error.
 */
export async function PUT(req: Request) {
  try {
    // Desestructuramos los campos necesarios del cuerpo de la solicitud
    const { id, email, firstName, lastName, avatar }: ScalarUser =
      await req.json();

    if (!id) {
      throw new Error("El ID del usuario no se proporcionó");
    }

    // Actualizamos el usuario utilizando el servicio de usuario
    const updatedUser = await UserService.update(id, {
      email,
      firstName,
      lastName,
      role: "USER",
      avatar
    });

    // Si todo va bien, devolvemos una respuesta con el usuario actualizado en formato JSON
    return NextResponse.json(updatedUser);
  } catch (error) {
    // Si algo sale mal, devolvemos una respuesta con un mensaje de error en formato JSON
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }
  }
}
