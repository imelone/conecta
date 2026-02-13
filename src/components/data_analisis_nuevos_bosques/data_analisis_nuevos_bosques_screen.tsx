import React from "react";
import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useDataAnalysisNuevosBosquesViewModel } from "./data_analisis_nuevos_bosques_view_model";
import DraggableModal from "../draggable_modal/draggable_modal";
import {
  tabHeader, tabLink, tabLinkActive,
  tabContent, gridContainer,
} from "../shared/data_analysis_styles";

interface DataAnalysisMenuProps {
  isOpen: boolean;
  dataForest: any;
  removeForestItem: any;
  handleToggleClick: any;
  activeToggles: Record<string, boolean>;
}

const DataAnalysisNuevosBosquesMenu: React.FC<DataAnalysisMenuProps> = ({
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
    isMinimized,
    setIsMinimized,
  } = useDataAnalysisNuevosBosquesViewModel(
    dataForest,
    handleToggleClick,
    removeForestItem
  );

  if (!isOpen) return null;

  const columnsDatosCatastrales: GridColDef[] = [
    { 
      field: "bosque", 
      headerName: "BOSQUE", 
      width: 250,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <span 
            style={{
              display: "inline-block",
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: params.row.color || "#ccc",
              marginRight: "8px",
              border: "1px solid #000",
              position: "relative",
              top: "0px",
              flexShrink: 0
            }}
          ></span>
          <span>{params.value}</span>
        </div>
      ),
    },
    { field: "refCat", headerName: "REF. CATASTRAL", width: 150 },
    // { field: "poligono", headerName: "POLÍGONO", width: 150 },
    // { field: "parcela", headerName: "PARCELA", width: 150 },
  ];
  const columnsIndicadores: GridColDef[] = [
    { 
      field: "bosque", 
      headerName: "BOSQUE", 
      width: 250,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <span 
            style={{
              display: "inline-block",
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: params.row.color || "#ccc",
              marginRight: "8px",
              border: "1px solid #000",
              position: "relative",
              top: "0px",
              flexShrink: 0
            }}
          ></span>
          <span>{params.value}</span>
        </div>
      ),
    },
    // { field: "superficie", headerName: "SUPERFICIE", width: 20 },
    { field: "arboles_nuevos", headerName: "ÁRBOLES NUEVOS", width: 20 },
    { field: "co2PorCapturar", headerName: "CO2 X CAPTURAR (t.)", width: 20 },
  ];

  const shouldShowGrid = rowsCatastrales.length > 0;

  return (
    <DraggableModal isMinimized={isMinimized} setIsMinimized={setIsMinimized}>
      <Box sx={tabHeader}>
        <Box component="button" sx={activeTab === "indicadores" ? tabLinkActive : tabLink} onClick={() => handleTabClick("indicadores")}>
          <p style={{ fontWeight: "700", fontSize: "14px" }}>INDICADORES</p>
        </Box>
        <Box component="button" sx={activeTab === "datos_catastrales" ? tabLinkActive : tabLink} onClick={() => handleTabClick("datos_catastrales")}>
          <p style={{ fontWeight: "700", fontSize: "14px" }}>DATOS CATASTRALES</p>
        </Box>
      </Box>
      <Box sx={tabContent}>
        <div style={{ display: activeTab === "indicadores" ? 'block' : 'none' }}>
          {shouldShowGrid && (
            <Box sx={gridContainer}>
              <DataGrid
                rows={rowsIndicadores}
                columns={columnsIndicadores.map((col) => ({
                  ...col,
                  width: 160,
                  sortable: false,
                  filterable: false,
                  disableColumnMenu: true,
                }))}
                pagination={undefined}
                hideFooterPagination={true}
                hideFooter={true}
                sx={{
                  boxShadow: 2, border: 2, borderColor: "primary.light",
                  "& .MuiDataGrid-root": { border: "1px solid #ddd", borderCollapse: "collapse" },
                  "& .MuiDataGrid-cell": { borderBottom: "1px solid #ddd", whiteSpace: "pre-line", overflowWrap: "break-word" },
                  "& .MuiDataGrid-columnSeparator": { display: "block" },
                  "& .MuiDataGrid-footer": { display: "none" },
                }}
              />
            </Box>
          )}
        </div>
        <div style={{ display: activeTab === "datos_catastrales" ? 'block' : 'none' }}>
          {shouldShowGrid && (
            <Box sx={gridContainer}>
              <DataGrid
                rows={rowsCatastrales}
                columns={columnsDatosCatastrales.map((col) => ({
                  ...col,
                  width:
                    col.field === "poligono" || col.field === "parcela"
                      ? 100
                      : col.field === "coordenadas"
                      ? 300
                      : 200,
                  sortable: false,
                  filterable: false,
                  disableColumnMenu: true,
                }))}
                pagination={undefined}
                hideFooterPagination={true}
                hideFooter={true}
                sx={{
                  boxShadow: 2, border: 2, borderColor: "primary.light",
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
    </DraggableModal>
  );
};

export default DataAnalysisNuevosBosquesMenu;
