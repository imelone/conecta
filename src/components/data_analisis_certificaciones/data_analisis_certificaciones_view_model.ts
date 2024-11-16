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

  // Initialize arrays to hold the values
  const iso = data?.[0] ?? {};
  const sicted = data?.[1] ?? {};
  const caae = data?.[2] ?? {};

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
