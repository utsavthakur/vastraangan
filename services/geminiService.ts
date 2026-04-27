import { GoogleGenAI } from "@google/genai";

// Use a safer way to access the API key that works in both dev and production
const getApiKey = () => {
  try {
    return process.env.API_KEY || process.env.GEMINI_API_KEY || '';
  } catch {
    return '';
  }
};

const apiKey = getApiKey();
let ai: GoogleGenAI | null = null;

if (apiKey && apiKey !== 'undefined') {
    ai = new GoogleGenAI({ apiKey });
}

export const getStyleAdvice = async (prompt: string): Promise<string> => {
  if (!ai) {
    console.warn("Gemini API Key not found. Returning mock response.");
    return "Our AI Heritage Consultant is currently offline. Please try again later or consult with Masterji directly.";
  }

  try {
    const model = ai.models;
    const response = await model.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are an expert Indian Heritage Fashion Consultant for BharatTailor Network. 
      Tone: Respectful, knowledgeable about fabrics (Silk, Khadi, Wool, Linen), and culturally aware.
      Provide brief, high-value advice (max 100 words) for the following query: ${prompt}`,
    });
    return response.text || "Unable to generate advice at this moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "We are experiencing high traffic with our AI Consultant. Please try again.";
  }
};
