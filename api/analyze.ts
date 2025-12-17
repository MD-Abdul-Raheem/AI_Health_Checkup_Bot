import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const { input } = req.body;
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

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No valid JSON in response");
    }
    
    const parsedResponse = JSON.parse(jsonMatch[0]);
    return res.status(200).json(parsedResponse);

  } catch (error: any) {
    console.error("Error:", error);
    return res.status(500).json({
      possibleConditions: "Unable to analyze symptoms. Please consult a medical professional.",
      medicationSuggestions: ["Consult a pharmacist"],
      precautionaryTips: ["Rest", "Stay hydrated", "Monitor symptoms"],
    });
  }
}
