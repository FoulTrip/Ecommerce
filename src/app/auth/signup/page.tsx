"use client";

import React, { FormEvent, useState } from "react";
import { useMutation } from "@apollo/client";
import { Toaster, toast } from "sonner";
import styles from "./forms.module.css";
import { CREATE_USER } from "@/graphql/mutations"; // Importa la mutación correspondiente

function Signup() {
  const [createUser] = useMutation(CREATE_USER);

  const [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    isAdmin: false as boolean,
    isSeller: false as boolean,
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

      // Utiliza la mutación de Apollo Client
      const response = await createUser({
        variables: {
          name: data.name,
          username: data.username,
          email: data.email,
          password: data.password,
          isAdmin: data.isAdmin,
          isSeller: data.isSeller,
        },
      });

      // Accede a los datos desde response.data
      toast.success("Registrado con exito");

      setTimeout(() => {
        if (typeof window !== "undefined") {
          window.location.href = "/";
        }
      }, 3000);
    } catch (error) {
      // Maneja el error de manera adecuada
      console.log(error);
      toast.error("Failed registration");
    }
  };

  return (
    <>
      <Toaster richColors />
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="name"
          onChange={handleChange}
          value={data.name}
          className={styles.inputForm}
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          value={data.username}
          className={styles.inputForm}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={data.password}
          className={styles.inputForm}
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
          className={styles.inputForm}
        />

        <div className={styles.boxBtn}>
          <input className={styles.realBtn} type="submit" value="Registrar" />
        </div>
      </form>
    </>
  );
}

export default Signup;
