"use client"

import React, { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { useGlobalContext } from "@/context/useSession";
import { useRouter } from "next/navigation";
import styles from "./forms.module.css";

function Signin() {
  const { setUserData, user } = useGlobalContext();
  const route = useRouter();

  const [data, setData] = useState({
    email: "",
    password: "",
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
      const response = await axios.post("/api/user/signin", data);

      const newData = response.data;
      setUserData(newData);

      toast.success("Usuario encontrado");
    } catch (error) {
      toast.error("Failed signin");
    }
  };

  useEffect(() => {
    if (user?.id) {
      route.push("/");
    }
  }, [user, route]);

  return (
    <>
      <Toaster richColors />
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className={styles.inputForm}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className={styles.inputForm}
        />

        <div className={styles.boxBtn}>
          <input className={styles.realBtn} type="submit" value="Ingresar" />
        </div>
      </form>
    </>
  );
}

export default Signin;
