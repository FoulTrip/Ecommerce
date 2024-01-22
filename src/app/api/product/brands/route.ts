import ProductService from "@/classes/Products";
import { ScalarProduct } from "@/types/user";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const brands = await ProductService.getBrands();
    return NextResponse.json(brands);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}
