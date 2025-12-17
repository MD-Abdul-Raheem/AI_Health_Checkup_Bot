import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AnalyzeSymptomsOutput } from "../types";

// Schema definition matching the Genkit flow requirements
const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    possibleConditions: {
      type: Type.STRING,
      description: "A summary of possible health conditions based on the symptoms.",
    },
    precautionaryTips: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "2-3 actionable, precautionary tips.",
    },
    medicationSuggestions: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A list of specific, real brand name or generic over-the-counter medications.",
    },
  },
  required: ["possibleConditions", "precautionaryTips", "medicationSuggestions"],
};

export const analyzeSymptoms = async (input: string): Promise<AnalyzeSymptomsOutput> => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found");
  }

  const ai = new GoogleGenAI({ apiKey });

  const systemInstruction = `You are an expert AI medical assistant named HealthChat Assist, acting as a Clinical Pharmacist.
  
  TASK:
  Analyze the user's provided symptoms and pain level to determine possible health conditions.
  
  STRICT MEDICATION GUIDELINES:
  1. **Real & Verifiable**: Suggest ONLY real, commercially available Over-The-Counter (OTC) medications. 
  2. **Naming Convention**: format as "Brand Name (Generic Name)" or "Generic Name (Common Brand)". Example: "Tylenol (Acetaminophen)", "Advil (Ibuprofen)", "Benadryl (Diphenhydramine)".
  3. **Prescription Only**: If the identified condition typically requires antibiotics, steroids, or other prescription-only drugs, DO NOT suggest specific names. Instead, strictly output: "Consult a doctor for prescription medication".
  4. **Safety**: Do not suggest medications that have severe common contraindications without a general warning.
  
  OUTPUT FORMAT:
  1. A list of possible health conditions (summarized in a paragraph).
  2. 2-3 actionable, precautionary tips in bullet points.
  3. A list of suggested over-the-counter medications for the issue.
  
  SAFETY:
  Always be polite and professional. If the symptoms seem severe (e.g., high pain level, chest pain), urge the user to see a doctor immediately.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: input,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.1, // Very low temperature for high factual accuracy on drug names
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from AI");
    }

    const parsedResponse = JSON.parse(text) as AnalyzeSymptomsOutput;
    return parsedResponse;

  } catch (error) {
    console.error("Error analyzing symptoms:", error);
    console.error("API Key present:", !!apiKey);
    console.error("Error details:", JSON.stringify(error, null, 2));
    throw error;
  }
};