import { AnalyzeSymptomsOutput } from "../types";

export const analyzeSymptoms = async (input: string): Promise<AnalyzeSymptomsOutput> => {
  try {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('API Error:', response.status, errorData);
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    return data as AnalyzeSymptomsOutput;

  } catch (error) {
    console.error("Error calling API:", error);
    return {
      possibleConditions: "Unable to analyze symptoms. Please consult a medical professional.",
      medicationSuggestions: ["Consult a pharmacist"],
      precautionaryTips: ["Rest", "Stay hydrated", "Monitor symptoms"],
    };
  }
};
