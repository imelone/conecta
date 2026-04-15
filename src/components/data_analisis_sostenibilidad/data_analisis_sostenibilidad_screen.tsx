import React from "react";
import { Box } from "@mui/material";
import { useDataAnalysisSostenibilidadViewModel } from "./data_analisis_sostenibilidad_view_model";
import DraggableModal from "../draggable_modal/draggable_modal";
import {
  dataAnalysisMenu, tabHeader, tabLink, tabLinkActive,
  tabContent,
} from "../shared/data_analysis_styles";

interface DataAnalysisMenuProps {
  isOpen: boolean;
  data: any;
  removeForestItem: any;
  handleToggleClick: any;
}

const DataAnalysisSostenibilidad: React.FC<DataAnalysisMenuProps> = ({
  isOpen,
  data,
  removeForestItem,
  handleToggleClick,
}) => {
  const {
    activeTab,
    handleTabClick,
    isMinimized,
    data: municipioData,
    setIsMinimized,
  } = useDataAnalysisSostenibilidadViewModel(
    isOpen,
    data,
    handleToggleClick,
    removeForestItem
  );

  if (!isOpen) return null;

  return (
    <DraggableModal isMinimized={isMinimized} setIsMinimized={setIsMinimized}>
      <Box sx={dataAnalysisMenu}>
        <Box sx={tabHeader}>
          <Box component="button" sx={activeTab === "metas" ? tabLinkActive : tabLink} onClick={() => handleTabClick("metas")}>
            <p style={{ fontWeight: "700" }}>METAS</p>
          </Box>
          <Box component="button" sx={activeTab === "pilares" ? tabLinkActive : tabLink} onClick={() => handleTabClick("pilares")}>
            <p style={{ fontWeight: "700" }}>PILARES</p>
          </Box>
          <Box component="button" sx={activeTab === "actuaciones" ? tabLinkActive : tabLink} onClick={() => handleTabClick("actuaciones")}>
            <p style={{ fontWeight: "700" }}>ACTUACIONES</p>
          </Box>
        </Box>
        <Box sx={{ ...tabContent as object, margin: '1rem' }}>
          {municipioData.map((municipio, index) => (
            <div key={index}>
              <h2 style={{ fontSize: "1.2rem", fontWeight: "bold", textAlign: "start", marginBottom: "0" }}>
                {municipio.municipio}
              </h2>
              <div style={{ display: activeTab === "metas" ? 'block' : 'none' }}>
                <ul style={{ listStyleType: "none", padding: 0, margin: "0.5rem 0" }}>
                  {municipio.metas.map((meta, idx) => (
                    <li style={{ fontSize: "1rem" }} key={idx}>{meta}</li>
                  ))}
                </ul>
              </div>

              <div style={{ display: activeTab === "pilares" ? 'block' : 'none' }}>
                <ul style={{ listStyleType: "none", padding: 0 }}>
                  {municipio.pilares.map((pilar, idx) => (
                    <li style={{ fontSize: "1rem" }} key={idx}>{pilar}</li>
                  ))}
                </ul>
              </div>

              <div style={{ display: activeTab === "actuaciones" ? 'block' : 'none' }}>
                <ul style={{ listStyleType: "none", padding: 0 }}>
                  {municipio.actuaciones.map((actuacion, idx) => (
                    <li style={{ fontSize: "1rem" }} key={idx}>{actuacion}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </Box>
      </Box>
    </DraggableModal>
  );
};

export default DataAnalysisSostenibilidad;
