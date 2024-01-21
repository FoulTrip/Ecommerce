"use client";

import PrincipalNavBar from "@/components/NavBars/principalNavBar";
import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import Typewriter from "typewriter-effect";

import banner from "@/assets/ilustrations/banner02.png";
import { useGlobalContext } from "@/context/useSession";

function Home() {
  const { user } = useGlobalContext();
  console.log(user)
  return (
    <>
      <PrincipalNavBar />
      <main className={styles.main}>
        <div className={styles.boxPartMain}>
          <div className={styles.centerMainPart}>
            <h1 className={styles.textDinamyc}>
              <Typewriter
                options={{
                  strings: ["VENDE", "COMPRA"],
                  autoStart: true,
                  loop: true,
                }}
              />
              DESDE LA COMODIDAD DE TU HOGAR
            </h1>
            <p className={styles.textExplainBanner}>
              Con unos simples clics, podrás crear tu propia tienda virtual y
              realizar transacciones de manera rápida y segura. Convierte tus
              ideas en realidad, todo al alcance de tu mano. ¡Explora, crea y
              vende sin límites!
            </p>
            <div className={styles.boxBtns}>
              <button className={styles.infBtnSeller}>Crear tu tienda</button>
              <button className={styles.infBtnShop}>Comienza a comprar</button>
            </div>
          </div>
        </div>
        <div className={styles.boxPartMainImage}>
          <Image className={styles.imgBanner} src={banner} alt="banner" />
        </div>
      </main>
    </>
  );
}

export default Home;
