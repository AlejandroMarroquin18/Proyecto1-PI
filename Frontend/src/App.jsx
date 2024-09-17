import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import UploadPage from "./pages/UploadPage";
import InfoCardsPage from "./pages/InfoCardsPage";
import SummaryPage from "./pages/SummaryPage";
import { Box, CssBaseline, AppBar, Toolbar, Typography } from "@mui/material";

function App() {
  const [summary, setSummary] = useState(""); // Estado para almacenar el resumen del PDF

  return (
    <Router>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <Sidebar />

        <Box component="main" sx={{ flexGrow: 1 }}>
          <AppBar
            position="fixed"
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor:"#FEFEFE" }}
          >
            <Toolbar>
              <img
                src="/Logo.png"
                alt="Logo"
                style={{ height: "60px", marginRight: "20px" }}
              />
              <Typography variant="h6" noWrap color= "Black">
                PDF Summarizer
              </Typography>
            </Toolbar>
          </AppBar>

          <Toolbar />

          <Box sx={{ p: 3 }}>
            <Routes>
              <Route
                path="/"
                element={<UploadPage setSummary={setSummary} />}
              />
              <Route path="/info-cards" element={<InfoCardsPage />} />
              <Route
                path="/resumen"
                element={<SummaryPage summary={summary} />}
              />
              {/* Agregar ruta comodín para redirigir a UploadPage si la ruta no existe */}
              <Route
                path="*"
                element={<UploadPage setSummary={setSummary} />}
              />
            </Routes>
          </Box>
        </Box>
      </Box>
    </Router>
  );
}

export default App;