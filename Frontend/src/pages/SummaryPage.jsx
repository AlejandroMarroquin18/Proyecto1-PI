import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Card, CardContent, Button } from "@mui/material";

const SummaryPage = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Acceder al estado pasado a través de la navegación

  // Obtener el resumen desde location.state
  const resumen = location.state?.ideasPrincipales?.resumen || [];

  // Si no hay resumen en el estado, redirige al usuario de vuelta a la página de subida
  if (!resumen.length) {
    navigate("/upload");
    return null; // Aseguramos que la página no siga renderizando si no hay resumen
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Resumen Generado
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