import paypal from "@paypal/checkout-server-sdk";
import { NextResponse } from "next/server";

let clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string;
let clientSecret = process.env.NEXT_PUBLIC_PAYPAL_SECRET_KEY as string;

const enviroment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(enviroment);

export async function POST() {
  const request = new paypal.orders.OrdersCreateRequest();
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: "160.00",
          breakdown: {
            item_total: {
              currency_code: "USD",
              value: "160.00",
            },
            discount: {
              currency_code: "USD",
              value: "0.00",
            },
            handling: {
              currency_code: "USD",
              value: "0.00",
            },
            insurance: {
              currency_code: "USD",
              value: "0.00",
            },
            shipping_discount: {
              currency_code: "USD",
              value: "0.00",
            },
            shipping: {
              currency_code: "USD",
              value: "0.00",
            },
            tax_total: {
              currency_code: "USD",
              value: "0.00",
            },
          },
        },
        items: [
          {
            name: "Book of Rust",
            description: "A book about Rust",
            quantity: "1",
            unit_amount: {
              currency_code: "USD",
              value: "100.00",
            },
            category: "DIGITAL_GOODS",
          },
          {
            name: "Book of C++",
            description: "A book about C++",
            quantity: "1",
            unit_amount: {
              currency_code: "USD",
              value: "60.00",
            },
            category: "DIGITAL_GOODS",
          },
        ],
      },
    ],
  });

  const response = await client.execute(request);
  console.log(response.result.id);

  return NextResponse.json({ id: response.result.id });
}
