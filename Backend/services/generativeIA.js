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

    // Crear un prompt para la IA con el texto extraído del documento
    const prompt = `Te voy a pasar el siguiente texto, extraído de un documento: \n${text}
    
    Piensa que eres un estudiante y deseas repasar para un parcial. De acuerdo a esto, quiero que me devuelvas 2 respuestas:

    Primera respuesta:
    Necesito que, luego de leer este texto, me des 3 ideas principales del mismo, en máximo 30 palabras.
    Devuélveme estas ideas en formato:

    [IDEA 1: *contenido de la idea.*][IDEA 2: *contenido de la idea.*][IDEA 3: contenido de la idea.*]

    Segunda respuesta:

    Luego de completar el primer paso, necesito que me des 3 preguntas, con 4 respuestas de opción múltiple.
    Devuélvelas en este formato:
    {PREGUNTA 1: *¿Pregunta 1?--a.Opción 1--b.Opción 2--c.Opción 3--d.Opción 4*}---{PREGUNTA 2: *¿Pregunta 2?--a.Opción 1--b.Opción 2--c.Opción 3--d.Opción 4*}---{PREGUNTA 3: *¿Pregunta 3?--a.Opción 1--b.Opción 2--c.Opción 3--d.Opción 4*}

    Limita la creatividad y aumenta la precisión.
    `;
    console.log('Prompt creado:', prompt);

    // Enviar el prompt al modelo para generar contenido
    console.log('Enviando prompt al modelo...');
    const result = await model.generateContent(prompt);
    console.log('Respuesta recibida:', result);

    // Procesar la respuesta
    const responseText = result.response.text();
    console.log('Texto de la respuesta:', responseText);

    // Extraer ideas
    console.log('Extrayendo ideas...');
    const ideasRegex = /\[IDEA \d+: \*(.*?)\*\]/g;
    const ideas = [...responseText.matchAll(ideasRegex)].map(match => match[1]);
    console.log('Ideas:', ideas);

    // Extraer preguntas
    console.log('Extrayendo preguntas...');
    const questionsRegex = /\{PREGUNTA \d+: \*(.+?)\*\}/g;
    const questions = [...responseText.matchAll(questionsRegex)].map(match => {
      const fullQuestion = match[1].split('--');
      return {
        question: fullQuestion[0].trim(),
        options: fullQuestion.slice(1).map(option => option.trim())
      };
    });
    console.log('Preguntas:', questions);

    return { ideas, questions };

  } catch (error) {
    console.error('Error extrayendo ideas principales:', error);
  }
}

module.exports = { extraerIdeasPrincipales };