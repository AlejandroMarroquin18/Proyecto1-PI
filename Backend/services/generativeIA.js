const dotenv = require('dotenv');
const fetch = require('node-fetch'); 

dotenv.config();

const API_KEY = process.env.GOOGLE_API_KEY;
const API_URL = 'https://generativelanguage.googleapis.com/v1beta2/models/gemini-pro:generateText';

// Función para extraer ideas principales utilizando la API directamente con fetch
async function extraerIdeasPrincipales(text) {
  const prompt = `Extrae las ideas principales del siguiente texto:\n${text}`;

  try {
    // Configurar el cuerpo de la solicitud
    const body = JSON.stringify({
      prompt: {
        text: prompt
      }
    });

    // Hacer la solicitud a la API de Google Generative Language
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: body
    });

    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      throw new Error(`Error en la solicitud a la API: ${response.statusText}`);
    }

    const data = await response.json();

    // Retornar las ideas principales generadas por la API
    return data.candidates[0].output;
  } catch (error) {
    console.error('Error extrayendo ideas principales:', error);
    return 'Error extrayendo ideas principales del PDF';
  }
}

module.exports = { extraerIdeasPrincipales };