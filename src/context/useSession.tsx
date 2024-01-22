"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { PrismaClient, User as PrismaUser } from "@prisma/client";
import axios from "axios";
import { ScalarUser, ScalarCart } from "@/types/user";

interface GlobalContextType {
  user: ScalarUser | null;
  cart: ScalarCart[] | null;
  setUserData: (userData: ScalarUser | null) => void;
  setCartData: (cartData: ScalarCart[] | null) => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export function GlobalProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<ScalarUser | null>(null);
  const [cartState, setCartState] = useState<ScalarCart[] | null>([]);
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
    const fetchUserData = async () => {
      try {
        if (user?.id) {
          const userData = await axios.post("/api/user/get", { id: user.id });

          const data: ScalarUser = userData.data;

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

    fetchUserData();
  }, [user, prisma]);

  const setUserData = (userData: ScalarUser | null) => {
    setUser(userData);

    if (userData) {
      Cookies.set("userData", JSON.stringify(userData), { expires: 7 });
    } else {
      Cookies.remove("userData");
    }
  };

  const setCartData = (cartData: ScalarCart[] | null) => {
    setCartData(cartData);

    if (cartData) {
      Cookies.set("cartData", JSON.stringify(cartData), { expires: 7 });
    } else {
      Cookies.remove("cartData");
    }
  };

  return (
    <GlobalContext.Provider value={{ user, setUserData, cartState, setCartState }}>
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
