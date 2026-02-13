import React from "react";
import Map from "../../components/maps/Map";
import SidenavPane from "../../components/sidenav_pane/sidenav_pane";
import "leaflet/dist/leaflet.css";
import SostenibilidadSidenav from "../../components/sostenibilidad_sidenav/sostenibilidad_sidenav";
import DataAnalysisSostenibilidad from "../../components/data_analisis_sostenibilidad/data_analisis_sostenibilidad_screen";
import reduzcoCalculoImg from "../../../public/assets/images/sections_menu_main/reduzco_calculo_compenso_main.png";
import { useProgramMap } from "../../hooks/useProgramMap";

const Sostenibilidad: React.FC = () => {
  const {
    mapRef, townsData, sectionImg,
    dataForest, activeToggles, isDataPanelOpen,
    handleToggleClick, removeForestItem,
  } = useProgramMap({
    dataImport: () => import("../../data/programas/sostenibilidad.json"),
  });

  return (
    <div id="map">
      <SidenavPane activePane={"1"} paneId={"1"}>
        <SostenibilidadSidenav
          communitiesData={townsData}
          handleToggleClick={handleToggleClick}
          activeToggles={activeToggles}
          selectedProgram={"SOSTENIBILIDAD"}
          sideBarSelectedOption={undefined}
          sectionMainImg={sectionImg}
          secondaryImage={reduzcoCalculoImg}
        />
      </SidenavPane>

      <Map mapRef={mapRef} />
      {isDataPanelOpen && (
        <DataAnalysisSostenibilidad
          isOpen={true}
          data={dataForest}
          removeForestItem={removeForestItem}
          handleToggleClick={handleToggleClick}
        />
      )}
    </div>
  );
};

export default Sostenibilidad;
