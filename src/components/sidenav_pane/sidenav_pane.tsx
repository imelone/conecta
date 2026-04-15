import React from "react";
import { Box } from "@mui/material";
interface SidenavPaneProps {
  activePane: string;
  paneId: string;
  children: React.ReactNode;
}

const SidenavPane: React.FC<SidenavPaneProps> = ({
  activePane,
  paneId,
  children,
}) => {
  return (
    <div className="sidebar-pane-component">
      <Box
        id="sidebar"
        className="leaflet-sidebar-component"
        sx={{ paddingLeft: { xs: '56px', sm: '64px', md: '80px' } }}
      >
        <div
          className={`sidebar-pane ${activePane === paneId ? "active" : ""}`}
          id={paneId}
        >
          <div className="sidebar-content" style={{ marginLeft: 0 }}>{children}</div>
        </div>
      </Box>
    </div>
  );
};

export default SidenavPane;
