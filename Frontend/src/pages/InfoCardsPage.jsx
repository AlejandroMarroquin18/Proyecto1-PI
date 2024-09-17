import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Card, CardContent, Typography, Grid, Paper } from "@mui/material";

const InfoCardsPage = () => {
  const location = useLocation();
  const ideas = location.state?.ideasPrincipales?.ideas || [];
  const resumen = location.state?.ideasPrincipales?.resumen || [];

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Resumen e Ideas Principales
      </Typography>
      <Paper sx={{ p: 2, mb: 3, backgroundColor: "#f7f7f7" }}>
        <Typography variant="h5" gutterBottom>
          Resumen del Documento
        </Typography>
        {resumen.map((line, index) => (
          <Typography key={index} paragraph sx={{ fontSize: '1.1rem' }}>
            {line}
          </Typography>
        ))}
      </Paper>
      <Typography variant="h5" gutterBottom>
        Ideas Principales
      </Typography>
      <Grid container spacing={2}>
        {ideas.map((idea, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ 
              textAlign: "center", 
              p: 2,
              boxShadow: '1px 1px 10px rgba(0,0,0,0.1)'
            }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{`Idea ${index + 1}`}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {idea}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default InfoCardsPage;