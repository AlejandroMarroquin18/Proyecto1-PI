const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');

dotenv.config();

// Inicializar Gemini con la clave API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function extraerIdeasPrincipales(text) {
  let ideas = []; // Inicializar ideas como un arreglo vacío
  let questions = []; // Inicializar questions como un arreglo vacío

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
    Devuélve las ideas en formato incluyendo las llaves []:

    [*contenido de la idea 1*][*contenido de la idea 2*][*contenido de la idea 3*]

    POR EJEMPLO:

    [*El niño no jugaba*][*La niña no estaba*][*Los padres eran rusos*]

    Segunda respuesta:

    Luego de completar el primer paso, necesito que me des 3 preguntas, con 4 respuestas de opción múltiple.
    Las preguntas y respuestas deberán estar en este formato:
    {[¿Pregunta 1?] {a. Opción 1} {b. Opción 2} {c. Opción 3} {d. Opción 4}}
    {[¿Pregunta 2?] {a. Opción 1} {b. Opción 2} {c. Opción 3} {d. Opción 4}}
    {[¿Pregunta 3?] {a. Opción 1} {b. Opción 2} {c. Opción 3} {d. Opción 4}}

    POR EJEMPLO:

    {[¿De qué color es la sangre?] {a. Azul} {b. Roja} {c. Morada} {d. Verde}}
    {[¿Cuantas letras tiene es abecedario?] {a. 18} {b. 28} {c. 33} {d. 30}}
    {[¿Que animal es la mariposa?] {a. Insecto} {b. Arácnido} {c. Mamífero} {d. Volador}}

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
    const ideasRegex = /\[\*(.*?)\*\]/g;
    ideas = [...responseText.matchAll(ideasRegex)].map(match => match[1]);
    console.log('Ideas:', ideas);

    // Extraer preguntas y opciones
    console.log('Extrayendo preguntas...');
    const questionsRegex = /\{\[¿(.+?)\?\]\s*\{a\.\s*(.+?)\}\s*\{b\.\s*(.+?)\}\s*\{c\.\s*(.+?)\}\s*\{d\.\s*(.+?)\}\}/g;
    questions = [...responseText.matchAll(questionsRegex)].map(match => {
      return {
        question: match[1].trim(),
        options: {
          a: match[2].trim(),
          b: match[3].trim(),
          c: match[4].trim(),
          d: match[5].trim(),
        }
      };
    });
    console.log('Preguntas:', questions);

  } catch (error) {
    console.error('Error extrayendo ideas principales:', error);
    // Asegúrate de manejar el error de manera adecuada o de propagarlo
  }

  return { ideas, questions }; // Devolver las ideas y preguntas independientemente de los errores
}

module.exports = { extraerIdeasPrincipales };