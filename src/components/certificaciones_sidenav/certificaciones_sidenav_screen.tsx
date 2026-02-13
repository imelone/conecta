import React from "react";
import { Box } from "@mui/material";
import sectionMainImg from "/assets/sections_menu_main/certificaciones_main.png";
import { logoContainer, sidebarLogoImage } from "./certificaciones_sidenav_styles";

const CertificacionesSideNav: React.FC<any> = () => {
  return (
    <div>
      <h3 style={{ marginBottom: "1rem", textAlign: "center" }}>
        CERTIFICACIONES
      </h3>
      <Box sx={logoContainer}>
        {sectionMainImg && (
          <img
            src={sectionMainImg}
            alt="Logo"
            style={sidebarLogoImage}
            width={300}
            height={300}
          />
        )}
      </Box>
    </div>
  );
};

export default CertificacionesSideNav;
