export interface Message {
  id: string;
  sender: 'bot' | 'user';
  content: string | string[];
  type: 'text' | 'conditions' | 'medications' | 'tips' | 'feedback_request' | 'conclusion';
  isLoading?: boolean;
}

export interface AnalyzeSymptomsOutput {
  possibleConditions: string;
  precautionaryTips: string[];
  medicationSuggestions: string[];
}

// Maps to the structure we expect from the AI model
export interface AIResponseSchema {
  possibleConditions: string;
  precautionaryTips: string[];
  medicationSuggestions: string[];
}
