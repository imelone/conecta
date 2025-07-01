import { useState } from "react";

export interface InformacionAdicionalItem {
  texto: string;
}

export interface EmisionDirectaItem {
  edificioSede: string;
  nombreGas: string;
  formulaQuimica: string;
  pca: string;
  tipoEquipo: string;
  capacidadEquipo: string;
  recargaEquipo: string;
  emisionesKgCO2e: string;
}

export interface EmisionesDirectas {
  periodo: string;
  datos: EmisionDirectaItem[];
  totalEmisiones: string;
}

export interface InformacionData {
  descripcion?: string;
  estadoConservacion?: string;
  datosAdicionales?: InformacionAdicionalItem[];
  analisis?: {
    texto?: string;
    imagen?: string;
  };
  superficie?: string;
  arboles?: string;
  co2?: string;
  emisionesDirectas?: EmisionesDirectas;
  documentos?: Array<{
    nombre: string;
    icono: string;
    url: string;
  }>;
}

export interface DataAnalysisMenuProps {
  isOpen: boolean;
  dataForest: any;
  removeForestItem: any;
  handleToggleClick: any;
  activeToggles: Record<string, boolean>;
}

export interface AreaData {
  type: string;
  geometry: {
    type: string;
    coordinates: number[][][];
  };
  properties: {
    leyenda: {
      name: string;
      label: string;
      text: string;
      color: string;
    };
    catastrales: {
      text: string;
      image: string;
      refCat: string;
      poligono: string;
      parcela: string;
      coordenadasX: string;
      coordenadasY: string;
    };
    Analisis: {
      text: string;
      image: string;
    };
    informacion?: InformacionData;
    analisis?: {
      text: string;
      image: string;
    };
    indicadores: {
      superficie: string;
      arboles: string;
      co2Capturado: string;
      co2PorCapturar: string;
      factorHidrologico: string;
    };
  };
}
// Define interface for parcela items in the information tab
export interface InformacionParcelaItem {
  nombre: string;
  color: string;
  showDetailedInfo: boolean;
  descripcion?: string;
  analisisTexto?: string;
  analisisImagen?: string;
  superficieInfo?: string;
  arbolesInfo?: string;
  co2Info?: string;
  estadoConservacion?: string;
  informacionAdicional?: InformacionAdicionalItem[];
  emisionesDirectas?: EmisionesDirectas;
  documentos?: Array<{
    nombre: string;
    icono: string;
    url: string;
  }>;
}

// Define the view model return type
export interface DataAnalysisCuidaTuBosqueViewModel {
  activeTab: string;
  handleTabClick: (tab: string) => void;
  handleClose: (areaName?: string) => void;
  rowsCatastrales: any[];
  rowsIndicadores: any[];
  informacionParcelas: InformacionParcelaItem[];
  handleToggleClick: any;
  removeForestItem: (areaName: string) => void;
  isMinimized: boolean;
  setIsMinimized: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useDataAnalysisCuidaTuBosqueViewModel = (
  isOpen: boolean,
  dataForest: AreaData[],
  handleToggleClick: any,
  removeForestItem: (areaName: string) => void
): DataAnalysisCuidaTuBosqueViewModel => {
  console.log("DataAnalysisSostenibilidad props:", {
    isOpen,
    dataForest,
    removeForestItem,
    handleToggleClick,
  });
  const [activeTab, setActiveTab] = useState("datos_catastrales");
  const [isMinimized, setIsMinimized] = useState(false);

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  const handleClose = (areaName: any) => {
    removeForestItem(areaName);
  };

  // Extract rows from dataForest
  const rowsCatastrales =
    dataForest?.map((areaData: AreaData, index: number) => ({
      id: index + 1,
      bosque: areaData.properties.leyenda.label,
      color: areaData.properties.leyenda.color,
      refCat: areaData.properties.catastrales.refCat,
      poligono: areaData.properties.catastrales.poligono,
      parcela: areaData.properties.catastrales.parcela,
      //  coordenadas: `${areaData.properties.catastrales.coordenadasX} ${areaData.properties.catastrales.coordenadasY}`,
    })) || [];

  const rowsIndicadores =
    dataForest?.map((areaData: any, index: number) => ({
      id: index + 1,
      bosque: areaData.properties.leyenda.label,
      color: areaData.properties.leyenda.color,
      superficie: areaData.properties.indicadores.superficie,
      arboles: areaData.properties.indicadores.arboles,
      co2Capturado: areaData.properties.indicadores.co2Capturado,
      co2PorCapturar: areaData.properties.indicadores.co2PorCapturar,
      factorHidrologico: areaData.properties.indicadores.factorHidrologico,
    })) || [];
    
  // Extract information for the Información tab
  const informacionParcelas =
    dataForest?.map((areaData: AreaData) => {
      const hasInformacionObject = areaData.properties.informacion !== undefined;
      const showDetailedInfo = hasInformacionObject;
      
      // Debug logging
      console.log("Area name:", areaData.properties.leyenda.label);
      console.log("Has informacion:", hasInformacionObject);
      
      // Specific logging for GEOLIT
      if (areaData.properties.leyenda.label.includes("GEOLIT")) {
        console.log("FOUND GEOLIT!");
        console.log("GEOLIT informacion:", areaData.properties.informacion);
        if (hasInformacionObject) {
          console.log("GEOLIT has emisionesDirectas:", !!areaData.properties.informacion?.emisionesDirectas);
          console.log("GEOLIT emisionesDirectas full data:", JSON.stringify(areaData.properties.informacion?.emisionesDirectas));
        }
      }
      
      return {
        // Only use name and color from outside the informacion object
        nombre: areaData.properties.leyenda.label,
        color: areaData.properties.leyenda.color,
        showDetailedInfo: showDetailedInfo,
        
       
          
        documentos: hasInformacionObject && areaData.properties.informacion?.documentos 
          ? areaData.properties.informacion.documentos 
          : []
      };
    }) || [];

  return {
    activeTab,
    handleTabClick,
    handleClose,
    rowsCatastrales,
    rowsIndicadores,
    informacionParcelas,
    handleToggleClick,
    removeForestItem,
    isMinimized,
    setIsMinimized,
  };
};
