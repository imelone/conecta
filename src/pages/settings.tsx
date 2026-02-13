import React, { useRef } from "react";
import { Box } from "@mui/material";
import Map from "../components/maps/Map";
import { settingsContainer } from "./settings_styles";

const Settings: React.FC = () => {
  const mapRef = useRef<L.Map | null>(null);
  return (
    <Box sx={settingsContainer}>
      <Map mapRef={mapRef} />
    </Box>
  );
};

export default Settings;
