const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');

dotenv.config();
// Inicializar Google Generative AI con la clave API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Función de prueba para generar un texto simple
async function generarTextoPrueba() {
  try {
    console.log('Iniciando prueba de generación de texto...');

    // Obtener el modelo generativo
    const model = await genAI.getGenerativeModel({ model: 'gemini-pro' }); // Verifica si 'gemini-pro' es el modelo correcto

    // Crear un prompt sencillo para la prueba
    const prompt = 'Escribe un poema corto sobre el atardecer.';
    console.log('Prompt enviado:', prompt);

    // Enviar el prompt al modelo para generar contenido
    const result = await model.generateContent(prompt);
    const response = await result.response;

    // Extraer el texto generado
    const generatedText = response.text();
    console.log('Texto generado:', generatedText);

    return generatedText;
  } catch (error) {
    console.error('Error en la prueba de generación de texto:', error.response ? error.response.data : error.message);
    return 'Error en la prueba de generación de texto';
  }
}

generarTextoPrueba();
