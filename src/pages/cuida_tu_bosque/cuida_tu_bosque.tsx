import React from "react";
import Map from "../../components/maps/Map";
import SidenavPane from "../../components/sidenav_pane/sidenav_pane";
import TownTreeMenu from "../../components/town_tree_menu/town_tree_menu_screen";
import "leaflet/dist/leaflet.css";
import DataAnalysisCuidaTuBosque from "../../components/data_analisis_cuida_tu_bosque/data_analisis_cuida_tu_bosque_screen";
import { useProgramMap } from "../../hooks/useProgramMap";

const CuidaTuBosque: React.FC = () => {
  const {
    mapRef, townsData, programDescription, sectionImg,
    dataForest, activeToggles, isDataPanelOpen,
    handleToggleClick, removeForestItem,
  } = useProgramMap({
    dataImport: () => import("../../data/programas/cuida-tu-bosque.json"),
  });

  return (
    <div id="map">
      <SidenavPane activePane={"1"} paneId={"1"}>
        <TownTreeMenu
          communitiesData={townsData}
          handleToggleClick={handleToggleClick}
          activeToggles={activeToggles}
          selectedProgram={"CUIDA TU BOSQUE"}
          programsInfo={programDescription}
          sectionImg={sectionImg}
          sideBarSelectedOption={undefined}
        />
      </SidenavPane>

      <Map mapRef={mapRef} />
      {isDataPanelOpen && (
        <DataAnalysisCuidaTuBosque
          isOpen={true}
          dataForest={dataForest}
          removeForestItem={removeForestItem}
          handleToggleClick={handleToggleClick}
          activeToggles={activeToggles}
        />
      )}
    </div>
  );
};

export default CuidaTuBosque;
