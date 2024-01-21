import React, { useState } from "react";
import styles from "./styles.module.css";

import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { FaShoppingBasket } from "react-icons/fa";
import { FaShop } from "react-icons/fa6";
import { IoIosArrowRoundForward } from "react-icons/io";
import { RiSettings4Fill } from "react-icons/ri";
import { TbBusinessplan, TbShoppingCartFilled } from "react-icons/tb";

function ComercioBtnNav() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenSubMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={styles.btn}>
        <div className={styles.subBtn}>
          <div className={styles.logoBtn}>
            <div className={styles.boxIconBtn}>
              <FaShoppingBasket size={13} className={styles.iconBtn} />
            </div>
            <p className={styles.infoTextBtn}>Crea tu tienda</p>
          </div>
          <div className={styles.btnChevron}>
            <IoIosArrowRoundForward className={styles.iconChevron} />
          </div>
        </div>

        <div className={styles.subBtn} onClick={handleOpenSubMenu}>
          <div className={styles.logoBtn}>
            <div className={styles.boxIconBtn}>
              <RiSettings4Fill size={13} className={styles.iconBtn} />
            </div>
            <p className={styles.infoTextBtn}>Administra tus tiendas</p>
          </div>
          <div className={styles.btnChevron}>
            {!isOpen ? (
              <GoChevronDown className={styles.iconChevron} />
            ) : (
              <GoChevronUp className={styles.iconChevron} />
            )}
          </div>
        </div>

        {isOpen ? (
          <>
            <div className={styles.subBtn}>
              <div className={styles.logoBtn}>
                <div className={styles.boxIconBtn}>
                  <FaShop size={13} className={styles.iconBtn} />
                </div>
                <p className={styles.infoTextBtn}>Tiendas</p>
              </div>
              <div className={styles.btnChevron}>
                <IoIosArrowRoundForward className={styles.iconChevron} />
              </div>
            </div>

            <div className={styles.subBtn}>
              <div className={styles.logoBtn}>
                <div className={styles.boxIconBtn}>
                  <TbShoppingCartFilled size={13} className={styles.iconBtn} />
                </div>
                <p className={styles.infoTextBtn}>Productos</p>
              </div>
              <div className={styles.btnChevron}>
                <IoIosArrowRoundForward className={styles.iconChevron} />
              </div>
            </div>

            <div className={styles.subBtn}>
              <div className={styles.logoBtn}>
                <div className={styles.boxIconBtn}>
                  <TbBusinessplan size={13} className={styles.iconBtn} />
                </div>
                <p className={styles.infoTextBtn}>Pagos</p>
              </div>
              <div className={styles.btnChevron}>
                <IoIosArrowRoundForward className={styles.iconChevron} />
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}

export default ComercioBtnNav;
