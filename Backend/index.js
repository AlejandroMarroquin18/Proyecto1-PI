const express = require('express');
const { procesarPDF } = require('./controllers/pdfController');  // Controlador para procesar PDFs
const axios = require('axios');
const dotenv = require('dotenv');
const multer = require('multer');  
const path = require('path');     

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para manejar JSON en las solicitudes
app.use(express.json());

// Configuración de multer para subir archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ 
  storage: storage, 
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext === '.pdf') {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten archivos PDF'), false);
    }
  }
});

// Ruta raíz
app.get('/', (req, res) => {
  res.send('¡Hola, bienvenido al servidor!');
});

// Endpoint para manejar la solicitud a la API de Gemini
app.get('/api/gemini', async (req, res) => {
  try {
    const response = await axios.get('https://api.gemini.com/v1/symbols', {
      headers: {
        'X-GEMINI-APIKEY': process.env.GEMINI_API_KEY,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error al obtener los datos de Gemini:', error.message);
    res.status(500).json({ error: 'Hubo un problema al conectar con la API de Gemini' });
  }
});

// Endpoint para manejar la subida de archivos PDF
app.post('/api/pdf', upload.single('pdf'), procesarPDF);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});