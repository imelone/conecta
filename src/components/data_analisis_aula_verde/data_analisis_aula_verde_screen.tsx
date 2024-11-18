import React from "react";
import styles from "./styles.module.css";
import { useDataAnalysisAulaVerdeViewModel } from "./data_analisis_aula_verde_view_model";
import DownloadIcon from "@mui/icons-material/Download";
import DraggableModal from "../draggable_modal/draggable_modal";

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
    handleClose,
    isMinimized,
    certificacionEspaciosVerdes,
    certificacionHotelEcologico,
    sostenibilidadTurismo,
    setIsMinimized,
  } = useDataAnalysisAulaVerdeViewModel(isOpen, data);

  // Helper function to render download links
  const renderDownloadLinks = (items: { label: string; pdfUrl: string }[]) => {
    return items.map((item, index) => (
      <li key={index} style={{ listStyle: "none", marginBottom: "8px" }}>
        <a href={item.pdfUrl} download className={styles.link}>
          <DownloadIcon
            style={{ fontSize: "16px", marginRight: "8px" }} // Adjust icon size and spacing
          />
          {item.label}
        </a>
      </li>
    ));
  };
  if (!isOpen) return null;
  return (
    <DraggableModal isMinimized={isMinimized} setIsMinimized={setIsMinimized}>
      <div className={styles.dataAnalysisMenu}>
        <div className={styles.tabHeader}>
          <button
            className={`${styles.tabLink} ${
              activeTab === "sostenibilidad_turismo" ? styles.active : ""
            }`}
            onClick={() => handleTabClick("sostenibilidad_turismo")}
          >
            <p style={{ fontWeight: "700", fontSize: "14px" }}>
              SOSTENIBILIDAD EN EL TURISMO
            </p>
          </button>
          <button
            className={`${styles.tabLink} ${
              activeTab === "certificacion_espacios_verdes" ? styles.active : ""
            }`}
            onClick={() => handleTabClick("certificacion_espacios_verdes")}
          >
            <p style={{ fontWeight: "700", fontSize: "14px" }}>
              CERTIFICACIÓN ESPACIOS VERDES
            </p>
          </button>
          <button
            className={`${styles.tabLink} ${
              activeTab === "certificacion_hotel_ecologico" ? styles.active : ""
            }`}
            onClick={() => handleTabClick("certificacion_hotel_ecologico")}
          >
            <p style={{ fontWeight: "700", fontSize: "14px" }}>
              CERTIFICACIÓN HOTEL ECOLÓGICO
            </p>
          </button>
        </div>
        <div className={styles.tabContent}>
          <div
            id="sostenibilidad_turismo"
            className={`${styles.tabPane} ${
              activeTab === "sostenibilidad_turismo" ? styles.active : ""
            }`}
          >
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {sostenibilidadTurismo?.items &&
                renderDownloadLinks(sostenibilidadTurismo.items)}
            </ul>
          </div>

          <div
            id="certificacion_espacios_verdes"
            className={`${styles.tabPane} ${
              activeTab === "certificacion_espacios_verdes" ? styles.active : ""
            }`}
          >
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {certificacionEspaciosVerdes?.items &&
                renderDownloadLinks(certificacionEspaciosVerdes.items)}
            </ul>
          </div>

          <div
            id="certificacion_hotel_ecologico"
            className={`${styles.tabPane} ${
              activeTab === "certificacion_hotel_ecologico" ? styles.active : ""
            }`}
          >
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {certificacionHotelEcologico?.items &&
                renderDownloadLinks(certificacionHotelEcologico.items)}
            </ul>
          </div>
        </div>
      </div>
    </DraggableModal>
  );
};

export default DataAnalysisAulaVerde;
