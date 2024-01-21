import ProductService from "@/classes/Products";
import { ScalarProduct } from "@/types/user";
import { NextResponse } from "next/server";

/**
 * Función para manejar las solicitudes POST para crear un nuevo producto.
 *
 * @param req - Se espera que sea un objeto JSON que contenga los campos correspondientes al producto.
 *
 * @returns - Si la creación del producto es exitosa, la respuesta será un objeto JSON que representa al nuevo producto. Si ocurre un error, la respuesta será un objeto JSON que contiene un mensaje de error.
 */
export async function POST(req: Request) {
  try {
    // Desestructuramos los campos necesarios del cuerpo de la solicitud
    const {
      name,
      description,
      price,
      images,
      sku,
      brand,
      category,
      stock,
      dimensions,
      weight,
      materials,
      tags,
    }: ScalarProduct = await req.json();

    // Puedes realizar validaciones adicionales aquí según tus requisitos

    // Creamos un nuevo producto utilizando el servicio de productos
    const newProduct = await ProductService.create({
      name,
      description,
      price,
      sku,
      brand,
      category,
      stock,
      dimensions,
      weight,
      materials,
      tags,
      images, // Aquí puedes proporcionar las imágenes correspondientes si las tienes
    });

    // Si todo va bien, devolvemos una respuesta con el nuevo producto en formato JSON
    return NextResponse.json(newProduct);
  } catch (error) {
    // Si algo sale mal, devolvemos una respuesta con un mensaje de error en formato JSON
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }
    // Puedes manejar otros tipos de errores aquí si es necesario
  }
}
