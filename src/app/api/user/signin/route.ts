// Importar las dependencias necesarias
import UserService from "@/classes/Users";
import TokenService from "@/classes/Token";
import { ScalarUser } from "@/types/user";
import { NextResponse } from "next/server";

/**
 * Función para manejar las solicitudes POST para iniciar sesión.
 *
 * @param req - Se espera que sea un objeto JSON que contenga los campos { email, password }
 *
 * @returns - Si el inicio de sesión es exitoso, la respuesta será un objeto JSON que contiene el token JWT. Si ocurre un error, la respuesta será un objeto JSON que contiene un mensaje de error.
 */
export async function POST(req: Request) {
  try {
    // Desestructuramos los campos necesarios del cuerpo de la solicitud
    const { email, password }: ScalarUser = await req.json();

    // Verificamos si el usuario existe y las credenciales son correctas
    const user = await UserService.signin(email, password);

    // Creamos un token JWT con la información del usuario
    const payload = { userId: user.id, userEmail: user.email };
    const secret = process.env.JWT_SECRET as string;
    const token = TokenService.createToken(payload, secret);

    // Devolvemos el token en formato JSON
    return NextResponse.json({ ...user, token });
  } catch (error) {
    // Si algo sale mal, devolvemos una respuesta con un mensaje de error en formato JSON
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }
  }
}
