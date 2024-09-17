const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');

dotenv.config();

// Inicializar Gemini con la clave API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function extraerIdeasPrincipales(text) {
  let ideas = []; // Inicializar ideas como un arreglo vacío
  let resumen = []; // Inicializar resumen como un arreglo vacío

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

    Luego de completar el primer paso, necesito que me des un resumen del texto, no más de 2000 palabras, así:
    (**resumen del texto de no más de dos mil palabras**)

    NO olvides los paréntesis ni los asteriscos, es de vital importancia para el programa.

    POR EJEMPLO:

    (**Me encontraba en el parque como de costumbre bajo un árbol. Miraba sus hojas interrumpiendo mi vista hacia el
    cielo casi despejado; podía sentir la brisa marina de la playa como si el mundo no tuviera prisa y las hojas
    cayéndose debido al otoño cercano tampoco tenían la recién nombrada. Pude sentir como la tierra me regalaba
    su amor y cariño con todo eso. Hasta que mi humor paso de feliz a irritable debido a que una persona se acercó
    a mi tapando el enriquecido calor del sol. Mire en diagonal hacia arriba viendo a mi hermana pequeña**)

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

     // Extraer resumen
     console.log('Extrayendo resumen...');
     const resumenRegex = /\(\*\*(.*?)\*\*\)/g;
     resumen = [...responseText.matchAll(resumenRegex)].map(match => match[1]);
     console.log('Resumen:', resumen);

  } catch (error) {
    console.error('Error extrayendo ideas principales:', error);
    // Asegúrate de manejar el error de manera adecuada o de propagarlo
  }

  return { ideas, resumen }; // Devolver las ideas resumen
}

module.exports = { extraerIdeasPrincipales };