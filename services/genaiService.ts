import { AnalyzeSymptomsOutput } from "../types";

export const analyzeSymptoms = async (input: string): Promise<AnalyzeSymptomsOutput> => {
  try {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input }),
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    return data as AnalyzeSymptomsOutput;

  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
