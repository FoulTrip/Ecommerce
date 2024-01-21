"use client";

import React, { FormEvent, useState } from "react";
import { Toaster, toast } from "sonner";
import styles from "./forms.module.css";
import { useGlobalContext } from "@/context/useSession";
import { useMutation } from "@apollo/client";
import { CREATE_STORE } from "@/graphql/mutations";

function CreateStores() {
  const { user } = useGlobalContext();

  const [create_store] = useMutation(CREATE_STORE);

  const [data, setData] = useState({
    user_id: user?.id,
    storeName: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      console.log(data);

      if (user?.isSeller == false) {
        toast.error("Modo vendedor esta desactivado");
      }

      if (!user) {
        toast.error("Tu session a caducado");
      }

      if (user && user.isSeller == true) {
        const response = await create_store({
          variables: {
            userId: user?.id,
            name: data.storeName,
            description: data.description,
          },
        });

        toast.success("Tienda creada con exito");
      }
    } catch (error) {
      toast.error(error as string);
    }
  };

  return (
    <>
      <Toaster richColors />
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="storeName"
          placeholder="Nombre de la tienda"
          onChange={handleChange}
          value={data.storeName}
          className={styles.inputForm}
        />

        <input
          type="text"
          name="description"
          placeholder="Descripcion"
          onChange={handleChange}
          value={data.description}
          className={styles.inputForm}
        />

        <div className={styles.boxBtn}>
          <input className={styles.realBtn} type="submit" value="Registrar" />
        </div>
      </form>
    </>
  );
}

export default CreateStores;
