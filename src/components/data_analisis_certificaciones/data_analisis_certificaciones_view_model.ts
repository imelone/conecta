// DataAnalysisViewModel.ts

import { useState } from "react";

export interface DataAnalysisMenuProps {
  isOpen: boolean;
  data: any;
}

export const useDataAnalysisCertificacionesViewModel = (
  isOpen: any,
  data: any
) => {
  // Log all the props received
  console.log("Props received:", {
    isOpen,
    data,
  });
  console.log("data: ", data);
  const [activeTab, setActiveTab] = useState("iso");
  const [isMinimized, setIsMinimized] = useState(false);
  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  // Define colors for each certification type 
  const certificationColors = {
    iso: "#4CAF50",     // Green
    sicted: "#2196F3",  // Blue
    caae: "#FF9800"      // Orange
  };

  // Initialize arrays to hold the values
  const iso = data?.[0] ?? {};
  const sicted = data?.[1] ?? {};
  const caae = data?.[2] ?? {};
  
  // Add colors to each certification
  if (iso?.title) iso.color = certificationColors.iso;
  if (sicted?.title) sicted.color = certificationColors.sicted;
  if (caae?.title) caae.color = certificationColors.caae;

  return {
    activeTab,
    handleTabClick,
    data,
    iso,
    caae,
    sicted,
    isMinimized,
    setIsMinimized,
  };
};
