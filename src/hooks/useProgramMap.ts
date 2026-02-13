import { useEffect, useState, useRef, useCallback } from "react";
import L, { LatLngTuple } from "leaflet";
import { useLocation } from "react-router-dom";
import { useMunicipioFilter } from "./useMunicipioFilter";

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

interface ProgramMapOptions {
  dataImport: () => Promise<any>;
}

export const useProgramMap = ({ dataImport }: ProgramMapOptions) => {
  const [dataForest, setDataForest] = useState<any[]>([]);
  const mapRef = useRef<L.Map | null>(null);
  const [geoJsonLayers, setGeoJsonLayers] = useState<GeoJsonLayer[]>([]);
  const location = useLocation();
  const [activeToggles, setActiveToggles] = useState<Record<string, boolean>>({});
  const [townsData, setTownsData] = useState<any>(null);
  const [programDescription, setProgramDescription] = useState<any>(null);
  const [sectionImg, setSectionImg] = useState<any>(null);
  const [isDataPanelOpen, setIsDataPanelOpen] = useState(false);

  const { userMunicipio } = useMunicipioFilter();

  const cleanupLayers = () => {
    geoJsonLayers.forEach((layer) => {
      if (mapRef.current) {
        mapRef.current.removeLayer(layer.layer);
      }
    });
    setGeoJsonLayers([]);
  };

  const resetState = () => {
    setDataForest([]);
    setGeoJsonLayers([]);
    setActiveToggles({});
    setIsDataPanelOpen(false);
    cleanupLayers();
  };

  useEffect(() => {
    resetState();
  }, [location]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await dataImport();
        const distritosData = data.default[1].distritos;

        if (distritosData && distritosData.length > 0) {
          const filteredData = distritosData.map((distrito: any) => {
            const newDistrito = { ...distrito };
            newDistrito.provincias = distrito.provincias.map((provincia: any) => {
              const newProvincia = { ...provincia };
              if (userMunicipio === "*") return newProvincia;
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

        setProgramDescription(data.default[0].descripcion);
        setSectionImg(data?.default[0]?.image);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
    loadData();
  }, [userMunicipio]);

  useEffect(() => {
    const anyToggleActive = Object.values(activeToggles).includes(true);
    setIsDataPanelOpen(anyToggleActive);
  }, [activeToggles]);

  const findParcelaInLevels = (
    toggleName: string,
    items: any[] | undefined,
    levels: string[]
  ): Parcela | null => {
    if (!Array.isArray(items)) return null;

    for (const item of items) {
      const foundParcela = item.parcelas?.find(
        (parcela: { properties: { leyenda: { name: string } } }) =>
          parcela.properties?.leyenda?.name === toggleName
      );
      if (foundParcela) return foundParcela;

      if (levels.length > 0) {
        const nextLevelKey = levels[0];
        const nextLevelItems = item[nextLevelKey];
        const foundInNested = findParcelaInLevels(
          toggleName,
          Array.isArray(nextLevelItems) ? nextLevelItems : [],
          levels.slice(1)
        );
        if (foundInNested) return foundInNested;
      }
    }
    return null;
  };

  const createPopupContent = (data: any) => {
    const image = data.properties?.catastrales?.image;
    const title = data.properties?.leyenda?.label;
    if (!image) return "";
    return `
      <div class="image-container">
        <h3>${title}</h3>
        <img src="/assets/images/maps/${image}" alt="Catastrales image" class="popup-image" />
      </div>
    `;
  };

  const addDataToForest = (data: any) => {
    setDataForest((prev: any) => {
      const exists = prev.some(
        (item: any) => item.properties.leyenda.name === data.properties.leyenda.name
      );
      return exists ? prev : [data, ...prev];
    });
  };

  const addPointLayer = async (data: any) => {
    const coordinates = data?.geometry?.coordinates[0][0];
    const latLng: LatLngTuple = [coordinates[1], coordinates[0]];

    const existingLayer = geoJsonLayers.find(
      (layer) => layer.toggleName === data.properties?.leyenda?.name
    );
    if (existingLayer) return;

    const pointLayer = L.circleMarker(latLng, {
      radius: 12,
      fillColor: data?.properties?.leyenda?.color || "#3388ff",
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8,
    });

    if (data.properties?.catastrales?.image) {
      pointLayer.bindPopup(createPopupContent(data));
    }

    if (mapRef.current) {
      pointLayer.addTo(mapRef.current);
      setGeoJsonLayers((prev) => [
        ...prev,
        { toggleName: data.properties?.leyenda?.name, layer: pointLayer },
      ]);
      if (!(coordinates[1] === 0 && coordinates[0] === 0)) {
        mapRef.current.setView([latLng[0], latLng[1] - 0.02], 15);
      }
    }
  };

  const handleToggleOn = async (toggleName: string) => {
    try {
      const levels = ["provincias", "municipios", "parcelas"];
      const foundParcela = findParcelaInLevels(toggleName, townsData, levels);
      if (foundParcela) {
        addDataToForest(foundParcela);
        const coordinates = foundParcela?.geometry?.coordinates;
        if (coordinates && coordinates.length > 0 && foundParcela?.geometry?.type === "Point") {
          await addPointLayer(foundParcela);
        }
      }
    } catch (error) {
      console.error("Error processing data:", error);
    }
  };

  const removeForestItem = (toggleName: any) => {
    setDataForest((prev) =>
      prev.filter((item: any) => item?.properties?.leyenda?.name !== toggleName)
    );
  };

  const handleToggleOff = (toggleName: string) => {
    const layersToRemove = geoJsonLayers.filter(
      (layer) => layer.toggleName === toggleName
    );
    layersToRemove.forEach((layerToRemove) => {
      if (mapRef.current) {
        mapRef.current.removeLayer(layerToRemove.layer);
      }
    });
    setGeoJsonLayers((prev) =>
      prev.filter((layer) => layer.toggleName !== toggleName)
    );
    removeForestItem(toggleName);
  };

  const handleToggle = useCallback(
    async (toggleName: string, isActive: boolean) => {
      if (!mapRef.current) return;
      if (isActive) {
        await handleToggleOn(toggleName);
      } else {
        handleToggleOff(toggleName);
      }
    },
    [geoJsonLayers, townsData]
  );

  const handleToggleClick = useCallback(
    (toggleName: keyof typeof activeToggles) => {
      const newState = !activeToggles[toggleName];
      handleToggle(toggleName, newState);
      setActiveToggles((prev) => ({ ...prev, [toggleName]: newState }));
    },
    [activeToggles, handleToggle]
  );

  return {
    mapRef,
    townsData,
    programDescription,
    sectionImg,
    dataForest,
    activeToggles,
    isDataPanelOpen,
    handleToggleClick,
    removeForestItem,
  };
};
