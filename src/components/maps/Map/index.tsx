import React from "react";
import L, { Map as LeafletMap } from "leaflet";
import {
  MapContainer,
  TileLayer,
  ZoomControl,
  ScaleControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Import Leaflet's CSS for basic styling

// Define the Map component
const Map: React.FC<{ mapRef: React.RefObject<L.Map | null> }> = ({
  mapRef,
}) => {
  const coord: [number, number] = [40.4637, -3.7492]; // Default coordinates for Spain

  return (
    <div id="map">
      <MapContainer
        style={{ height: "100vh", width: "100%" }}
        center={coord}
        zoom={6.4}
        zoomControl={false}
        scrollWheelZoom={false}
        ref={mapRef} // Map reference passed here
      >
        <ZoomControl position="topright" />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />
        <ScaleControl position="bottomright" />
      </MapContainer>
    </div>
  );
};

export default Map;
