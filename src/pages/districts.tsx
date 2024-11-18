import React, { useRef } from "react";
import Map from "../components/maps/Map";

const Districts: React.FC = () => {
  const mapRef = useRef<L.Map | null>(null);
  return <Map mapRef={mapRef} />;
};

export default Districts;
