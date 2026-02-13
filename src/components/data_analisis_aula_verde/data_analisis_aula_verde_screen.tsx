import React from "react";
import { Box } from "@mui/material";
import { useDataAnalysisAulaVerdeViewModel } from "./data_analisis_aula_verde_view_model";
import DownloadIcon from "@mui/icons-material/Download";
import DraggableModal from "../draggable_modal/draggable_modal";
import {
  dataAnalysisMenu, tabHeader, tabLink, tabLinkActive,
  tabContent, link,
} from "../shared/data_analysis_styles";

interface DataAnalysisMenuProps {
  isOpen: boolean;
  data: any;
}

const DataAnalysisAulaVerde: React.FC<DataAnalysisMenuProps> = ({
  isOpen,
  data,
}) => {
  const {
    activeTab,
    handleTabClick,
    isMinimized,
    certificacionEspaciosVerdes,
    certificacionHotelEcologico,
    sostenibilidadTurismo,
    setIsMinimized,
  } = useDataAnalysisAulaVerdeViewModel(isOpen, data);

  const renderDownloadLinks = (items: { label: string; pdfUrl: string }[]) => {
    return items.map((item, index) => (
      <li key={index} style={{ listStyle: "none", marginBottom: "8px" }}>
        <Box component="a" href={item.pdfUrl} download sx={link}>
          <DownloadIcon style={{ fontSize: "16px", marginRight: "8px" }} />
          {item.label}
        </Box>
      </li>
    ));
  };

  if (!isOpen) return null;
  return (
    <DraggableModal isMinimized={isMinimized} setIsMinimized={setIsMinimized}>
      <Box sx={dataAnalysisMenu}>
        <Box sx={tabHeader}>
          <Box
            component="button"
            sx={activeTab === "sostenibilidad_turismo" ? tabLinkActive : tabLink}
            onClick={() => handleTabClick("sostenibilidad_turismo")}
          >
            <p style={{ fontWeight: "700", fontSize: "14px" }}>
              SOSTENIBILIDAD EN EL TURISMO
            </p>
          </Box>
          <Box
            component="button"
            sx={activeTab === "certificacion_espacios_verdes" ? tabLinkActive : tabLink}
            onClick={() => handleTabClick("certificacion_espacios_verdes")}
          >
            <p style={{ fontWeight: "700", fontSize: "14px" }}>
              CERTIFICACIÓN ESPACIOS VERDES
            </p>
          </Box>
          <Box
            component="button"
            sx={activeTab === "certificacion_hotel_ecologico" ? tabLinkActive : tabLink}
            onClick={() => handleTabClick("certificacion_hotel_ecologico")}
          >
            <p style={{ fontWeight: "700", fontSize: "14px" }}>
              CERTIFICACIÓN HOTEL ECOLÓGICO
            </p>
          </Box>
        </Box>
        <Box sx={tabContent}>
          <div style={{ display: activeTab === "sostenibilidad_turismo" ? 'block' : 'none' }}>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {sostenibilidadTurismo?.items &&
                renderDownloadLinks(sostenibilidadTurismo.items)}
            </ul>
          </div>

          <div style={{ display: activeTab === "certificacion_espacios_verdes" ? 'block' : 'none' }}>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {certificacionEspaciosVerdes?.items &&
                renderDownloadLinks(certificacionEspaciosVerdes.items)}
            </ul>
          </div>

          <div style={{ display: activeTab === "certificacion_hotel_ecologico" ? 'block' : 'none' }}>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {certificacionHotelEcologico?.items &&
                renderDownloadLinks(certificacionHotelEcologico.items)}
            </ul>
          </div>
        </Box>
      </Box>
    </DraggableModal>
  );
};

export default DataAnalysisAulaVerde;
