import React, { useRef } from "react";
import Map from "../components/maps/Map";
import "./settings.css";

const Settings: React.FC = () => {
  const mapRef = useRef<L.Map | null>(null);
  return (
    <div className="settings-container">
      <Map mapRef={mapRef} />
    </div>
  );
};

export default Settings;
