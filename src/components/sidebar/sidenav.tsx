import React, { useState } from "react";
import "./sidenav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faCog, faMap } from "@fortawesome/free-solid-svg-icons";
import styled from "@emotion/styled";
import Logo from "/assets/icons/logo.png";
import subMenuMainImg from "/assets/images/sections_menu_main/submenu_main.jpg";
import { useNavigate } from "react-router-dom";
import "leaflet-sidebar-v2/css/leaflet-sidebar.min.css";
import "leaflet-sidebar-v2";
import LogoutButton from "../LogoutButton";

const CustomIcon = styled(FontAwesomeIcon)`
  font-size: 1.5rem;
`;

const Sidebar: React.FC = () => {
  const [activePane, setActivePane] = useState<string>("home");
  const [isSubmenuVisible, setSubmenuVisible] = useState<boolean>(false);
  const [isSidenavPaneVisible, setIsSidenavPaneVisible] =
    useState<boolean>(false); // Sidebar starts collapsed
  const navigate = useNavigate();

  const programs = [
    { programa: "CUIDA TU BOSQUE", comunidadArchivo: "cuida-tu-bosque" },
    { programa: "NUEVOS BOSQUES", comunidadArchivo: "nuevos-bosques" },
    { programa: "SOSTENIBILIDAD", comunidadArchivo: "sostenibilidad" },
    { programa: "CERTIFICACIONES", comunidadArchivo: "certificaciones" },
    { programa: "AULA VERDE", comunidadArchivo: "aula-verde" },
  ];

  const handleMenuClick = (pane: string) => {
    switch (pane) {
      case "districts":
        if (activePane === "districts") {
          // Toggle visibility when "districts" is clicked again
          setIsSidenavPaneVisible(!isSidenavPaneVisible);
          setSubmenuVisible(!isSidenavPaneVisible);
        } else {
          setIsSidenavPaneVisible(true);
          setSubmenuVisible(true);
          setActivePane("districts");
          navigate("/districts");
        }
        break;

      case "home":
        // Handle home pane
        setActivePane("home");
        setIsSidenavPaneVisible(false); // Collapse sidebar for home
        setSubmenuVisible(false);
        navigate("/home");
        break;

      case "settings":
        // Toggle settings behavior
        if (activePane === "settings") {
          // If settings is already active, collapse it
          setIsSidenavPaneVisible(!isSidenavPaneVisible);
          setSubmenuVisible(!isSidenavPaneVisible);
        } else {
          // If settings is not active, expand sidebar and navigate to settings
          setIsSidenavPaneVisible(true);
          setSubmenuVisible(true);
          setActivePane("settings");
          navigate("/settings");
        }
        break;

      default:
        // Handle other panes
        setActivePane(pane);
        setIsSidenavPaneVisible(false); // Collapse sidebar for other panes
        setSubmenuVisible(false);
        break;
    }
  };

  const handleProgramClick = (comunidadArchivo: string) => {
    setSubmenuVisible(false);
    setIsSidenavPaneVisible(false); // Collapse sidebar when a program is clicked
    navigate(`/program/${comunidadArchivo}`);
    setActivePane(""); // Clear active pane
  };

  return (
    <div
      id="sidebar"
      className={`leaflet-sidebar expanded ${
        !isSidenavPaneVisible ? "hidden" : ""
      }`}
    >
      <div className="leaflet-sidebar-tabs">
        <ul role="tablist">
          <div className="sidebar-logo">
            <img
              src={Logo}
              alt="Logo"
              className="sidebar-logo-image"
              width={100}
              height={100}
            />
          </div>
          <li>
            <a
              role="tab"
              className={activePane === "home" ? "active" : ""}
              onClick={() => handleMenuClick("home")}
            >
              <CustomIcon icon={faHouse} size="2x" />
            </a>
          </li>
          <li>
            <a
              role="tab"
              className={activePane === "districts" ? "active" : ""}
              onClick={() => handleMenuClick("districts")}
            >
              <CustomIcon icon={faMap} size="2x" />
            </a>
          </li>
          <li>
            <a
              role="tab"
              className={activePane === "settings" ? "active" : ""}
              onClick={() => handleMenuClick("settings")}
            >
              <CustomIcon icon={faCog} size="2x" />
            </a>
          </li>
        </ul>
      </div>

      <div
        className={`sidebar-content ${!isSidenavPaneVisible ? "hidden" : ""}`}
      >
        {/* Home Pane */}
        <div
          className={`sidebar-pane ${activePane === "home" ? "active" : ""}`}
          id="home"
        >
          <h2 className="section-title">Home</h2>
          <p>Home content goes here.</p>
        </div>

        {/* District Pane with Programs */}
        {isSubmenuVisible && activePane === "districts" && (
          <div
            className={`sidebar-pane ${
              activePane === "districts" ? "active" : ""
            }`}
            id="district"
          >
            <h2 style={{ marginBottom: "1rem", textAlign: "center" }}>
              ACTUACIONES
            </h2>
            <ul>
              {programs.map((program, index) => (
                <li key={index}>
                  <div
                    className="program-item"
                    onClick={() => handleProgramClick(program.comunidadArchivo)}
                  >
                    <h3 style={{ margin: "0", textAlign: "center" }}>
                      {program.programa}
                    </h3>
                  </div>
                </li>
              ))}
            </ul>
            <img
              src={subMenuMainImg}
              alt="description"
              className="sidebar-logo-image"
              width={300}
              height={300}
            />
          </div>
        )}

        {/* Settings Pane */}
        <div
          className={`sidebar-pane ${
            activePane === "settings" ? "active" : ""
          }`}
          id="settings"
        >
          <h1 className="sidebar-header">Configuración</h1>
          <div className="settings-section">
            <p>Contenido de configuración</p>
            <div className="settings-actions">
              <LogoutButton className="sidebar-logout-button" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
