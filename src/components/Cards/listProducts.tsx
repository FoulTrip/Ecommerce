import { useGlobalContext } from "@/context/useSession";
import React, { useEffect } from "react";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { PRODUCTS_BY_ID } from "@/graphql/queries";

interface listProps {
  storeId: string;
}

function ListProducts({ storeId }: listProps) {
  const { user } = useGlobalContext();

  if (user) {
    const { data, error, loading } = useQuery(PRODUCTS_BY_ID, {
      variables: {
        storeId: storeId,
      },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : </p>;

    if (data) {
      return (
        <>
          <div>
            {data &&
              data.productsById &&
              data.productsById.map((product: any) => (
                <div key={product.id}>
                  <p>Name: {product.name}</p>
                  <p>Description: {product.description}</p>
                  <p>StoreId: {product.storeId}</p>
                  <p>Creado: {product.createdAt}</p>
                  <p>Category: {product.category}</p>
                  <p>Count In Stock: {product.countInStock}</p>
                </div>
              ))}
          </div>
        </>
      );
    }
  }
}

export default ListProducts;
