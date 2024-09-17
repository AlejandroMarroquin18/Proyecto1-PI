const express = require('express');
const { procesarPDF } = require('./controllers/pdfController');  // Controlador para procesar PDFs
const multer = require('multer');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:5173' // Solo permite solicitudes de este origen
}));

// Middleware para manejar JSON en las solicitudes
app.use(express.json());

// Configuración de multer para manejar los archivos en memoria
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext === '.pdf') {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten archivos PDF'), false);
    }
  },
});

// Ruta raíz
app.get('/', (req, res) => {
  res.send('¡Hola, bienvenido al servidor!');
});

// Endpoint para manejar la subida de archivos PDF
app.post('/api/pdf', upload.single('pdf'), procesarPDF);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
