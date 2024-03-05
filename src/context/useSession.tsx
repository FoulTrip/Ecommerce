"use client";

import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import Cookies from "js-cookie";
import { PrismaClient, User as PrismaUser } from "@prisma/client";
import axios from "axios";
import { UserLoggin, ScalarUser, ScalarCart } from "@/types/user";

interface GlobalContextType {
  user: UserLoggin | null;
  setUser: React.Dispatch<React.SetStateAction<UserLoggin | null>>;
  cartState: number | null;
  setCartState: React.Dispatch<React.SetStateAction<number | null>>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export function GlobalProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserLoggin | null>(null);
  const [cartState, setCartState] = useState<number | null>(null);
  const prisma = new PrismaClient();

  useEffect(() => {
    const userDataFromCookie = Cookies.get("userData");

    if (userDataFromCookie) {
      const parsedUserData = JSON.parse(userDataFromCookie) as PrismaUser;
      setUser({
        id: parsedUserData.id,
        email: parsedUserData.email,
        role: parsedUserData.role,
        avatar: parsedUserData.avatar,
        firstName: parsedUserData.firstName as string,
        lastName: parsedUserData.lastName as string,
      });
    }
  }, []);

  useEffect(() => {
    if (user) {
      Cookies.set("userData", JSON.stringify(user), { expires: 7 });
    }
  }, [user]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (user?.id) {
          const userData = await axios.post("/api/user/get", { id: user.id });

          const data: UserLoggin = userData.data;

          console.log("axios UseGlobal: ", data);

          // Comprobar si la información del usuario ha cambiado antes de actualizar el estado
          if (
            data.id !== user.id ||
            data.email !== user.email ||
            data.role !== user.role ||
            data.avatar !== user.avatar ||
            data.firstName !== user.firstName ||
            data.lastName !== user.lastName
          ) {
            setUser({
              id: data.id as string,
              email: data.email,
              role: data.role,
              avatar: data.avatar,
              firstName: data.firstName as string,
              lastName: data.lastName as string,
            });
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchCartData = async () => {
      try {
        if (user?.id) {
          const cartData = await axios.post("/api/cart/byuser", {
            userId: user.id,
          });

          // Supongamos que el servidor devuelve un objeto con propiedades que son arreglos.
          const data: Record<string, any> = cartData.data;

          // Obtén las claves (propiedades) del objeto y cuenta cuántas hay.
          const numberOfArrays: number = Object.keys(data).length;

          console.log("axios UseGlobal cart: ", numberOfArrays);

          setCartState(numberOfArrays);
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchUserData();
    fetchCartData();
  }, [user, prisma]);

  return (
    <GlobalContext.Provider value={{ user, setUser, cartState, setCartState }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
}
