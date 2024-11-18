import React from "react";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  ZoomControl,
  ScaleControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Layers } from "./Layers";

const Map: React.FC<{ mapRef?: React.RefObject<L.Map> }> = ({ mapRef }) => {
  const coord: [number, number] = [40.4637, -3.7492]; // Default coordinates for Spain

  return (
    <div id="map">
      <MapContainer
        style={{ height: "100vh", width: "100%" }}
        center={coord}
        zoom={6.4}
        zoomControl={false}
        scrollWheelZoom={false}
        attributionControl={false}
        ref={mapRef}
      >
        <ZoomControl position="topright" />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Layers />
        <ScaleControl position="bottomright" />
      </MapContainer>
    </div>
  );
};

export default Map;
