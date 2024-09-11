import React from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SummaryPage = ({ summary }) => {
  const navigate = useNavigate();

  const handleGoToInfoCards = () => {
    navigate('/info-cards');  // Redirigir a la página de Info Cards
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Resumen del PDF
      </Typography>
      <Card sx={{ maxWidth: 800, margin: 'auto', textAlign: 'center', p: 4 }}>
        <CardContent>
          <Typography variant="body1" gutterBottom>
            {summary ? summary : "Aquí se mostrará el resumen una vez el PDF sea procesado."}
          </Typography>

          {/* Botón para redirigir a Info Cards */}
          {summary && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleGoToInfoCards}
              sx={{ mt: 3 }}
            >
              Ver Info Cards
            </Button>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default SummaryPage;
