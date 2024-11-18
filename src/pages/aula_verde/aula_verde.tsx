import React, { useState, useEffect } from "react";
import Map from "../../components/maps/Map";
import { useLocation } from "react-router-dom";
import DataAnalysisAulaVerde from "../../components/data_analisis_aula_verde/data_analisis_aula_verde_screen";
import SidenavPane from "../../components/sidenav_pane/sidenav_pane";
import sectionMainImg from "/assets/images/sections_menu_main/aula_verde_main.jpg";
import styles from "./aula_verde_styles.module.css";

const AulaVerde: React.FC = () => {
  const [data, setData] = useState<any>(undefined);
  const [description, setDescription] = useState<any>(undefined);
  const [isDataAnalysisAulaVerdeOpen, setIsDataAnalysisAulaVerdeOpen] =
    useState<boolean>(false); // Initially closed
  const location = useLocation();

  useEffect(() => {
    // Open the component only if the current route is for Certificaciones
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
        setData(data.default[1].certificaciones); // Set the loaded data to the state
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
        <div
          className={styles.descriptionContainer}
          dangerouslySetInnerHTML={{ __html: description }}
        ></div>
      </SidenavPane>
      <Map />
      <DataAnalysisAulaVerde isOpen={isDataAnalysisAulaVerdeOpen} data={data} />
    </div>
  );
};

export default AulaVerde;
