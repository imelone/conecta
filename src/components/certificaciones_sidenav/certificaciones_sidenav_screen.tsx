// TreeListMenu.jsx
import React from "react";
import styles from "./styles.module.css";
import sectionMainImg from "/assets/sections_menu_main/certificaciones_main.png";

const CertificacionesSideNav: React.FC<any> = () => {
  return (
    <div>
      <h3 style={{ marginBottom: "1rem", textAlign: "center" }}>
        CERTIFICACIONES
      </h3>
      <div className={styles.logoContainer}>
        {sectionMainImg && (
          <img
            src={sectionMainImg}
            alt="Logo"
            className="sidebar-logo-image"
            width={300}
            height={300}
          />
        )}
      </div>
    </div>
  );
};

export default CertificacionesSideNav;
