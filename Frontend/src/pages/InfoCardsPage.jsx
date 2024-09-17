import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Card, CardContent, Typography, Grid } from "@mui/material";

const InfoCardsPage = () => {
  const location = useLocation();
  // Accediendo al objeto y luego al arreglo dentro del objeto
  const ideas = location.state?.ideasPrincipales?.ideas || [];

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Ideas Principales
      </Typography>
      <Grid container spacing={3}>
        {ideas.length > 0 ? (
          ideas.map((idea, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ textAlign: "center", p: 2 }}>
                <CardContent>
                  <Typography variant="h6">{`Idea ${index + 1}`}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {idea}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1">No hay ideas principales para mostrar.</Typography>
        )}
      </Grid>
    </Box>
  );
};

export default InfoCardsPage;
