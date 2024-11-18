import React, { useRef } from "react";
import Map from "../components/maps/Map";

const Settings: React.FC = () => {
  const mapRef = useRef<L.Map | null>(null);
  return <Map mapRef={mapRef} />;
};

export default Settings;
