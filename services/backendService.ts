import { Source } from "../types";

export const sendMessageToBackend = async (query: string): Promise<{ text: string; sources: Source[] }> => {
  try {
    const augmentedQuery = `${query}\n\nInstrucciones estrictas: Siempre responde en formato Markdown rico. Usa ## para títulos, - para listas, ** para negritas para énfasis, > para citas de fuentes, y tablas si hay datos. Asegúrate de que el output \'text\' sea estructurado y legible.`;
    const response = await fetch('http://loadbalancer-chatbot-44046910.us-east-1.elb.amazonaws.com/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: augmentedQuery, top_k: 200, max_sentences: 15 }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return {
      text: data.answer || 'No answer provided',
      sources: data.sources_table || []
    };
  } catch (error) {
    console.error("Backend API Error:", error);
    return {
      text: "I apologize, but I encountered an error processing your request. Please try again later.",
      sources: []
    };
  }
};
