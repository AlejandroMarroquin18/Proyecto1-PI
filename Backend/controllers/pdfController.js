const pdfParse = require('pdf-parse');
const { extraerIdeasPrincipales } = require('../services/generativeIA');

// Controlador para procesar el archivo PDF
async function procesarPDF(req, res) {
  if (!req.file || !req.file.buffer) {
    return res.status(400).json({ error: 'No se recibió ningún archivo PDF' });
  }

  try {
    // Extraer texto del PDF usando pdf-parse directamente desde el buffer en memoria
    const pdfData = await pdfParse(req.file.buffer);
    const extractedText = pdfData.text;

    // Llamar al servicio de IA para extraer las ideas principales
    const ideasPrincipales = await extraerIdeasPrincipales(extractedText);

    console.log('Ideas Principales:', ideasPrincipales);
    res.status(200).json({ ideasPrincipales });
  } catch (error) {
    console.error('Error procesando el PDF:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

module.exports = { procesarPDF };