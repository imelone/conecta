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
import Login from "./pages/login/login";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import NotFound from "./components/NotFound";
// import Map from "./components/maps/Map";

// import { MapContainer, TileLayer } from "react-leaflet";
// import "leaflet/dist/leaflet.css";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Layout>
                <Home />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/home" element={
            <ProtectedRoute>
              <Layout>
                <Home />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/districts" element={
            <ProtectedRoute>
              <Layout>
                <Districts />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute>
              <Layout>
                <Settings />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/program/certificaciones" element={
            <ProtectedRoute>
              <Layout>
                <Certificaciones />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/program/cuida-tu-bosque" element={
            <ProtectedRoute>
              <Layout>
                <CuidaTuBosque />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/program/nuevos-bosques" element={
            <ProtectedRoute>
              <Layout>
                <NuevosBosques />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/program/sostenibilidad" element={
            <ProtectedRoute>
              <Layout>
                <Sostenibilidad />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/program/aula-verde" element={
            <ProtectedRoute>
              <Layout>
                <AulaVerde />
              </Layout>
            </ProtectedRoute>
          } />
          {/* Catch-all route for handling URLs that don't match any defined routes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
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
