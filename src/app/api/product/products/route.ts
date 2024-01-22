import ProductService from "@/classes/Products";
import { ScalarProduct } from "@/types/user";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await ProductService.getAll();
    return NextResponse.json(products);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}
