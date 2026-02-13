import React from "react";
import { Box } from "@mui/material";
import Draggable from "react-draggable";
import { modalContainer, draggableHandle, minimizeButton } from "./draggable_modal_styles";

interface DraggableModalProps {
  isMinimized: boolean;
  setIsMinimized: (minimized: boolean) => void;
  children: React.ReactNode;
}

const DraggableModal: React.FC<DraggableModalProps> = ({
  isMinimized,
  setIsMinimized,
  children,
}) => {
  const toggleMinimized = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <Draggable handle=".draggable-handle" bounds="parent">
      <Box sx={modalContainer}>
        <div>
          <Box className="draggable-handle" sx={draggableHandle}>
            <Box
              component="button"
              onClick={toggleMinimized}
              sx={minimizeButton}
              aria-label={isMinimized ? "Expand modal" : "Minimize modal"}
            >
              {isMinimized ? "+" : "-"}
            </Box>
          </Box>
        </div>
        <div>
          {!isMinimized ? children : <div></div>}
        </div>
      </Box>
    </Draggable>
  );
};

export default DraggableModal;
