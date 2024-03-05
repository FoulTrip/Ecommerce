import React, { useEffect, useState } from "react";
import styles from "./styles/cartproduct.module.css";
import Image from "next/image";
import imgProduct from "@/assets/models-products/jordan1.png";
import { ScalarProduct } from "@/types/user";
import axios from "axios";

import { FaTrashAlt } from "react-icons/fa";
import { toast } from "sonner";

function CartProduct({
  productId,
  quantity,
}: {
  productId: string;
  quantity: number;
}) {
  const [product, setProduct] = useState<ScalarProduct | null>(null);
  const [isDeleted, setIsDeleted] = useState(false); // Nuevo estado

  const handleDeleteItem = async ({ id }: { id: string | undefined }) => {
    try {
      const response = await axios.delete("/api/cart/remove", { data: { id } });
      const data = response.data;
      console.log(data);

      if (data) {
        toast.success("Item Eliminado");
        setIsDeleted(true);
      } else {
        toast.error("Item no Eliminado");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message, error);
      }
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const id = productId;
        const response = await axios.post("/api/product/get", { id });
        const dataResponse = response.data;

        // Check if the response is an array
        if (Array.isArray(dataResponse)) {
          // If it's an array, consider taking the first element
          if (dataResponse.length > 0) {
            setProduct(dataResponse[0]);
          } else {
            console.error("Empty array returned from the API:", dataResponse);
          }
        } else if (typeof dataResponse === "object" && dataResponse !== null) {
          // If it's an object, consider using it directly
          setProduct(dataResponse);
        } else {
          // Handle other cases or log an error
          console.error("Unexpected API response format:", dataResponse);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return null; // or display a loading state or handle appropriately
  }

  if (!product || isDeleted) {
    // No renderiza el componente si el producto no existe o si ha sido eliminado
    return null;
  }

  return (
    <div className={styles.basepreview}>
      <div className={styles.imgProduct}>
        <Image
          className={styles.iconProducts}
          src={imgProduct}
          alt="imgProduct"
        />
      </div>
      <div className={styles.boxName}>
        <div className={styles.centerBoxName}>
          <p className={styles.nameProduct}>Name</p>
          <p>{product.name}</p>
        </div>
      </div>

      <div className={styles.boxName}>
        <div className={styles.centerBoxName}>
          <p className={styles.nameProduct}>Brand</p>
          <p>{product.brand}</p>
        </div>
      </div>

      <div className={styles.boxName}>
        <div className={styles.centerBoxName}>
          <p className={styles.nameProduct}>Quantity</p>
          <p>{quantity}</p>
        </div>
      </div>

      <div className={styles.boxName}>
        <div className={styles.centerBoxName}>
          <p className={styles.nameProduct}>Price</p>
          <p>{product.price}</p>
        </div>
      </div>

      <div className={styles.boxName}>
        <div className={styles.centerBoxName}>
          <div
            className={styles.btnDelete}
            onClick={() => handleDeleteItem({ id: product.id })}
          >
            <div className={styles.imgiconDelete}>
              <FaTrashAlt />
            </div>
            <p>Delete</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartProduct;
