const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');

dotenv.config();

// Inicializar Gemini con la clave API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function extraerIdeasPrincipales(text) {
  try {
    console.log('Iniciando proceso para extraer ideas principales...');
    console.log('Texto recibido:', text);

    // Obtener el modelo generativo
    console.log('Obteniendo el modelo generativo...');
    const model = await genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Crear un prompt para la IA con el texto extraído del PDF
    const prompt = `Extrae las ideas principales del siguiente texto:\n${text}`;
    console.log('Prompt creado:', prompt);

    // Enviar el prompt al modelo para generar contenido
    console.log('Enviando prompt al modelo...');
    const result = await model.generateContent(prompt);

    // Revisar la respuesta
    console.log('Respuesta recibida:', result);
    const response = await result.response;
    const ideas = response.text();
    console.log('Ideas principales extraídas:', ideas);

    return ideas;
  } catch (error) {
    console.error('Error extrayendo ideas principales:', error.response ? error.response.data : error.message);
    return 'Error extrayendo ideas principales del PDF';
  }
}

module.exports = { extraerIdeasPrincipales };