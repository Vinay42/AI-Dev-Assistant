
import { Sparkles, Code, Zap, Brain } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative py-12 md:py-20 px-4 md:px-6 text-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      
      {/* Floating icons animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Code className="absolute top-16 md:top-20 left-6 md:left-10 h-6 w-6 md:h-8 md:w-8 text-primary/20 animate-float" style={{ animationDelay: '0s' }} />
        <Zap className="absolute top-24 md:top-32 right-12 md:right-20 h-4 w-4 md:h-6 md:w-6 text-yellow-400/30 animate-float" style={{ animationDelay: '2s' }} />
        <Brain className="absolute bottom-32 md:bottom-40 left-12 md:left-20 h-8 w-8 md:h-10 md:w-10 text-blue-400/20 animate-float" style={{ animationDelay: '4s' }} />
        <Sparkles className="absolute bottom-16 md:bottom-20 right-6 md:right-10 h-6 w-6 md:h-7 md:w-7 text-purple-400/25 animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative max-w-4xl mx-auto animate-fade-in">
        <div className="flex justify-center mb-4 md:mb-6">
          <div className="p-3 md:p-4 bg-gradient-to-r from-primary to-blue-400 rounded-2xl shadow-2xl animate-pulse-glow">
            <Brain className="h-8 w-8 md:h-12 md:w-12 text-white" />
          </div>
        </div>

        <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight">
          Your AI-Powered
          <span className="block gradient-text">Developer Assistant</span>
        </h1>

        <p className="text-base md:text-xl text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed px-2">
          Revolutionize your coding workflow with intelligent code review, instant explanations, 
          error detection, and curated tech insights—all powered by advanced AI.
        </p>

        <div className="flex flex-wrap justify-center gap-2 md:gap-4 text-xs md:text-sm text-muted-foreground">
          <div className="flex items-center gap-2 bg-muted/30 px-3 md:px-4 py-2 rounded-full">
            <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse" />
            Real-time Analysis
          </div>
          <div className="flex items-center gap-2 bg-muted/30 px-3 md:px-4 py-2 rounded-full">
            <div className="h-2 w-2 bg-blue-400 rounded-full animate-pulse" />
            Multi-language Support
          </div>
          <div className="flex items-center gap-2 bg-muted/30 px-3 md:px-4 py-2 rounded-full">
            <div className="h-2 w-2 bg-purple-400 rounded-full animate-pulse" />
            Smart Explanations
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
