import React from "react";
import { Box } from "@mui/material";
import { TreeMenu } from "../tree_menu/tree_menu";
import {
  scrollContainer, logoContainer, menu, toggleSwitch, label, sidebarLogoImage,
} from "./sostenibilidad_sidenav_styles";

interface TownListProps {
  sectionMainImg: string;
  communitiesData: any[];
  secondaryImage: string;
  onParcelClick?: (parcel: string) => void;
  handleToggleClick: (leyendaName: string) => void;
  handleMunicipioToggleClick?: (municipio: string) => void;
  activeToggles: any;
  selectedProgram: any;
  programsInfo?: any;
  sideBarSelectedOption: any;
}

const SostenibilidadSidenav: React.FC<TownListProps> = ({
  sectionMainImg,
  communitiesData,
  secondaryImage,
  handleToggleClick,
  activeToggles,
  selectedProgram,
  programsInfo,
  sideBarSelectedOption,
}) => {
  return (
    <Box sx={scrollContainer}>
      <div>
        <h3 style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
          {selectedProgram}
        </h3>

        <Box sx={logoContainer}>
          {sectionMainImg && (
            <img
              src={`/assets/images/sections_menu_main/${sectionMainImg}.png`}
              alt="Logo"
              style={sidebarLogoImage}
            />
          )}
        </Box>

        <ul>
          {programsInfo?.map((item: any, idx: React.Key | null | undefined) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
      <div style={{ minHeight: "230px" }}>
        {communitiesData?.map((communityData: any, index: any) => (
          <TreeMenu
            key={index}
            title={communityData?.comunidad}
            selectedProgram={selectedProgram}
            sideBarSelectedOption={sideBarSelectedOption}
          >
            {communityData?.provincias?.map((province: any) => (
              <TreeMenu
                key={province.provincia}
                title={province.provincia}
                sideBarSelectedOption={sideBarSelectedOption}
              >
                <Box component="ul" sx={menu}>
                  {province?.municipios?.map((municipio: any) => {
                    return (
                      <TreeMenu
                        sideBarSelectedOption={sideBarSelectedOption}
                        key={municipio.municipio}
                        title={
                          <div>
                            <Box component="label" className="toggle-switch" sx={toggleSwitch}>
                              <Box component="span" sx={label}>
                                {municipio?.municipio}
                              </Box>
                            </Box>
                          </div>
                        }
                      >
                        <ul>
                          {municipio.parcelas.map((parcel: any) => {
                            const leyenda = parcel.properties?.leyenda;
                            const isChecked =
                              activeToggles[leyenda?.name || ""] || false;
                            return (
                              <li key={leyenda?.name || parcel.parcela}>
                                <Box component="label" className="toggle-switch" sx={toggleSwitch}>
                                  <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={() =>
                                      leyenda && handleToggleClick(leyenda.name)
                                    }
                                    style={{ opacity: 0, width: 0, height: 0 }}
                                  />
                                  <span
                                    style={{
                                      position: 'relative',
                                      cursor: 'pointer',
                                      minWidth: '30px',
                                      height: '16px',
                                      backgroundColor: isChecked ? leyenda?.color : "#ccc",
                                      borderRadius: '34px',
                                      transition: 'background-color 0.4s',
                                    }}
                                  ></span>
                                  <Box component="span" sx={label}>
                                    {leyenda?.label || "Unnamed Parcel"}
                                  </Box>
                                </Box>
                              </li>
                            );
                          })}
                        </ul>
                      </TreeMenu>
                    );
                  })}
                </Box>
              </TreeMenu>
            ))}
          </TreeMenu>
        ))}
      </div>

      {secondaryImage && (
        <img
          src={secondaryImage}
          alt="Logo2"
          style={sidebarLogoImage}
        />
      )}
    </Box>
  );
};

export default SostenibilidadSidenav;
