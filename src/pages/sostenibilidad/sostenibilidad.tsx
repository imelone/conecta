import React, { useEffect, useState, useRef, useCallback } from "react";
import Map from "../../components/maps/Map";
import SidenavPane from "../../components/sidenav_pane/sidenav_pane";
import L, { LatLngTuple } from "leaflet"; // Make sure L is imported for the map type
import "./sostenibilidad.css";
import "leaflet/dist/leaflet.css";
import { useLocation } from "react-router-dom";
import SostenibilidadSidenav from "../../components/sostenibilidad_sidenav/sostenibilidad_sidenav";
import DataAnalysisSostenibilidad from "../../components/data_analisis_sostenibilidad/data_analisis_sostenibilidad_screen";
import reduzcoCalculoImg from "../../../public/assets/images/sections_menu_main/reduzco_calculo_compenso_main.png";
import { useMunicipioFilter } from "../../hooks/useMunicipioFilter";

interface GeoJsonLayer {
  toggleName: string;
  layer: L.Layer;
}
interface Parcela {
  properties: {
    leyenda: {
      name: string;
    };
  };
  parcelas?: Parcela[];
  geometry?: { coordinates: []; type: string };
}

const Sostenibilidad: React.FC = () => {
  const [dataForest, setDataForest] = useState([]);
  const mapRef = useRef<L.Map | null>(null); // Initialize mapRef as L.Map or null
  const [geoJsonLayers, setGeoJsonLayers] = useState<GeoJsonLayer[]>([]);
  const location = useLocation();
  const [activeToggles, setActiveToggles] = useState<Record<string, boolean>>(
    {}
  );
  const [townsData, setTownsData] = useState<any>(null);
  // const [programDescription, setProgramDescription] = useState<any>(null);
  const [sectionImg, setSectionImg] = useState<any>(null);
  const [isDataAnalysisCuidaTuBosqueOpen, setIsDataAnalysisCuidaTuBosqueOpen] =
    useState<boolean>(false);
  const resetState = () => {
    // Reset any necessary state
    setDataForest([]);
    setGeoJsonLayers([]);
    setActiveToggles({});
    setIsDataAnalysisCuidaTuBosqueOpen(false);
    cleanupLayers();
  };

  useEffect(() => {
    resetState();
  }, [location]);

  // Use the municipio filter hook
  const { userMunicipio } = useMunicipioFilter();

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await import("../../data/programas/sostenibilidad.json");
        
        // Apply municipality filter to the data
        const distritosData = data.default[1].distritos;
        
        // Filter municipios based on user's assigned municipality
        if (distritosData && distritosData.length > 0) {
          const filteredData = distritosData.map(distrito => {
            // Create a deep copy to avoid mutating the original data
            const newDistrito = { ...distrito };
            
            // Filter at the provincia level
            newDistrito.provincias = distrito.provincias.map(provincia => {
              // Create a copy of the provincia
              const newProvincia = { ...provincia };
              
              // Admin users (municipio="*") can see all municipalities
              if (userMunicipio === "*") {
                return newProvincia;
              }
              
              // Filter municipios for regular users
              newProvincia.municipios = provincia.municipios.filter(
                (m: { municipio: string }) => m.municipio === userMunicipio
              );
              
              return newProvincia;
            });
            
            return newDistrito;
          });
          
          setTownsData(filteredData);
        } else {
          setTownsData([]);
        }
        
        //   setProgramDescription(data.default[0].descripcion);
        setSectionImg(data?.default[0]?.image);
        console.log("data:", data.default[0]);
        console.log("User municipio:", userMunicipio);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
    loadData();
  }, [userMunicipio]);

  useEffect(() => {
    // Check if any toggle is active
    const anyToggleActive = Object.values(activeToggles).includes(true);
    console.log("anyToggleActive: ", anyToggleActive);
    // Set isDataAnalysisCuidaTuBosqueOpen based on toggle state
    setIsDataAnalysisCuidaTuBosqueOpen(anyToggleActive);
  }, [activeToggles]);

  const cleanupLayers = () => {
    geoJsonLayers.forEach((layer) => {
      if (mapRef.current) {
        mapRef.current.removeLayer(layer.layer); // Remove the actual layer object (not GeoJsonLayer)
      }
    });
    setGeoJsonLayers([]); // Clears the GeoJSON state
  };

  const handleToggleOn = async (toggleName: string) => {
    try {
      const levels = ["provincias", "municipios", "parcelas"];
      const foundParcela = findParcelaByName(toggleName, townsData, levels);
      console.log("foundParcela: ", foundParcela);

      if (foundParcela) {
        // Check if coordinates are present
        addDataToForest(foundParcela);
        const coordinates = foundParcela?.geometry?.coordinates;
        if (coordinates && coordinates.length > 0) {
          if (foundParcela?.geometry?.type === "Point") {
            console.log("entra add point layer");
            await addPointLayer(foundParcela);
          }
        } else {
          console.warn(`No coordinates found for toggleName: ${toggleName}`);
        }
        // Always add data to the forest regardless of coordinates
        console.log("foundParcela: ", foundParcela);
        // addDataToForest(foundParcela);
      } else {
        console.warn(`No parcel found for toggleName: ${toggleName}`);
      }
    } catch (error) {
      console.error("Error processing data:", error);
    }
  };
  const addPointLayer = async (data: any) => {
    const coordinates = data?.geometry?.coordinates[0][0];
    const latLng: LatLngTuple = [coordinates[1], coordinates[0]];

    // Check if a layer with the same toggleName already exists
    const existingLayer = geoJsonLayers.find(
      (layer) => layer.toggleName === data.properties?.leyenda?.name
    );

    if (existingLayer) {
      console.log(`Layer "${data.properties?.leyenda?.name}" already exists.`);
      return; // Prevent adding a duplicate layer
    }

    // Create a new circle marker
    const pointLayer = L.circleMarker(latLng, {
      radius: 12,
      fillColor: data?.properties?.leyenda?.color || "#3388ff",
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8,
    });

    // Add popup content if available
    if (data.properties?.catastrales?.image) {
      const popupContent = createPopupContent(data);
      pointLayer.bindPopup(popupContent);
    }

    // Add the new layer to the map

    if (mapRef.current) {
      // Add the new layer to the map
      pointLayer.addTo(mapRef.current);

      // Update the state to include the new layer
      console.log("geojsonLayers: ", geoJsonLayers);
      setGeoJsonLayers((prevLayers) => [
        ...prevLayers,
        { toggleName: data.properties?.leyenda?.name, layer: pointLayer },
      ]);

      // Adjust the map view to focus on the new marker
      if (!(coordinates[1] === 0 && coordinates[0] === 0)) {
        mapRef.current.setView([latLng[0], latLng[1] - 0.02], 15);
      }
    } else {
      console.error("Map reference is null, cannot add layer.");
    }
  };

  const addDataToForest = (data: any) => {
    setDataForest((prevDataForest: any) => {
      const isDataExists = prevDataForest.some(
        (item: any) =>
          item.properties.leyenda.name === data.properties.leyenda.name
      );

      if (!isDataExists) {
        return [data, ...prevDataForest];
      }

      return prevDataForest;
    });
  };
  const findParcelaInLevels = (
    toggleName: string,
    items: any[] | undefined,
    levels: string[]
  ): Parcela | null => {
    if (!Array.isArray(items)) {
      console.error("Expected items to be an array, but got:", items);
      return null;
    }

    for (const item of items) {
      console.log("Checking item:", item); // Debug: log current item

      // Check for parcelas at the current level
      const foundParcela = item.parcelas?.find(
        (parcela: { properties: { leyenda: { name: string } } }) =>
          parcela.properties?.leyenda?.name === toggleName
      );

      if (foundParcela) {
        return foundParcela; // Return if found
      }

      // If there are more levels to check
      if (levels.length > 0) {
        const nextLevelKey = levels[0]; // Get the next level key
        const nextLevelItems = item[nextLevelKey];

        // Log the next level being processed
        console.log(`Checking next level (${nextLevelKey}):`, nextLevelItems);

        const foundInNested = findParcelaInLevels(
          toggleName,
          Array.isArray(nextLevelItems) ? nextLevelItems : [],
          levels.slice(1)
        );
        if (foundInNested) return foundInNested;
      }
    }

    console.warn(`No parcel found for toggleName: ${toggleName}`); // Log the warning
    return null; // Return null if not found in any levels
  };

  const findParcelaByName = (
    toggleName: string,
    townsList: any[],
    levels: string[]
  ) => {
    return findParcelaInLevels(toggleName, townsList, levels);
  };
  const createPopupContent = (data: {
    properties: { catastrales: { image: any }; leyenda: { label: any } };
  }) => {
    const image = data.properties?.catastrales?.image;
    const title = data.properties?.leyenda?.label;

    if (image) {
      return `
        <div class="image-container">
          <h3>${title}</h3>
          <img src="/assets/images/maps/${image}" alt="Catastrales image" class="popup-image" />
        </div>
      `;
    }
    return "";
  };

  const handleToggleOff = (toggleName: string) => {
    console.log("Layer to be removed:", toggleName);

    // Find the specific layer to remove from geoJsonLayers
    const layersToRemove = geoJsonLayers.filter(
      (layer) => layer.toggleName === toggleName
    );

    layersToRemove.forEach((layerToRemove) => {
      if (mapRef.current) {
        mapRef.current.removeLayer(layerToRemove.layer); // Ensure it's removed from the map
      }
    });

    // Remove the layer from geoJsonLayers state
    setGeoJsonLayers((prevLayers) =>
      prevLayers.filter((layer) => layer.toggleName !== toggleName)
    );

    // Remove data from forest (if necessary)
    removeForestItem(toggleName);
  };
  const handleToggle = useCallback(
    async (toggleName: string, isActive: boolean) => {
      if (!mapRef.current) {
        return;
      }

      console.log("Toggling:", toggleName, "isActive:", isActive);
      if (isActive) {
        console.log("isActive: ", isActive);
        console.log("Executing handleToggleOn");

        await handleToggleOn(toggleName);
      } else {
        console.log("Executing handleToggleOff");
        handleToggleOff(toggleName);
      }
    },
    [geoJsonLayers, townsData]
  );

  const handleToggleClick = useCallback(
    (toggleName: keyof typeof activeToggles) => {
      console.log("Toggling:", toggleName);

      // Directly trigger handleToggle, without waiting for the setState
      const newState = !activeToggles[toggleName];
      handleToggle(toggleName, newState); // Trigger the toggle function immediately

      // Update state only after calling handleToggle
      setActiveToggles((prevToggles) => ({
        ...prevToggles,
        [toggleName]: newState,
      }));

      console.log("State after toggle:", activeToggles);
    },
    [activeToggles, handleToggle]
  );

  const removeForestItem = (toggleName: any) => {
    setDataForest((prevDataForest) => {
      const updatedDataForest = prevDataForest.filter((item: any) => {
        return item?.properties?.leyenda?.name !== toggleName;
      });
      return updatedDataForest;
    });
  };

  return (
    <div id="map">
      <SidenavPane activePane={"1"} paneId={"1"}>
        <SostenibilidadSidenav
          communitiesData={townsData}
          handleToggleClick={handleToggleClick}
          activeToggles={activeToggles}
          selectedProgram={"SOSTENIBILIDAD"}
          //  sectionImg={sectionImg}
          sideBarSelectedOption={undefined}
          sectionMainImg={sectionImg}
          secondaryImage={reduzcoCalculoImg}
        />
      </SidenavPane>

      <Map mapRef={mapRef} />
      {isDataAnalysisCuidaTuBosqueOpen && (
        <DataAnalysisSostenibilidad
          isOpen={true}
          data={dataForest}
          removeForestItem={removeForestItem}
          handleToggleClick={handleToggleClick}
          // activeToggles={activeToggles}
        />
      )}
    </div>
  );
};

export default Sostenibilidad;
