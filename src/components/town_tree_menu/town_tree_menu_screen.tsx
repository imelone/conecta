import React from "react";
import { TreeMenu } from "../tree_menu/tree_menu"; // Adjust the import path
import styles from "./styles.module.css";

interface TownListProps {
  communitiesData: any[];
  handleToggleClick: (leyendaName: string) => void;
  // handleMunicipioToggleClick: (municipio: string) => void; // Updated parameter name
  activeToggles: any;
  selectedProgram: any;
  programsInfo: any;
  sectionImg: string;
  sideBarSelectedOption: any;
}

const TownTreeMenu: React.FC<TownListProps> = ({
  communitiesData,

  handleToggleClick,
  // handleMunicipioToggleClick,
  activeToggles,
  selectedProgram,
  programsInfo,
  sectionImg,
  sideBarSelectedOption,
}) => {
  console.log("communitiesData:", communitiesData);
  console.log("selectedProgram:", selectedProgram);

  return (
    <div className={`${styles.scrollContainer} ${styles.noHorizontalScroll}`}>
      <div>
        <h3
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "1rem",
          }}
        >
          {selectedProgram}
        </h3>

        <div className={styles.logoContainer}>
          <img
            src={`/assets/images/sections_menu_main/${sectionImg}.png`}
            alt="Logo"
            className="sidebar-logo-image"
            width={300}
            height={300}
          />
        </div>

        <ul className={styles.noHorizontalScroll}>
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
                <ul className={styles.menu}>
                  {province?.municipios?.map((municipio: any) => {
                    // const municipioChecked =
                    //   activeToggles[municipio?.municipio] || false;

                    // // Handle municipio toggle
                    // const handleMunicipioClick = () => {
                    //   handleMunicipioToggleClick(municipio.municipio);
                    // };

                    return (
                      <TreeMenu
                        sideBarSelectedOption={sideBarSelectedOption}
                        key={municipio.municipio}
                        title={
                          <div className={styles.municipioWrapper}>
                            <label className={styles.toggleSwitch}>
                              {/* <input
                              type="checkbox"
                              checked={municipioChecked}
                              onChange={handleMunicipioClick}
                            /> */}
                              {/* <span
                              className={styles.slider}
                              style={{
                                backgroundColor: municipioChecked
                                  ? "#4CAF50"
                                  : "#ccc",
                              }}
                            ></span> */}
                              <span className={styles.label}>
                                {municipio.municipio}
                              </span>
                            </label>
                          </div>
                        }
                      >
                        <ul className={styles.parcelList}>
                          {municipio.parcelas.map((parcel: any) => {
                            const leyenda = parcel.properties?.leyenda;
                            const isChecked =
                              activeToggles[leyenda?.name || ""] || false;
                            return (
                              <li key={leyenda?.name || parcel.parcela}>
                                <label className={styles.toggleSwitch}>
                                  <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={(e) => {
                                      // Check the event object to prevent unnecessary re-renders
                                      if (!e.defaultPrevented) {
                                        leyenda &&
                                          handleToggleClick(leyenda.name);
                                      }
                                    }}
                                  />
                                  <span
                                    className={styles.slider}
                                    style={{
                                      backgroundColor: isChecked
                                        ? leyenda?.color
                                        : "#ccc",
                                    }}
                                  ></span>
                                  <span className={styles.label}>
                                    {leyenda?.label || "Unnamed Parcel"}
                                  </span>
                                </label>
                              </li>
                            );
                          })}
                        </ul>
                      </TreeMenu>
                    );
                  })}
                </ul>
              </TreeMenu>
            ))}
          </TreeMenu>
        ))}
      </div>
    </div>
  );
};

export default TownTreeMenu;
