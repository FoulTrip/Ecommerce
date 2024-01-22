"use client";

import PrincipalNavBar from "@/components/NavBars/principalNavBar";
import React from "react";
import styles from "./page.module.css";
import { useGlobalContext } from "@/context/useSession";
import ListProducts from "@/components/Cards/listProducts";
import BannersHeroinSection from "@/components/carrousels/banners";
import BarFilterProducts from "@/components/Bars/BarFilterProducts";

function Home() {
  const { user } = useGlobalContext();
  console.log(user);
  return (
    <>
      <PrincipalNavBar />
      <main className={styles.heroSection}>
        <BannersHeroinSection />
        <BarFilterProducts />
        <section className={styles.boxListProducts}>
          <ListProducts />
        </section>
      </main>
    </>
  );
}

export default Home;
