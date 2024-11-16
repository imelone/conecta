import React from "react";

const MapConfig = {
  settings: {
    layout: {
      config: {
        settingsPanel: {
          display: false,
        },
      },
    },
  },
  auth: "menu",
  routes: [
    {
      path: "/map",
      component: React.lazy(() => import("./index")),
    },
  ],
};

export default MapConfig;
