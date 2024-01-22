// Dropdown.tsx
import React, { useState, ReactNode } from "react";
import PropTypes from "prop-types";
import styles from "./profiledrop.module.css";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import ComercioBtnNav from "./contents/comercio";
import MarketingBtnNav from "./contents/marketing";
import RecursosBtnNav from "./contents/recursos";
import { HiMiniUserCircle } from "react-icons/hi2";
import Avatar from "react-avatar";
import { useGlobalContext } from "@/context/useSession";

interface DropdownProps {
  label: string;
  avatar: string | undefined;
  options: ReactNode[];
}

const DropdownProfile: React.FC<DropdownProps> = ({
  label,
  options,
  avatar,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useGlobalContext();

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
          <div className={styles.boxImageUser}>
            {avatar ? (
              <Avatar src={avatar} size="30" round={true} />
            ) : (
              <HiMiniUserCircle className={styles.miniCircleIcon} size={25} />
            )}
          </div>
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
              {option == "cuenta" ? <ComercioBtnNav /> : null}
              {option == user?.firstName ? <ComercioBtnNav /> : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

DropdownProfile.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default DropdownProfile;
