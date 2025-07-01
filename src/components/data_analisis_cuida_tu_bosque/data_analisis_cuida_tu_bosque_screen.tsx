import React from "react";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import styles from "./styles.module.css";

import { useDataAnalysisCuidaTuBosqueViewModel } from "./data_analisis_cuida_tu_bosque_view_model"; // Adjust the import path as necessary

import DraggableModal from "../draggable_modal/draggable_modal";
import DownloadIcon from "@mui/icons-material/Download";

interface DataAnalysisMenuProps {
  isOpen: boolean;
  dataForest: any;
  removeForestItem: any;
  handleToggleClick: any;
  activeToggles: Record<string, boolean>;
  // setIsMinimized: any;
  // sMinimized: boolean;
}

const DataAnalysisCuidaTuBosque: React.FC<DataAnalysisMenuProps> = ({
  isOpen,
  dataForest,
  removeForestItem,
  handleToggleClick,
}) => {
  const {
    activeTab,
    handleTabClick,
    rowsCatastrales,
    rowsIndicadores,
    informacionParcelas,
    setIsMinimized,
    isMinimized,
  } = useDataAnalysisCuidaTuBosqueViewModel(
    isOpen,
    dataForest,
    handleToggleClick,
    removeForestItem
  );

  const shouldShowGrid = rowsCatastrales.length > 0;
  if (!isOpen) return null;

  const columnsDatosCatastrales: GridColDef[] = [
    { 
      field: "bosque", 
      headerName: "BOSQUE", 
      width: 350,
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <span 
            style={{
              display: 'inline-block',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: params.row.color || '#ccc',
              marginRight: '8px',
              border: '1px solid #000',
              position: 'relative',
              top: '0px'  
            }}
          ></span>
          <span style={{ display: 'inline-block', verticalAlign: 'middle' }}>{params.value}</span>
        </div>
      )
    },
    { field: "refCat", headerName: "REF. CATASTRAL", width: 150 },
    { field: "poligono", headerName: "POLÍGONO", width: 150 },
    { field: "parcela", headerName: "PARCELA", width: 150 },
  ];

  const columnsIndicadores: GridColDef[] = [
    { 
      field: "bosque", 
      headerName: "BOSQUE", 
      width: 350,
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <span 
            style={{
              display: 'inline-block',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: params.row.color || '#ccc',
              marginRight: '8px',
              border: '1px solid #000',
              position: 'relative',
              top: '0px'  
            }}
          ></span>
          <span style={{ display: 'inline-block', verticalAlign: 'middle' }}>{params.value}</span>
        </div>
      )
    },
    { field: "superficie", headerName: "SUPERFICIE", width: 20 },
    { field: "arboles", headerName: "ÁRBOLES", width: 20 },
    { field: "co2Capturado", headerName: "CO2 CAPTURADO (t.)", width: 20 },
    { field: "co2PorCapturar", headerName: "CO2 X CAPTURAR (t.)", width: 20 },
    {
      field: "factorHidrologico",
      headerName: "FACTOR HIDROLÓGICO",
      width: 150,
    },
  ];

  return (
    <DraggableModal isMinimized={isMinimized} setIsMinimized={setIsMinimized}>
      <div className={styles.dataAnalysisMenu}>
        <div className={styles.tabHeader}>
          {/* <button
            className={`${styles.tabLink} ${
              activeTab === "descripcion" ? styles.active : ""
            }`}
            onClick={() => handleTabClick("descripcion")}
          >
            <p style={{ fontWeight: "700", fontSize: "14px" }}>DESCRIPCION</p>
          </button> */}
          <button
            className={`${styles.tabLink} ${
              activeTab === "datos_catastrales" ? styles.active : ""
            }`}
            onClick={() => handleTabClick("datos_catastrales")}
          >
            <p style={{ fontWeight: "700", fontSize: "14px" }}>
              DATOS CATASTRALES
            </p>
          </button>
          <button
            className={`${styles.tabLink} ${
              activeTab === "indicadores" ? styles.active : ""
            }`}
            onClick={() => handleTabClick("indicadores")}
          >
            <p style={{ fontWeight: "700", fontSize: "14px" }}>INDICADORES</p>
          </button>
          <button
            className={`${styles.tabLink} ${
              activeTab === "informacion" ? styles.active : ""
            }`}
            onClick={() => handleTabClick("informacion")}
          >
            <p style={{ fontWeight: "700", fontSize: "14px" }}>
              INFORMACIÓN
            </p>
          </button>
        </div>

        <div className={styles.tabContent}>
          {/* Debug info for activeTab and parcelas */}
          <div style={{ display: 'none' }}>
            {activeTab && `Current active tab: ${activeTab}`}
            {informacionParcelas && `Information parcelas: ${informacionParcelas.length}`}
          </div>
          <div
            id="informacion"
            className={`${styles.tabPane} ${
              activeTab === "informacion" ? styles.active : ""
            }`}
           
          >
            {/* Only render features that have actual information data */}
            {informacionParcelas.filter(parcela => parcela.showDetailedInfo).map((parcela, index) => (
              <div key={index} className={styles.informacionItem}>
                <h2 className={styles.informacionItemTitle}>
                  <span 
                    className={styles.colorIndicator}
                    style={{
                      backgroundColor: parcela.color
                    }}
                  ></span>
                  {parcela.nombre}
                 
                </h2>
                
              
                  <div className={styles.informacionContent}>
                 
                                        {/* Documentos están disponibles para todas las áreas */}
                    {parcela.documentos && parcela.documentos.length > 0 && (
                      <div>
                        <h3 className={styles.documentTitle}>Documentos disponibles</h3>
                        <ul className={styles.documentList}>
                          {parcela.documentos.map((doc, docIndex) => (
                            <li key={docIndex} className={styles.documentItem}>
                              <a 
                                href={doc.url} 
                                className={styles.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                download
                              >
                                <DownloadIcon
                                  style={{ fontSize: "16px" }}
                                />
                                {doc.nombre}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
               
                
             
              </div>
            ))}
          </div>

          <div
            id="datos_catastrales"
            className={`${styles.tabPane} ${
              activeTab === "datos_catastrales" ? styles.active : ""
            }`}
          >
            {shouldShowGrid && (
              <div className={styles.gridContainer}>
                <DataGrid
                  rows={rowsCatastrales}
                  columns={columnsDatosCatastrales.map((col) => ({
                    ...col,
                    width:
                      col.field === "poligono" || col.field === "parcela"
                        ? 100
                        : 320,
                    sortable: false,
                    filterable: false,
                    disableColumnMenu: true,
                  }))}
                  pagination={undefined}
                  hideFooterPagination={true}
                  hideFooter={true}
                  sx={{
                    boxShadow: 2,
                    border: 0,
                    borderColor: "primary.light",
                    "& .MuiDataGrid-root": {
                      border: "1px solid #ddd",
                      borderCollapse: "collapse",
                    },
                    "& .MuiDataGrid-cell": {
                      borderBottom: "1px solid #ddd",
                      whiteSpace: "pre-line",
                      overflowWrap: "break-word",
                    },
                    "& .MuiDataGrid-columnSeparator": {
                      display: "block",
                    },
                    "& .MuiDataGrid-footer": {
                      display: "none",
                    },
                  }}
                />
              </div>
            )}
          </div>

          <div
            id="indicadores"
            className={`${styles.tabPane} ${
              activeTab === "indicadores" ? styles.active : ""
            }`}
          >
            {shouldShowGrid && (
              <div className={styles.gridContainer}>
                <DataGrid
                  rows={rowsIndicadores}
                  columns={columnsIndicadores.map((col) => ({
                    ...col,
                    width: col.field === "bosque" ? 320 : 100,
                    // width: 160,
                    sortable: false,
                    filterable: false,
                    disableColumnMenu: true,
                  }))}
                  pagination={undefined}
                  hideFooterPagination={true}
                  hideFooter={true}
                  sx={{
                    boxShadow: 2,
                    border: 0,
                    borderColor: "primary.light",
                    "& .MuiDataGrid-root": {
                      border: "1px solid #ddd",
                      borderCollapse: "collapse",
                    },

                    "& .MuiDataGrid-cell": {
                      borderBottom: "1px solid #ddd",
                      whiteSpace: "pre-line",
                      overflowWrap: "break-word",
                    },
                    "& .MuiDataGrid-columnSeparator": {
                      display: "block",
                    },
                    "& .MuiDataGrid-footer": {
                      display: "none",
                    },
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </DraggableModal>
  );
};

export default DataAnalysisCuidaTuBosque;
