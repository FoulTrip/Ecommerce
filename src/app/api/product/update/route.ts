import ProductService from "@/classes/Products";
import { ScalarProduct } from "@/types/user";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const {
      id,
      name,
      description,
      price,
      sku,
      images,
      brand,
      category,
      stock,
      dimensions,
      weight,
      materials,
      tags,
    }: ScalarProduct = await req.json();

    if (!id) {
      throw new Error("Producto no encontrado");
    }

    const updatedProduct = await ProductService.update(id, {
      name,
      description,
      price,
      sku,
      images,
      brand,
      category,
      stock,
      dimensions,
      weight,
      materials,
      tags,
    });
    return NextResponse.json(updatedProduct);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: "Error desconocido" }, { status: 500 });
  }
}
