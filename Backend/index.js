const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

const app = express();

dotenv.config();

// Middleware para manejar JSON en las solicitudes
app.use(express.json());
const PORT = process.env.PORT || 3000;
// Ruta raíz
app.get('/', (req, res) => {
  res.send('Holap');
});

// Endpoint para manejar una solicitud a la API de Gemini
app.get('/api/gemini', async (req, res) => {
  try {
    const response = await axios.get('https://api.gemini.com/v1/symbols', {
      headers: {
        'X-GEMINI-APIKEY': process.env.GEMINI_API_KEY,
        // Otros headers si es necesario
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error al obtener los datos de Gemini:', error.message);
    res.status(500).json({ error: 'Hubo un problema al conectar con la API de Gemini' });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
