const express = require('express');
const { procesarPDF } = require('./controllers/pdfController');  // Controlador para procesar PDFs
const multer = require('multer');
const dotenv = require('dotenv');
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