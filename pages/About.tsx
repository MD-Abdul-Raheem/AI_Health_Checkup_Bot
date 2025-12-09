import React from 'react';

const About: React.FC = () => {
  return (
    <div className="flex-1 flex justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="max-w-4xl w-full bg-card rounded-2xl shadow-lg border border-border/50 p-4 sm:p-6 md:p-8 lg:p-12 space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Header Section */}
        <div className="space-y-3 sm:space-y-4 text-center border-b border-border/40 pb-6 sm:pb-8">
          <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center mb-3 sm:mb-4">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 sm:w-8 sm:h-8 text-primary">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">About HealthChat Assist</h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-2">
            Your intelligent companion for preliminary health insights, powered by state-of-the-art AI.
          </p>
        </div>

        {/* Core Mission */}
        <section className="space-y-3 sm:space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-primary flex items-center gap-2">
            <span className="w-1 h-5 sm:h-6 bg-secondary rounded-full"></span>
            Our Mission
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
            HealthChat Assist bridges the gap between uncertainty and actionable information. 
            We aim to provide users with instant, understandable, and structured health information based on their symptoms. 
            Whether it's a minor ache or a confusing set of symptoms, our AI assistant helps you navigate the first steps of care.
          </p>
        </section>

        {/* Features Grid */}
        <section className="grid sm:grid-cols-2 gap-4 sm:gap-6">
           <div className="p-4 sm:p-6 rounded-xl bg-accent/30 border border-accent/50 space-y-2 sm:space-y-3 hover:bg-accent/40 transition-colors cursor-default">
             <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-lg shadow-sm flex items-center justify-center text-primary font-bold text-sm sm:text-base">
               01
             </div>
             <h3 className="text-lg sm:text-xl font-semibold text-foreground">Symptom Analysis</h3>
             <p className="text-sm sm:text-base text-muted-foreground">
               Advanced natural language processing understands your symptoms in plain English, analyzing context and severity.
             </p>
           </div>
           
           <div className="p-4 sm:p-6 rounded-xl bg-accent/30 border border-accent/50 space-y-2 sm:space-y-3 hover:bg-accent/40 transition-colors cursor-default">
             <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-lg shadow-sm flex items-center justify-center text-primary font-bold text-sm sm:text-base">
               02
             </div>
             <h3 className="text-lg sm:text-xl font-semibold text-foreground">Interactive Pain Scale</h3>
             <p className="text-sm sm:text-base text-muted-foreground">
               An intuitive visual radius bar allows you to precisely communicate your pain level (Low, Normal, High), refining the AI's assessment.
             </p>
           </div>

           <div className="p-4 sm:p-6 rounded-xl bg-accent/30 border border-accent/50 space-y-2 sm:space-y-3 hover:bg-accent/40 transition-colors cursor-default">
             <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-lg shadow-sm flex items-center justify-center text-primary font-bold text-sm sm:text-base">
               03
             </div>
             <h3 className="text-lg sm:text-xl font-semibold text-foreground">Medication Insights</h3>
             <p className="text-sm sm:text-base text-muted-foreground">
               Get suggestions for real, existing Over-The-Counter (OTC) medications, including both generic and brand names.
             </p>
           </div>

           <div className="p-4 sm:p-6 rounded-xl bg-accent/30 border border-accent/50 space-y-2 sm:space-y-3 hover:bg-accent/40 transition-colors cursor-default">
             <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-lg shadow-sm flex items-center justify-center text-primary font-bold text-sm sm:text-base">
               04
             </div>
             <h3 className="text-lg sm:text-xl font-semibold text-foreground">Actionable Tips</h3>
             <p className="text-sm sm:text-base text-muted-foreground">
               Receive immediate precautionary measures and lifestyle tips to help manage your condition while you wait for professional care.
             </p>
           </div>
        </section>

        {/* Tech Stack */}
        <section className="space-y-3 sm:space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-primary flex items-center gap-2">
            <span className="w-1 h-5 sm:h-6 bg-secondary rounded-full"></span>
            Technology Stack
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Built with performance and reliability in mind, HealthChat Assist utilizes a modern web stack:
          </p>
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 pt-2">
            <li className="flex items-center gap-2 bg-secondary/50 p-2 rounded-lg font-medium text-xs sm:text-sm text-center justify-center">
              React 19
            </li>
            <li className="flex items-center gap-2 bg-secondary/50 p-2 rounded-lg font-medium text-xs sm:text-sm text-center justify-center">
              Google Gemini API
            </li>
            <li className="flex items-center gap-2 bg-secondary/50 p-2 rounded-lg font-medium text-xs sm:text-sm text-center justify-center">
              Tailwind CSS
            </li>
            <li className="flex items-center gap-2 bg-secondary/50 p-2 rounded-lg font-medium text-xs sm:text-sm text-center justify-center">
              Google GenAI SDK
            </li>
          </ul>
        </section>

        {/* Disclaimer */}
        <div className="bg-orange-50 dark:bg-orange-950/30 p-4 sm:p-6 rounded-xl border border-orange-200 dark:border-orange-800/50 flex gap-3 sm:gap-4 items-start">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600 flex-shrink-0 mt-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            <div className="space-y-1">
              <h4 className="text-sm sm:text-base font-semibold text-orange-800 dark:text-orange-200">Medical Disclaimer</h4>
              <p className="text-xs sm:text-sm text-orange-700 dark:text-orange-300 leading-relaxed">
                HealthChat Assist is an AI demonstration tool and does <strong>not</strong> provide professional medical diagnosis or treatment. 
                The suggestions provided are for informational purposes only. Always consult with a qualified healthcare provider for any medical concerns. 
                If you are experiencing a medical emergency, call emergency services immediately.
              </p>
            </div>
        </div>
        
        <div className="text-center pt-6 sm:pt-8 text-xs sm:text-sm text-muted-foreground border-t">
          © {new Date().getFullYear()} HealthChat Assist. Powered by Google Gemini.
        </div>

      </div>
    </div>
  );
};

export default About;