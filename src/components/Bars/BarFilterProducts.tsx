import React from "react";
import styles from "./styles/filterbar.module.css";

import { CiSearch } from "react-icons/ci";
import { IoFilterCircleOutline } from "react-icons/io5";

function BarFilterProducts() {
  return (
    <>
      <section className={styles.Bar}>
        <div className={styles.boxInput}>
          <div className={styles.centerBoxInput}>
            <div className={styles.boxiconSearch}>
              <CiSearch size={20} />
            </div>
            <input
              className={styles.inputSearch}
              type="text"
              name="search"
              placeholder="Buscar"
            />
          </div>
        </div>
        <div className={styles.boxInput}>
          <div className={styles.centerBoxInput}>
            <div className={styles.boxiconSearch}>
              <IoFilterCircleOutline size={20} />
            </div>
            <p>Filtrar</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default BarFilterProducts;
