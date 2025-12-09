import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center space-y-8 animate-in fade-in zoom-in duration-500">
        <div className="bg-card text-card-foreground rounded-xl border shadow-lg p-6 sm:p-10 md:p-16">
          <div className="mb-4 sm:mb-6 flex justify-center">
             <div className="p-3 sm:p-4 bg-primary/10 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 sm:w-16 sm:h-16 text-primary">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
             </div>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-3 sm:mb-4 text-primary">
            Welcome to HealthChat Assist
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-10">
            Your AI-powered health assistant. Get preliminary advice, medication suggestions, and tips in seconds.
          </p>
          <Button 
            onClick={() => navigate('/chat')} 
            size="lg" 
            className="w-full sm:w-auto text-base sm:text-lg px-8 sm:px-12 py-4 sm:py-6 h-auto"
          >
            Start Chat
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;