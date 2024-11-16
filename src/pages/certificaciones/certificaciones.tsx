import React from "react";
import Map from "../../components/maps/Map";
import SidenavPane from "../../components/sidenav_pane/sidenav_pane";
import CertificacionesSideNav from "../../components/certificaciones_sidenav/certificaciones_sidenav_screen";

const Certificaciones: React.FC = () => {
  const data = "Some data to pass as prop";

  return (
    <div id="map">
      <SidenavPane activePane={"1"} paneId={"1"} title={"Certificaciones"}>
        <CertificacionesSideNav data={data} />
      </SidenavPane>
      <Map />
    </div>
  );
};

export default Certificaciones;
