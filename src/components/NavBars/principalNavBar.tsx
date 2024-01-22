"use client";

import Image from "next/image";
import React from "react";
import styles from "./nav.module.css";

import { HiMenu } from "react-icons/hi";
import { TbShoppingBag } from "react-icons/tb";

import logo from "@/assets/logos/logo-ecolmmers.png";
import { useMediaQuery } from "react-responsive";
import Dropdown from "./dropdown/DropDown";
import { useGlobalContext } from "@/context/useSession";
import DropdownProfile from "./dropdown/DropDownProfile";

function PrincipalNavBar() {
  const isResponsive = useMediaQuery({ minWidth: 800 });
  const { user, cart } = useGlobalContext();
  const countCart = cart ? cart.length : 0;

  return (
    <nav className={styles.nav}>
      <div className={styles.boxLogo}>
        <div className={styles.boxImageLogo}>
          <Image className={styles.logo} src={logo} alt="logo" />
        </div>
        <p className={styles.textLogo}>Colmmerce</p>
      </div>
      {isResponsive ? (
        <>
          <div className={styles.barOptions}>
            <div className={styles.centerOptions}>
              <Dropdown label="Comercio" options={["comercio"]} />
              <Dropdown label="Marketing" options={["marketing"]} />
              <Dropdown label="Recursos" options={["recursos"]} />
            </div>
          </div>
          <div className={styles.barAccount}>
            <div className={styles.optAccount}>
              <div className={styles.cartWarnBox}>
                <div className={styles.boxIconCart}>
                  <TbShoppingBag size={25} />
                </div>
                <p className={styles.countCart}>{countCart}</p>
              </div>
              <DropdownProfile
                label={user?.firstName ? user.firstName : "cuenta"}
                options={[user ? `${user.firstName}` : "cuenta"]}
                avatar={user?.avatar}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.boxMenuResponsive}>
            <div className={styles.cartWarnBox}>
              <div className={styles.boxIconCart}>
                <TbShoppingBag size={25} />
              </div>
              <p className={styles.countCart}></p>
            </div>
            <div className={styles.boxMenuIconResponsive}>
              <HiMenu size={25} />
            </div>
          </div>
        </>
      )}
    </nav>
  );
}

export default PrincipalNavBar;
