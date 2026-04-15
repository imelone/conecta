import React from "react";
import { Box } from "@mui/material";
import { useDataAnalysisCertificacionesViewModel } from "./data_analisis_certificaciones_view_model";
import DraggableModal from "../draggable_modal/draggable_modal";
import {
  dataAnalysisMenu, tabHeader, tabLink, tabLinkActive,
  tabContent,
} from "../shared/data_analysis_styles";

interface DataAnalysisMenuProps {
  isOpen: boolean;
  data: any;
}

const DataAnalysisCertificaciones: React.FC<DataAnalysisMenuProps> = ({
  isOpen,
  data,
}) => {
  const {
    activeTab,
    handleTabClick,
    isMinimized,
    iso,
    sicted,
    caae,
    setIsMinimized,
  } = useDataAnalysisCertificacionesViewModel(isOpen, data);

  if (!isOpen) return null;

  const renderItems = (items: string[]) => (
    <ul style={{ listStyleType: "none", paddingLeft: "10px" }}>
      {items?.map((item, index) => (
        <li key={index} style={{ fontSize: "0.9rem", padding: "0.2rem", wordBreak: "break-word" }}>
          {item}
        </li>
      ))}
    </ul>
  );

  return (
    <DraggableModal isMinimized={isMinimized} setIsMinimized={setIsMinimized}>
      <Box sx={dataAnalysisMenu}>
        <Box sx={tabHeader}>
          <Box component="button" sx={activeTab === "iso" ? tabLinkActive : tabLink} onClick={() => handleTabClick("iso")}>
            <p style={{ fontWeight: "700" }}>ISO 14001</p>
          </Box>
          <Box component="button" sx={activeTab === "sicted" ? tabLinkActive : tabLink} onClick={() => handleTabClick("sicted")}>
            <p style={{ fontWeight: "700" }}>SICTED</p>
          </Box>
          <Box component="button" sx={activeTab === "caae" ? tabLinkActive : tabLink} onClick={() => handleTabClick("caae")}>
            <p style={{ fontWeight: "700" }}>NORMA CAAE</p>
          </Box>
        </Box>
        <Box sx={tabContent}>
          <div style={{ display: activeTab === "iso" ? 'block' : 'none' }}>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              <li style={{ fontSize: "1rem" }}>{renderItems(iso?.items)}</li>
            </ul>
          </div>

          <div style={{ display: activeTab === "sicted" ? 'block' : 'none' }}>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              <li style={{ fontSize: "1rem" }}>{renderItems(sicted?.items)}</li>
            </ul>
          </div>

          <div style={{ display: activeTab === "caae" ? 'block' : 'none' }}>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              <li style={{ fontSize: "1rem" }}>{renderItems(caae?.items)}</li>
            </ul>
          </div>
        </Box>
      </Box>
    </DraggableModal>
  );
};

export default DataAnalysisCertificaciones;
