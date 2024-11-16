import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/layout";
import Home from "./pages/home";
import Districts from "./pages/districts";
import Settings from "./pages/settings";
import Certificaciones from "./pages/certificaciones/certificaciones";
import CuidaTuBosque from "./pages/cuida_tu_bosque/cuida_tu_bosque";
import NuevosBosques from "./pages/nuevos_bosques/nuevos_bosques";
import Sostenibilidad from "./pages/sostenibilidad/sostenibilidad";
import AulaVerde from "./pages/aula_verde/aula_verde";
// import Map from "./components/maps/Map";

// import { MapContainer, TileLayer } from "react-leaflet";
// import "leaflet/dist/leaflet.css";

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/districts" element={<Districts />} />
          <Route path="/settings" element={<Settings />} />
          <Route
            path="/program/certificaciones"
            element={<Certificaciones />}
          />
          <Route path="/program/cuida-tu-bosque" element={<CuidaTuBosque />} />
          <Route path="/program/nuevos-bosques" element={<NuevosBosques />} />
          <Route path="/program/sostenibilidad" element={<Sostenibilidad />} />
          <Route path="/program/aula-verde" element={<AulaVerde />} />
        </Routes>
      </Layout>
    </Router>
  );
};
export default App;

// import React from "react";
// import { MapContainer, TileLayer } from "react-leaflet";
// import "leaflet/dist/leaflet.css";

// const App = () => (
//   <div id="map">
//     <MapContainer
//       center={[51.505, -0.09]}
//       zoom={13}
//       style={{ height: "100vh", width: "100%" }}
//     >
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
//       />
//     </MapContainer>
//   </div>
// );

// export default App;
