"use client";

import Image from "next/image";
import React, { useState } from "react";
import styles from "./nav.module.css";

import { HiMenu } from "react-icons/hi";
import { TbShoppingBag } from "react-icons/tb";

import logo from "@/assets/logos/logo-ecolmmers.png";
import { useMediaQuery } from "react-responsive";
import Dropdown from "./dropdown/DropDown";
import { useGlobalContext } from "@/context/useSession";
import DropdownProfile from "./dropdown/DropDownProfile";
import Modal from "../modals/modal";
import useUserCarts from "@/hooks/userCarts";

import { Cart, User } from "@/types/user";
import CartCount from "../modals/styles/content/CartCount";

function PrincipalNavBar() {
  const isResponsive = useMediaQuery({ minWidth: 800 });
  const { user, cartState } = useGlobalContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userId = user?.id;
  const { userCarts, loading, error } = useUserCarts(userId);

  return (
    <>
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
                <div
                  className={styles.cartWarnBox}
                  onClick={() => setIsModalOpen(true)}
                >
                  <div className={styles.boxIconCart}>
                    <TbShoppingBag size={25} />
                  </div>
                  <p className={styles.countCart}>{cartState}</p>
                </div>
                <DropdownProfile
                  label={user?.firstName ? user.firstName : "cuenta"}
                  options={[user ? `${user.firstName}` : "cuenta"]}
                  avatar={user?.avatar}
                />
              </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <p>Contenido de prueba</p>
            </Modal>
          </>
        ) : (
          <>
            <div className={styles.boxMenuResponsive}>
              <div
                className={styles.cartWarnBox}
                onClick={() => setIsModalOpen(true)}
              >
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
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <p></p>
        <div>
          <CartCount />
        </div>
        <div className={styles.listProductsCart}></div>
      </Modal>
    </>
  );
}

export default PrincipalNavBar;
