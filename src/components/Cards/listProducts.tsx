import { useGlobalContext } from "@/context/useSession";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ScalarProduct } from "@/types/user";
import styles from "./styles/listProduct.module.css";

import { SiNike, SiReebok, SiCodewars, SiPuma } from "react-icons/si";
import { CgAdidas } from "react-icons/cg";
import { TbShoppingBagPlus } from "react-icons/tb";

import camisaModel from "@/assets/models-products/camisaProggramer.png";
import JordanModel from "@/assets/models-products/jordan1.png";
import Image from "next/image";
import { NextResponse } from "next/server";
import { Toaster, toast } from "sonner";

function ListProducts() {
  const { user, setCartData } = useGlobalContext();
  const [products, setProducts] = useState<ScalarProduct[]>([]);

  const handleAddCart = async ({
    productId,
  }: {
    productId: string | undefined;
  }) => {
    try {
      const response = await axios.post("/api/cart/create", {
        quantity: 2,
        userId: user?.id,
        productId: products[0].id,
      });

      if (response.data) {
        const data = response.data;
        setCartData(data);
        toast.success("Agregado al carrito");
        return NextResponse.json(data);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const getBrandIcon = (brand: string) => {
    switch (brand) {
      case "CodeWear":
        return <SiCodewars size={20} />;
      case "Nike":
        return <SiNike size={20} />;
      case "Adidas":
        return <CgAdidas size={20} />;
      case "Puma":
        return <SiPuma size={20} />;
      case "Reebok":
        return <SiReebok size={20} />;
      // Agrega más casos según las marcas que tengas
      default:
        return null; // Devuelve null si no hay un icono definido para la marca
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/product/products");
        const dataResponse = response.data;
        setProducts(dataResponse);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [user]);

  if (products) {
    return (
      <>
        <Toaster richColors />
        {products.map((product: ScalarProduct) => (
          <div key={product.id} className={styles.cardBase}>
            <div className={styles.logoBrand}>
              <div className={styles.centerLogoBrand}>
                <div className={styles.imgBrand}>
                  {getBrandIcon(product.brand)}
                </div>
                <p className={styles.nameBrand}>{product.brand}</p>
              </div>
            </div>
            <div className={styles.imgProduct}>
              <div className={styles.IconoProduct}>
                <Image
                  src={JordanModel}
                  className={styles.modelCamisa}
                  alt="model"
                />
              </div>
              <div className={styles.listColors}>
                {/* <p style={{ width: "100%", textAlign: "center" }}>Colors</p> */}
                <div className={styles.boxColorProduct}>
                  <Image
                    src={camisaModel}
                    className={styles.modelCamisaColor}
                    alt="model"
                  />
                </div>
                <div className={styles.boxColorProduct}>
                  <Image
                    src={camisaModel}
                    className={styles.modelCamisaColor}
                    alt="model"
                  />
                </div>
              </div>
            </div>
            <p className={styles.nameProduct}>{product.name}</p>
            <div className={styles.doubleRow}>
              <div className={styles.centerDoubleRow}>
                <p className={styles.textDescription}>{product.description}</p>
              </div>
            </div>
            <div className={styles.btnExplorer}>
              <div
                className={styles.agreeCart}
                onClick={() => handleAddCart({ productId: product.id })}
              >
                <div className={styles.iconAgree}>
                  <TbShoppingBagPlus />
                </div>
                <p>Agregar al carrito</p>
              </div>
              <div className={styles.viewProduct}>
                <div className={styles.iconAgree}>
                  <TbShoppingBagPlus />
                </div>
                <p>Ver producto</p>
              </div>
            </div>
            {/* <p>Count In Stock: {product.stock}</p> */}
          </div>
        ))}
      </>
    );
  } else {
    return "No hay productos";
  }

  return null;
}

export default ListProducts;
