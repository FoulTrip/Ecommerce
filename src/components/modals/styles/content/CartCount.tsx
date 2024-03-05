"use client";

import { useGlobalContext } from "@/context/useSession";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ScalarCart } from "@/types/user";
import CartProduct from "@/components/subCards/cartProduct";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import styles from "./cartCount.module.css";

function CartCount() {
  const { user, setCartState } = useGlobalContext();
  const userId = user?.id as string;

  const [itemsCart, setItemsCart] = useState<ScalarCart[]>([]);
  const [productDetails, setProductDetails] = useState<any[]>([]);
  const [totalAllProducts, setTotalAllProducts] = useState<number>(0);

  useEffect(() => {
    const getCards = async () => {
      try {
        const response = await axios.post("/api/cart/byuser", { userId });
        const data: ScalarCart[] = response.data;
        setItemsCart(data);
        setCartState(data.length);
      } catch (error) {
        console.error("Error al obtener carritos:", error);
      }
    };

    getCards();
  }, [userId]);

  useEffect(() => {
    const productDetailsMap = itemsCart.reduce((map, item) => {
      const productId = item.productId;
      const quantity = item.quantity || 0;
      map.set(productId, (map.get(productId) || 0) + quantity);
      return map;
    }, new Map<string, number>());

    const productIds = Array.from(productDetailsMap.keys());

    if (productIds.length > 0) {
      getProductDetails(productIds, productDetailsMap);
    }
  }, [itemsCart]);

  const getProductDetails = async (
    productIds: string[],
    productDetailsMap: Map<string, number>
  ) => {
    try {
      const response = await axios.post("/api/product/get", { id: productIds });
      const details = response.data.map((product: any) => ({
        id: product.id,
        price: product.price || 0, // Asegúrate de que esta línea refleje cómo se llama el precio en la respuesta de tu API
        quantity: productDetailsMap.get(product.id) || 0,
      }));

      setProductDetails(details);

      const total: number = details.reduce(
        (acc: number, product: any) => acc + product.price * product.quantity,
        0
      );

      setTotalAllProducts(total);
    } catch (error) {
      console.error("Error al obtener detalles de productos:", error);
    }
  };

  return (
    <>
      <h3>Tus Productos</h3>
      <div>
        {itemsCart.length > 0 ? (
          itemsCart.map((item: ScalarCart) => (
            <div key={item.id}>
              <CartProduct
                quantity={item.quantity}
                productId={item.productId}
              />
              <div className={styles.payBar}>
                <p>Total: {totalAllProducts.toFixed(2)}</p>
                <div className={styles.centerBanner}>
                  <PayPalScriptProvider
                    options={{
                      clientId: process.env
                        .NEXT_PUBLIC_PAYPAL_CLIENT_ID as string,
                    }}
                  >
                    <PayPalButtons
                      style={{
                        color: "blue",
                        layout: "horizontal",
                        label: "pay",
                      }}
                      createOrder={async () => {
                        const order = await axios.post("api/checkout", {
                          quantity: totalAllProducts,
                        });
                        return order.data.id;
                      }}
                      onApprove={async (data, actions) => {
                        if (actions.order) {
                          await actions.order.capture();
                        }
                      }}
                      onCancel={(data) => {
                        console.log("canceled", data);
                      }}
                    />
                  </PayPalScriptProvider>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No hay productos en el carrito.</p>
        )}
      </div>
    </>
  );
}

export default CartCount;
