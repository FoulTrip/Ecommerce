"use client";

import React, { useState, useEffect } from "react";
import styles from "./styles/banners.module.css";
import Image from "next/image";

import bannerExample01 from "@/assets/banners/example01.png";
import bannerExample02 from "@/assets/banners/example02.png";

const images = [bannerExample01, bannerExample02];

function BannersHeroinSection() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((currentImage + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [currentImage]);

  return (
    <>
      <div className={styles.bannersContainer}>
        <Image
          src={images[currentImage]}
          className={styles.bannerImg}
          alt={`banner${currentImage + 1}`}
        />
        <div className={styles.carouselNavigation}>
          {images.map((_, idx) => (
            <div
              key={idx}
              className={`${styles.navItem} ${
                idx === currentImage ? styles.activeNavItem : ""
              }`}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default BannersHeroinSection;
