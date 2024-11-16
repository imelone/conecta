import React, { useState, useRef } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Import Leaflet's CSS for basic styling

const Map = () => {
  const [coord] = useState<[number, number]>([40.4637, -3.7492]); // Default coordinates for Spain
  const mapRef = useRef<L.Map | null>(null); // Reference to the map instance

  return (
    <div id="map">
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />
      </MapContainer>
    </div>
  );
};

export default Map;
