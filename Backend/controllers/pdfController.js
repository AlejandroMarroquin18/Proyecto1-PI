const fs = require('fs');
const pdfParse = require('pdf-parse');
const { extraerIdeasPrincipales } = require('../services/generativeIA');

// Controlador para procesar el archivo PDF
async function procesarPDF(req, res) {
  if (!req.file || !req.file.path) {
    return res.status(400).json({ error: 'No se recibió ningún archivo PDF' });
  }

  try {
    // Leer el archivo PDF subido
    const pdfFile = req.file;
    const dataBuffer = fs.readFileSync(pdfFile.path);

    // Extraer texto del PDF usando pdf-parse
    const pdfData = await pdfParse(dataBuffer);
    const extractedText = pdfData.text;

    // Llamar al servicio de IA para extraer las ideas principales
    const ideasPrincipales = await extraerIdeasPrincipales(extractedText);

    console.log('Ideas Principales:', ideasPrincipales);
    res.status(200).json({ ideasPrincipales });
  } catch (error) {
    console.error('Error procesando el PDF:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    // Asegurarse de eliminar el archivo PDF después del procesamiento
    if (req.file && req.file.path) {
      fs.unlink(req.file.path, err => {
        if (err) console.error('Error eliminando el archivo:', err);
      });
    }
  }
}

module.exports = { procesarPDF };