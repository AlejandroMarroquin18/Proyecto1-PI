import React from "react";
import { Box, Typography, Card, CardContent, Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const SummaryPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const resumen = location.state?.ideasPrincipales?.resumen || [];

  // Si no hay resumen, redirige al usuario de vuelta a la página de subida
  if (!resumen.lenght) {
    navigate("/upload");
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Resumen Generado
        {/*resumen*/}
      </Typography>
      <Card sx={{ backgroundColor: "#FEFEFE", maxWidth: 800, margin: "auto", p: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Aquí tienes el resumen de tu archivo PDF:
          </Typography>

          <Box
            sx={{
              backgroundColor: "#F5F5F5",
              padding: 2,
              borderRadius: "8px",
              maxHeight: "400px",
              overflowY: "auto", // Habilita el scroll si el resumen es muy largo
            }}
          >
            {resumen.length > 0 ? (
              resumen.map((parrafo, index) => (
                <Typography key={index} variant="body1" paragraph sx={{ whiteSpace: "pre-line" }}>
                  {parrafo}
                </Typography>
              ))
            ) : (
              <Typography variant="body1">No hay resumen disponible.</Typography>
            )}
          </Box>

          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: 4 }}
            onClick={() => navigate("/upload")} // Botón para subir otro archivo
          >
            Subir Otro PDF
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SummaryPage;