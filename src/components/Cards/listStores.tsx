"use client";

import { useGlobalContext } from "@/context/useSession";
import React, { useState } from "react";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { STORES_BY_ID } from "@/graphql/queries";

import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import ListProducts from "./listProducts";
import { IStore } from "@/model/User";

function ListStores() {
  const { user } = useGlobalContext();
  const [chevron, setChevron] = useState(false);

  const openChevron = () => {
    setChevron(!chevron);
  };

  const { data, error, loading } = useQuery(STORES_BY_ID, {
    variables: {
      userId: user?.id,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : </p>;
  
  if (data) {
    return (
      <>
        <div>
          {data.storesById.map((store: IStore) => (
            <div key={store.id}>
              <p>Name Store: {store.name}</p>
              <div>
                <div onClick={openChevron}>
                  {chevron ? <FiChevronDown /> : <FiChevronUp />}
                </div>
              </div>
              {chevron ? <ListProducts storeId={store.id} /> : null}
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default ListStores;
