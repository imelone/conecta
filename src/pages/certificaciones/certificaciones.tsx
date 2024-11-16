import React, { useState, useEffect } from "react";
import Map from "../../components/maps/Map";
import SidenavPane from "../../components/sidenav_pane/sidenav_pane";
import CertificacionesSideNav from "../../components/certificaciones_sidenav/certificaciones_sidenav_screen";
import DataAnalysisCertificaciones from "../../components/data_analisis_certificaciones/data_analisis_certificaciones_screen";

const Certificaciones: React.FC = () => {
  // State to store the data loaded from the JSON file
  const [data, setData] = useState<any>(undefined);

  // Load the JSON data asynchronously when the component mounts
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
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <div id="map">
      <SidenavPane activePane={"1"} paneId={"1"}>
        <CertificacionesSideNav />
      </SidenavPane>
      <Map />
      <DataAnalysisCertificaciones isOpen={true} data={data} />
    </div>
  );
};

export default Certificaciones;
