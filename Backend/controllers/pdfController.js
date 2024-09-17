const fs = require('fs');
const pdfParse = require('pdf-parse');
const { extraerIdeasPrincipales } = require('../services/generativeIA');

// Controlador para procesar el archivo PDF
async function procesarPDF(req, res) {
  try {
    // Leer el archivo PDF subido
    const pdfFile = req.file;
    const dataBuffer = fs.readFileSync(pdfFile.path);

    // Extraer texto del PDF usando pdf-parse
    const pdfData = await pdfParse(dataBuffer);
    const extractedText = pdfData.text;

    // Llamar al servicio de IA para extraer las ideas principales
    const ideasPrincipales = await extraerIdeasPrincipales(extractedText);

    res.status(200).json({ ideasPrincipales });
  } catch (error) {
    console.error('Error procesando el PDF:', error);
    res.status(500).json({ error: 'Error procesando el PDF' });
  }
}

module.exports = { procesarPDF };