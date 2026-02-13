import React from "react";
import { Box } from "@mui/material";
import { TreeMenu } from "../tree_menu/tree_menu";
import {
  scrollContainer, logoContainer, menu, toggleSwitch, label, sidebarLogoImage,
} from "./town_tree_menu_styles";

interface TownListProps {
  communitiesData: any[];
  handleToggleClick: (leyendaName: string) => void;
  activeToggles: any;
  selectedProgram: any;
  programsInfo: any;
  sectionImg: string;
  sideBarSelectedOption: any;
}

const TownTreeMenu: React.FC<TownListProps> = ({
  communitiesData,
  handleToggleClick,
  activeToggles,
  selectedProgram,
  programsInfo,
  sectionImg,
  sideBarSelectedOption,
}) => {
  return (
    <Box sx={scrollContainer}>
      <div>
        <h3 style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
          {selectedProgram}
        </h3>

        <Box sx={logoContainer}>
          <img
            src={`/assets/images/sections_menu_main/${sectionImg}.png`}
            alt="Logo"
            style={sidebarLogoImage}
            width={300}
            height={300}
          />
        </Box>

        <ul>
          {programsInfo?.map((item: any, idx: any) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
      <div style={{ justifyContent: "left", width: "100%" }}>
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
                            <Box component="label" sx={toggleSwitch}>
                              <Box component="span" sx={label}>
                                {municipio.municipio}
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
                                <Box component="label" sx={toggleSwitch}>
                                  <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={(e) => {
                                      if (!e.defaultPrevented) {
                                        leyenda && handleToggleClick(leyenda.name);
                                      }
                                    }}
                                    style={{ opacity: 0, width: 0, height: 0, minWidth: '20px' }}
                                  />
                                  <span
                                    className="slider"
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
    </Box>
  );
};

export default TownTreeMenu;
