import React, { useState, useEffect } from "react";
import Map from "../../components/maps/Map";
import SidenavPane from "../../components/sidenav_pane/sidenav_pane";
import CertificacionesSideNav from "../../components/certificaciones_sidenav/certificaciones_sidenav_screen";
import DataAnalysisCertificaciones from "../../components/data_analisis_certificaciones/data_analisis_certificaciones_screen";
import { useLocation } from "react-router-dom";

const Certificaciones: React.FC = () => {
  const [data, setData] = useState<any>(undefined);
  const [isDataAnalysisCertificacionesOpen, setIsDataAnalysisCertificaciones] =
    useState<boolean>(false); // Initially closed
  const location = useLocation();

  useEffect(() => {
    // Open the component only if the current route is for Certificaciones
    if (location.pathname.includes("certificaciones")) {
      setIsDataAnalysisCertificaciones(true);
    } else {
      setIsDataAnalysisCertificaciones(false);
    }
  }, [location]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await import("../../data/programas/certificaciones.json");
        setData(data.default[1].certificaciones); // Set the loaded data to the state
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, []);

  return (
    <div id="map">
      <SidenavPane activePane={"1"} paneId={"1"}>
        <CertificacionesSideNav />
      </SidenavPane>
      <Map />
      <DataAnalysisCertificaciones
        isOpen={isDataAnalysisCertificacionesOpen}
        data={data}
      />
    </div>
  );
};

export default Certificaciones;
