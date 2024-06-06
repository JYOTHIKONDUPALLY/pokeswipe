import React from "react";
import styles from "./Header.module.css";
import logo from "../../images/pokemon.png";

const Header = ({ like }) => {
  const handleButton = () => {
    like();
  };

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img src={logo} alt="logo" />
        <span>
          Pokemon<span style={{ color: "yellow" }}>Swipe</span>
        </span>
      </div>
      <div className={styles.btn} onClick={handleButton}>
        <i
          className="fa fa-heart"
          style={{
            color: "red",
            fontSize: "32px",
            position: "absolute",
            right: "50px",
          }}
        ></i>
      </div>
    </div>
  );
};

export default Header;
