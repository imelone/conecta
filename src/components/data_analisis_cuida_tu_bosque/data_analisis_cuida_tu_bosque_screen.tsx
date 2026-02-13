import React from "react";
import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useDataAnalysisCuidaTuBosqueViewModel } from "./data_analisis_cuida_tu_bosque_view_model";
import DraggableModal from "../draggable_modal/draggable_modal";
import DownloadIcon from "@mui/icons-material/Download";
import {
  dataAnalysisMenu, tabHeader, tabLink, tabLinkActive,
  tabContent, gridContainer,
  informacionItem, informacionItemTitle, colorIndicator,
  informacionContent, documentTitle, documentList, documentItem, link,
} from "../shared/data_analysis_styles";

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
      <Box sx={dataAnalysisMenu}>
        <Box sx={tabHeader}>
          <Box component="button" sx={activeTab === "datos_catastrales" ? tabLinkActive : tabLink} onClick={() => handleTabClick("datos_catastrales")}>
            <p style={{ fontWeight: "700", fontSize: "14px" }}>DATOS CATASTRALES</p>
          </Box>
          <Box component="button" sx={activeTab === "indicadores" ? tabLinkActive : tabLink} onClick={() => handleTabClick("indicadores")}>
            <p style={{ fontWeight: "700", fontSize: "14px" }}>INDICADORES</p>
          </Box>
          <Box component="button" sx={activeTab === "informacion" ? tabLinkActive : tabLink} onClick={() => handleTabClick("informacion")}>
            <p style={{ fontWeight: "700", fontSize: "14px" }}>INFORMACIÓN</p>
          </Box>
        </Box>

        <Box sx={tabContent}>
          <div style={{ display: activeTab === "informacion" ? 'block' : 'none' }}>
            {informacionParcelas.filter(parcela => parcela.showDetailedInfo).map((parcela, index) => (
              <Box key={index} sx={informacionItem}>
                <Box component="h2" sx={informacionItemTitle}>
                  <span style={{ ...colorIndicator, backgroundColor: parcela.color }}></span>
                  {parcela.nombre}
                </Box>
                <Box sx={informacionContent}>
                  {parcela.documentos && parcela.documentos.length > 0 && (
                    <div>
                      <Box component="h3" sx={documentTitle}>Documentos disponibles</Box>
                      <Box component="ul" sx={documentList}>
                        {parcela.documentos.map((doc: any, docIndex: number) => (
                          <Box component="li" key={docIndex} sx={documentItem}>
                            <Box
                              component="a"
                              href={doc.url}
                              sx={link}
                              target="_blank"
                              rel="noopener noreferrer"
                              download
                            >
                              <DownloadIcon style={{ fontSize: "16px" }} />
                              {doc.nombre}
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    </div>
                  )}
                </Box>
              </Box>
            ))}
          </div>

          <div style={{ display: activeTab === "datos_catastrales" ? 'block' : 'none' }}>
            {shouldShowGrid && (
              <Box sx={gridContainer}>
                <DataGrid
                  rows={rowsCatastrales}
                  columns={columnsDatosCatastrales.map((col) => ({
                    ...col,
                    width: col.field === "poligono" || col.field === "parcela" ? 100 : 320,
                    sortable: false,
                    filterable: false,
                    disableColumnMenu: true,
                  }))}
                  pagination={undefined}
                  hideFooterPagination={true}
                  hideFooter={true}
                  sx={{
                    boxShadow: 2, border: 0, borderColor: "primary.light",
                    "& .MuiDataGrid-root": { border: "1px solid #ddd", borderCollapse: "collapse" },
                    "& .MuiDataGrid-cell": { borderBottom: "1px solid #ddd", whiteSpace: "pre-line", overflowWrap: "break-word" },
                    "& .MuiDataGrid-columnSeparator": { display: "block" },
                    "& .MuiDataGrid-footer": { display: "none" },
                  }}
                />
              </Box>
            )}
          </div>

          <div style={{ display: activeTab === "indicadores" ? 'block' : 'none' }}>
            {shouldShowGrid && (
              <Box sx={gridContainer}>
                <DataGrid
                  rows={rowsIndicadores}
                  columns={columnsIndicadores.map((col) => ({
                    ...col,
                    width: col.field === "bosque" ? 320 : 100,
                    sortable: false,
                    filterable: false,
                    disableColumnMenu: true,
                  }))}
                  pagination={undefined}
                  hideFooterPagination={true}
                  hideFooter={true}
                  sx={{
                    boxShadow: 2, border: 0, borderColor: "primary.light",
                    "& .MuiDataGrid-root": { border: "1px solid #ddd", borderCollapse: "collapse" },
                    "& .MuiDataGrid-cell": { borderBottom: "1px solid #ddd", whiteSpace: "pre-line", overflowWrap: "break-word" },
                    "& .MuiDataGrid-columnSeparator": { display: "block" },
                    "& .MuiDataGrid-footer": { display: "none" },
                  }}
                />
              </Box>
            )}
          </div>
        </Box>
      </Box>
    </DraggableModal>
  );
};

export default DataAnalysisCuidaTuBosque;
