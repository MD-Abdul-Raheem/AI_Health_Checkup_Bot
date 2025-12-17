import { GoogleGenerativeAI } from "@google/generative-ai";
import { AnalyzeSymptomsOutput } from "../types";



export const analyzeSymptoms = async (input: string): Promise<AnalyzeSymptomsOutput> => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `You are a Clinical Pharmacist AI assistant. Analyze these symptoms and provide a JSON response.

${input}

Provide response in this exact JSON format:
{
  "possibleConditions": "description of possible conditions",
  "medicationSuggestions": ["medication 1", "medication 2"],
  "precautionaryTips": ["tip 1", "tip 2", "tip 3"]
}

Only suggest real OTC medications with brand names like Tylenol (Acetaminophen), Advil (Ibuprofen).`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No valid JSON in response");
    }
    
    const parsedResponse = JSON.parse(jsonMatch[0]) as AnalyzeSymptomsOutput;
    return parsedResponse;

  } catch (error) {
    console.error("Error:", error);
    return {
      possibleConditions: "Unable to analyze symptoms. Please consult a medical professional.",
      medicationSuggestions: ["Consult a pharmacist"],
      precautionaryTips: ["Rest", "Stay hydrated", "Monitor symptoms"],
    };
  }
};