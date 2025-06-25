// DataAnalysisViewModel.ts

import { useState } from "react";

export interface DataAnalysisMenuProps {
  isOpen: boolean;
  data: any;
}

export const useDataAnalysisAulaVerdeViewModel = (isOpen: any, data: any) => {
  // Log all the props received
  console.log("Props received:", {
    isOpen,
    data,
  });

  const [activeTab, setActiveTab] = useState("sostenibilidad_turismo");
  const [isMinimized, setIsMinimized] = useState(false);
  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  // Define section colors
  const sectionColors = {
    espaciosVerdes: "#4CAF50", // Green
    hotelEcologico: "#FFC107", // Amber
    sostenibilidadTurismo: "#009688" // Teal
  };

  const certificacionEspaciosVerdes = (data && data[0]) || {};
  const certificacionHotelEcologico = (data && data[1]) || {};
  const sostenibilidadTurismo = (data && data[2]) || {};
  
  // Add colors to each section
  certificacionEspaciosVerdes.color = sectionColors.espaciosVerdes;
  certificacionHotelEcologico.color = sectionColors.hotelEcologico;
  sostenibilidadTurismo.color = sectionColors.sostenibilidadTurismo;

  return {
    activeTab,
    handleTabClick,
    data,
    certificacionEspaciosVerdes,
    certificacionHotelEcologico,
    sostenibilidadTurismo,
    isMinimized,
    setIsMinimized,
  };
};
