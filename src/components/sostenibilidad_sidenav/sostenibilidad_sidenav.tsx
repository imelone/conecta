import React, { useEffect, useState } from "react";
import { TreeMenu } from "../tree_menu/tree_menu"; // Adjust the import path
import styles from "./styles.module.css";

interface Parcel {
  parcela: string;
  properties?: { leyenda?: { name: string; label: string; color: string } };
}

interface Municipio {
  municipio: string;
  parcelas: Parcel[];
}

interface Provincia {
  provincia: string;
  municipios: Municipio[];
}

interface Community {
  comunidad: string;
  provincias: Provincia[];
  descripcion: string[];
}

interface TownListProps {
  sectionMainImg: string;
  communitiesData: any[];
  secondaryImage: string;
  onParcelClick: (parcel: string) => void;
  handleToggleClick: (leyendaName: string) => void;
  handleMunicipioToggleClick: (municipio: string) => void; // Updated parameter name
  activeToggles: any;
  selectedProgram: any;
  programsInfo: any;
  sideBarSelectedOption: any;
}

const SostenibilidadSidenav: React.FC<TownListProps> = ({
  sectionMainImg,
  communitiesData,
  secondaryImage,
  onParcelClick,
  handleToggleClick,
  handleMunicipioToggleClick,
  activeToggles,
  selectedProgram,
  programsInfo,
  sideBarSelectedOption,
}) => {
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
          {sectionMainImg && (
            <img
              src={`/assets/images/sections_menu_main/${sectionMainImg}.png`}
              alt="Logo"
              className="sidebar-logo-image"
              //  layout="intrinsic"
              width={300}
              height={300}
            />
          )}
          {secondaryImage && (
            <img
              src={`/assets/images/sections_menu_main/${secondaryImage}`}
              alt="Logo2"
              className="sidebar-logo-image"
              // layout="intrinsic"
              width={150}
              height={150}
            />
          )}
        </div>

        <ul>
          {programsInfo?.map(
            (
              item:
                | string
                | number
                | bigint
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | Promise<React.AwaitedReactNode>
                | null
                | undefined,
              idx: React.Key | null | undefined
            ) => (
              <li key={idx}>{item}</li>
            )
          )}
        </ul>
      </div>

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
                  const municipioChecked =
                    activeToggles[municipio.municipio] || false;

                  // Handle municipio toggle
                  const handleMunicipioClick = () => {
                    handleMunicipioToggleClick(municipio.municipio);
                  };

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
                                  onChange={() =>
                                    leyenda && handleToggleClick(leyenda.name)
                                  }
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
  );
};

export default SostenibilidadSidenav;