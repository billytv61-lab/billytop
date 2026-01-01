
import { GoogleGenAI } from "@google/genai";

export const getMiningInsights = async (balance: number, speed: number) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are an expert AI Mining Advisor for 'RWANDA MINING'. 
      The user currently has a balance of ${balance} RWF and a mining speed of ${speed} units/hour.
      Give them a short, motivational strategy (max 3 sentences) on how to optimize their mining experience on our platform. 
      Mention that they can increase their earnings by mining consistently.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Keep mining consistently to reach your financial goals! Consistency is key in the world of digital mining.";
  }
};
