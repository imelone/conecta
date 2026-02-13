import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { container, header, icon, title, content, levelStyles } from "./tree_menu_styles";

interface AccordionProps {
  title: any;
  children: React.ReactNode;
  level?: number;
  selectedProgram?: string;
  sideBarSelectedOption: string;
}

export const TreeMenu: React.FC<AccordionProps> = ({
  title: titleProp,
  children,
  level = 0,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const toggleContent = () => {
    setIsOpen((prev) => !prev);
  };

  const levelSx = levelStyles[`level-${level}`] || {};

  return (
    <Box sx={{ ...container as object, ...levelSx as object }}>
      <Box sx={header} onClick={toggleContent}>
        <Box component="span" sx={icon}>
          <FontAwesomeIcon icon={isOpen ? faMinus : faPlus} />
        </Box>
        <Box component="h3" sx={title}>{titleProp}</Box>
      </Box>
      {isOpen && <Box sx={content}>{children}</Box>}
    </Box>
  );
};

export default TreeMenu;
