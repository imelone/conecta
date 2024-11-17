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

const CustomIcon = styled(FontAwesomeIcon)`
  font-size: 1.5rem;
`;

const Sidebar: React.FC = () => {
  const [activePane, setActivePane] = useState<string>("home");
  const [isSubmenuVisible, setSubmenuVisible] = useState<boolean>(true);
  const [isSidenavPaneVisible, setIsSidenavPaneVisible] =
    useState<boolean>(true);
  const navigate = useNavigate();

  const programs = [
    { programa: "CUIDA TU BOSQUE", comunidadArchivo: "cuida-tu-bosque" },
    { programa: "NUEVOS BOSQUES", comunidadArchivo: "nuevos-bosques" },
    { programa: "SOSTENIBILIDAD", comunidadArchivo: "sostenibilidad" },
    { programa: "CERTIFICACIONES", comunidadArchivo: "certificaciones" },
    { programa: "AULA VERDE", comunidadArchivo: "aula-verde" },
  ];

  const handleMenuClick = (pane: string) => {
    setActivePane(pane);

    switch (pane) {
      case "home":
        navigate("/home");
        setSubmenuVisible(false);
        break;
      case "district":
        navigate("/district");
        setSubmenuVisible(true);
        break;
      case "settings":
        navigate("/settings");
        setSubmenuVisible(false);
        break;
      default:
        break;
    }

    setIsSidenavPaneVisible(true); // Ensure the sidebar stays visible
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
              className={activePane === "district" ? "active" : ""}
              onClick={() => handleMenuClick("district")}
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
        {isSubmenuVisible && activePane === "district" && (
          <div
            className={`sidebar-pane ${
              activePane === "district" ? "active" : ""
            }`}
            id="district"
          >
            <h2 className="section-title">ACTUACIONES</h2>
            <ul>
              {programs.map((program, index) => (
                <li key={index}>
                  <div
                    className="program-item"
                    onClick={() => handleProgramClick(program.comunidadArchivo)}
                  >
                    {program.programa}
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
          <p>Contenido de configuración</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
