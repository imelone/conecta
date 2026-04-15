import React from "react";
import { Box } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import {
  areaInfoComponent, headerStyle, titleStyle, colorCircle,
  iconStyle, textContent,
} from "./data_area_info_styles";

interface AreaInfoComponentProps {
  areaLabel: string;
  areaName: string;
  areaText: string;
  areaColor: string;
  onClose: (name: string) => void;
  removeForestItem: (name: string) => void;
  handleToggleClick: (name: string) => void;
}

const AreaInfoComponent: React.FC<AreaInfoComponentProps> = ({
  areaLabel,
  areaName,
  areaText,
  areaColor,
  onClose,
  removeForestItem,
  handleToggleClick,
}) => {
  const handleClose = () => {
    onClose(areaName);
    removeForestItem(areaName);
    handleToggleClick(areaName);
  };

  return (
    <Box sx={areaInfoComponent}>
      <Box sx={headerStyle}>
        <Box component="h2" sx={titleStyle}>{areaLabel}</Box>
        <div>
          <Box sx={colorCircle} style={{ backgroundColor: areaColor }} />
          <Box sx={iconStyle}>
            <FontAwesomeIcon
              icon={faTimes}
              style={{ fontSize: '1.9em', cursor: 'pointer', color: '#aaa', position: 'absolute', top: 0, right: 0 }}
              onClick={handleClose}
            />
          </Box>
        </div>
      </Box>
      <Box sx={textContent}>
        <p>{areaText}</p>
      </Box>
    </Box>
  );
};

export default AreaInfoComponent;
