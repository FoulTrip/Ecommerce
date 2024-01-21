// Dropdown.tsx
import React, { useState, ReactNode } from "react";
import PropTypes from "prop-types";
import styles from "./drop.module.css";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import ComercioBtnNav from "./contents/comercio";
import MarketingBtnNav from "./contents/marketing";
import RecursosBtnNav from "./contents/recursos";

interface DropdownProps {
  label: string;
  options: ReactNode[];
}

const Dropdown: React.FC<DropdownProps> = ({ label, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div
      className={styles.dropdown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className={styles.dropdownButton}>
        <div className={styles.boxInfoBtn}>
          <p className={styles.boxLabel}>{label}</p>
            <div className={styles.boxIconChevron}>
                {isOpen ? <GoChevronUp size={15} /> : <GoChevronDown size={15} />}
            </div>
        </div>
      </button>
      {isOpen && (
        <div className={styles.dropdownContent}>
          {options.map((option, index) => (
            <div key={index} className={styles.option}>
              {option == "comercio" ? <ComercioBtnNav /> : null}
              {option == "marketing" ? <MarketingBtnNav /> : null}
              {option == "recursos" ? <RecursosBtnNav /> : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default Dropdown;
