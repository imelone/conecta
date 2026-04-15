import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Map from "../../components/maps/Map";
import { useLocation } from "react-router-dom";
import DataAnalysisAulaVerde from "../../components/data_analisis_aula_verde/data_analisis_aula_verde_screen";
import SidenavPane from "../../components/sidenav_pane/sidenav_pane";
import sectionMainImg from "/assets/images/sections_menu_main/aula_verde_main.jpg";

const logoContainer = { textAlign: 'center', margin: '0 auto' } as const;
const descriptionContainer = {
  textAlign: 'left', fontSize: '1rem', lineHeight: 1.6,
  color: 'black', marginBottom: '1.5rem', padding: '1rem 1.4rem',
} as const;
const sidebarLogoImage: React.CSSProperties = { width: '100%', maxWidth: '260px', height: 'auto', objectFit: 'contain', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.12)' };

const AulaVerde: React.FC = () => {
  const [data, setData] = useState<any>(undefined);
  const [description, setDescription] = useState<any>(undefined);
  const [isDataAnalysisAulaVerdeOpen, setIsDataAnalysisAulaVerdeOpen] =
    useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("aula-verde")) {
      setIsDataAnalysisAulaVerdeOpen(true);
    } else {
      setIsDataAnalysisAulaVerdeOpen(false);
    }
  }, [location]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await import("../../data/programas/aula-verde.json");
        setData(data.default[1].certificaciones);
        setDescription(data.default[0].descripcion);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, []);

  return (
    <div id="map">
      <SidenavPane activePane={"1"} paneId={"1"}>
        <h3 style={{ marginBottom: "1rem", textAlign: "center" }}>
          AULA VERDE
        </h3>
        <Box sx={logoContainer}>
          {sectionMainImg && (
            <img
              src={sectionMainImg}
              alt="Logo"
              style={sidebarLogoImage}
            />
          )}
        </Box>
        <Box
          sx={descriptionContainer}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </SidenavPane>
      <Map />
      <DataAnalysisAulaVerde isOpen={isDataAnalysisAulaVerdeOpen} data={data} />
    </div>
  );
};

export default AulaVerde;
