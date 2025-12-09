import React, { useState, useEffect, useRef } from 'react';
import Button from '../components/Button';
import { analyzeSymptoms } from '../services/genaiService';
import { Message, AnalyzeSymptomsOutput } from '../types';

type ConversationStep = 'initial' | 'awaiting_symptom' | 'awaiting_pain' | 'analyzing' | 'completed';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [conversationStep, setConversationStep] = useState<ConversationStep>('initial');
  const [symptom, setSymptom] = useState('');
  const [feedbackGiven, setFeedbackGiven] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isAnalyzing, conversationStep]);

  // Initial bot message on mount
  useEffect(() => {
    const initialMessage: Message = {
      id: 'init-1',
      sender: 'bot',
      type: 'text',
      content: "Hello! What health issue are you experiencing today?",
    };
    setMessages([initialMessage]);
    setConversationStep('awaiting_symptom');
  }, []);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isAnalyzing || conversationStep === 'completed') return;

    // Handle Symptom Input
    if (conversationStep === 'awaiting_symptom') {
      const userMsg: Message = {
        id: Date.now().toString(),
        sender: 'user',
        type: 'text',
        content: input,
      };
      setMessages((prev) => [...prev, userMsg]);
      setSymptom(input);
      setInput('');
      
      // Trigger Pain Level Selection
      setConversationStep('awaiting_pain');
      setTimeout(() => {
        const botMsg: Message = {
          id: Date.now().toString() + '-ask-pain',
          sender: 'bot',
          type: 'text',
          content: "Could you please indicate your pain level?",
        };
        setMessages((prev) => [...prev, botMsg]);
      }, 500);
      return;
    }
  };

  const handlePainSelection = async (level: 'Low' | 'Normal' | 'High') => {
    if (conversationStep !== 'awaiting_pain') return;

    // Show user selection
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      type: 'text',
      content: `Pain Level: ${level}`,
    };
    setMessages((prev) => [...prev, userMsg]);
    
    setConversationStep('analyzing');
    setIsAnalyzing(true);
    
    // Proceed to Analysis
    await runAnalysis(symptom, level);
  };

  const runAnalysis = async (userSymptom: string, painLevel: string) => {
    try {
      const promptInput = `Symptoms: ${userSymptom}, Pain Level: ${painLevel}`;
      const result: AnalyzeSymptomsOutput = await analyzeSymptoms(promptInput);
      
      // Step 1: Possible Conditions
      const conditionsMsg: Message = {
        id: Date.now().toString() + '-cond',
        sender: 'bot',
        type: 'conditions',
        content: result.possibleConditions,
      };
      setMessages((prev) => [...prev, conditionsMsg]);

      // Delay 1s -> Medications
      setTimeout(() => {
        const medsMsg: Message = {
          id: Date.now().toString() + '-meds',
          sender: 'bot',
          type: 'medications',
          content: result.medicationSuggestions,
        };
        setMessages((prev) => [...prev, medsMsg]);

        // Delay 1s -> Tips
        setTimeout(() => {
          const tipsMsg: Message = {
            id: Date.now().toString() + '-tips',
            sender: 'bot',
            type: 'tips',
            content: result.precautionaryTips,
          };
          
          const feedbackRequestMsg: Message = {
            id: Date.now().toString() + '-feedback',
            sender: 'bot',
            type: 'feedback_request',
            content: '',
          };

          setMessages((prev) => [...prev, tipsMsg, feedbackRequestMsg]);
          setIsAnalyzing(false);
        }, 1000);
      }, 1000);

    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: 'bot',
          type: 'text',
          content: "I apologize, but I encountered an error analyzing your symptoms. Please try again.",
        },
      ]);
      setIsAnalyzing(false);
      setConversationStep('completed'); // Or allow retry
    }
  };

  const handleFeedback = (resolved: boolean) => {
    setFeedbackGiven(true);
    const conclusionMsg: Message = {
      id: Date.now().toString(),
      sender: 'bot',
      type: 'conclusion',
      content: resolved 
        ? "I'm glad I could help! Take care of yourself." 
        : "I'm sorry to hear that. I recommend visiting a specialist for a more detailed examination.",
    };
    setMessages((prev) => prev.map(m => m.type === 'feedback_request' ? { ...m, type: 'text', content: 'Feedback received.' } : m));
    setMessages((prev) => [...prev, conclusionMsg]);
    setConversationStep('completed');
  };

  const restartChat = () => {
    setMessages([{
      id: 'init-restart',
      sender: 'bot',
      type: 'text',
      content: "Hello! What health issue are you experiencing today?",
    }]);
    setConversationStep('awaiting_symptom');
    setSymptom('');
    setFeedbackGiven(false);
    setInput('');
  };

  const renderPainSelector = () => {
    if (conversationStep !== 'awaiting_pain') return null;

    return (
      <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
        <div className="bg-white border text-foreground rounded-2xl rounded-tl-none p-3 sm:p-4 shadow-sm space-y-2 sm:space-y-3 w-full max-w-sm">
           <p className="text-xs sm:text-sm font-medium text-muted-foreground">Select Intensity:</p>
           <div className="flex w-full rounded-lg bg-slate-100 p-1 gap-1">
             <button
               onClick={() => handlePainSelection('Low')}
               className="flex-1 py-1.5 sm:py-2 px-2 sm:px-4 rounded-md text-xs sm:text-sm font-medium transition-all hover:bg-green-100 hover:text-green-700 focus:bg-green-500 focus:text-white text-slate-600"
             >
               Low
             </button>
             <button
               onClick={() => handlePainSelection('Normal')}
               className="flex-1 py-1.5 sm:py-2 px-2 sm:px-4 rounded-md text-xs sm:text-sm font-medium transition-all hover:bg-yellow-100 hover:text-yellow-700 focus:bg-yellow-500 focus:text-white text-slate-600"
             >
               Normal
             </button>
             <button
               onClick={() => handlePainSelection('High')}
               className="flex-1 py-1.5 sm:py-2 px-2 sm:px-4 rounded-md text-xs sm:text-sm font-medium transition-all hover:bg-red-100 hover:text-red-700 focus:bg-red-500 focus:text-white text-slate-600"
             >
               High
             </button>
           </div>
           <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden flex">
             <div className="h-full bg-green-400 w-1/3"></div>
             <div className="h-full bg-yellow-400 w-1/3"></div>
             <div className="h-full bg-red-400 w-1/3"></div>
           </div>
        </div>
      </div>
    );
  };

  const renderMessageContent = (msg: Message) => {
    switch (msg.type) {
      case 'conditions':
        return (
          <div className="space-y-2">
            <p className="font-semibold text-primary">Possible Conditions:</p>
            <p>{msg.content}</p>
          </div>
        );
      case 'medications':
        return (
          <div className="space-y-2">
            <p className="font-semibold text-primary">Suggested Medications:</p>
            <ul className="list-disc pl-5 space-y-1">
              {(msg.content as string[]).map((med, idx) => (
                <li key={idx}>{med}</li>
              ))}
            </ul>
            <p className="text-xs text-muted-foreground mt-2 italic bg-yellow-50 p-2 rounded border border-yellow-100">
              Disclaimer: These are over-the-counter suggestions. Consult a doctor before taking new medication.
            </p>
          </div>
        );
      case 'tips':
        return (
          <div className="space-y-2">
            <p className="font-semibold text-primary">Precautionary Tips:</p>
            <ul className="list-disc pl-5 space-y-1">
              {(msg.content as string[]).map((tip, idx) => (
                <li key={idx}>{tip}</li>
              ))}
            </ul>
          </div>
        );
      case 'feedback_request':
        if (feedbackGiven) return null;
        return (
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-2">
             <p className="w-full sm:w-auto self-center text-xs sm:text-sm text-muted-foreground sm:mr-2">Was this helpful?</p>
            <Button onClick={() => handleFeedback(true)} size="sm" className="bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm">
              It Worked
            </Button>
            <Button onClick={() => handleFeedback(false)} size="sm" variant="destructive" className="text-xs sm:text-sm">
              Issue Not Resolved
            </Button>
          </div>
        );
      case 'conclusion':
        return (
          <div className="space-y-4">
            <p>{msg.content}</p>
            <Button onClick={restartChat} variant="outline" className="w-full">
              Restart Conversation
            </Button>
          </div>
        );
      case 'text':
      default:
        return <p>{msg.content}</p>;
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex items-center justify-center px-2 sm:px-4">
      <div className="w-full max-w-4xl h-[85vh] sm:h-[90vh] bg-card border rounded-xl shadow-xl flex flex-col overflow-hidden">
        {/* Chat Header inside card */}
        <div className="bg-secondary/50 p-3 sm:p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
             <div className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-green-500 animate-pulse"></div>
             <span className="text-sm sm:text-base font-semibold text-secondary-foreground">Dr. AI Assistant</span>
          </div>
          {conversationStep === 'completed' && (
             <Button onClick={restartChat} variant="ghost" size="sm" className="text-xs sm:text-sm">Reset</Button>
          )}
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-3 sm:space-y-4 bg-slate-50/50">
          {messages.map((msg) => {
            if (msg.type === 'feedback_request' && feedbackGiven) return null;
            const isBot = msg.sender === 'bot';
            return (
              <div
                key={msg.id}
                className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[90%] sm:max-w-[85%] md:max-w-[75%] rounded-2xl p-3 sm:p-4 shadow-sm text-sm sm:text-base ${
                    isBot
                      ? 'bg-white border text-foreground rounded-tl-none'
                      : 'bg-primary text-primary-foreground rounded-tr-none'
                  }`}
                >
                  {renderMessageContent(msg)}
                </div>
              </div>
            );
          })}
          
          {/* Custom Pain Selector rendered in flow */}
          {renderPainSelector()}

          {isAnalyzing && (
            <div className="flex justify-start">
              <div className="bg-white border text-foreground rounded-2xl rounded-tl-none p-3 sm:p-4 shadow-sm flex items-center gap-2">
                 <svg className="animate-spin h-4 w-4 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-xs sm:text-sm font-medium">Analyzing symptoms...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-2 sm:p-4 bg-background border-t">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={conversationStep === 'awaiting_symptom' ? "Describe your symptoms..." : "Waiting for response..."}
              className="flex-1 min-h-[44px] sm:min-h-[50px] px-3 sm:px-4 rounded-md border border-input bg-transparent text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isAnalyzing || conversationStep !== 'awaiting_symptom'}
            />
            <Button 
              type="submit" 
              disabled={!input.trim() || isAnalyzing || conversationStep !== 'awaiting_symptom'}
              className="h-[44px] w-[44px] sm:h-[50px] sm:w-[50px] p-0 rounded-full flex-shrink-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
              </svg>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;