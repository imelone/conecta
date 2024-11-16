import React from "react";
import "../sidebar/sidenav.css";
import "./sidenav_pane.css";
interface SidenavPaneProps {
  activePane: string;
  paneId: string;
  title: string;
  children: React.ReactNode;
}

const SidenavPane: React.FC<SidenavPaneProps> = ({
  activePane,
  paneId,
  children,
}) => {
  return (
    <div className="sidebar-pane-component">
      <div id="sidebar" className="leaflet-sidebar-component">
        <div
          className={`sidebar-pane ${activePane === paneId ? "active" : ""}`}
          id={paneId}
        >
          <div className="sidebar-content">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default SidenavPane;
