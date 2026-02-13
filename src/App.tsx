import React from "react";
import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom";
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

const ProtectedLayout: React.FC = () => (
  <ProtectedRoute>
    <Layout>
      <Outlet />
    </Layout>
  </ProtectedRoute>
);

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedLayout />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="districts" element={<Districts />} />
            <Route path="settings" element={<Settings />} />
            <Route path="program/certificaciones" element={<Certificaciones />} />
            <Route path="program/cuida-tu-bosque" element={<CuidaTuBosque />} />
            <Route path="program/nuevos-bosques" element={<NuevosBosques />} />
            <Route path="program/sostenibilidad" element={<Sostenibilidad />} />
            <Route path="program/aula-verde" element={<AulaVerde />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
