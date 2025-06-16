import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeatureCard from '@/components/FeatureCard';
import TechArticles from '@/components/TechArticles';
import AnalysisModal from '@/components/AnalysisModal';
import { CheckCircle, Code, Bug, BookOpen, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState({
    type: null,
    title: '',
  });

  const features = [
    {
      icon: CheckCircle,
      title: "AI Code Review",
      description: "Get intelligent feedback on your code quality, performance optimizations, and best practices with detailed suggestions for improvement.",
      buttonText: "Start Review",
      gradient: "from-green-500 to-emerald-600",
      onClick: () => setActiveModal({ type: 'review', title: 'AI Code Review' })
    },
    {
      icon: BookOpen,
      title: "Code Explanation",
      description: "Understand complex code snippets with AI-powered explanations. Choose between simplified overviews or deep technical analysis.",
      buttonText: "Explain Code",
      gradient: "from-blue-500 to-cyan-600",
      onClick: () => setActiveModal({ type: 'explain', title: 'Code Explanation' })
    },
    {
      icon: Bug,
      title: "Error Analysis",
      description: "Identify bugs, runtime errors, and potential issues in your code with smart suggestions for fixes and prevention strategies.",
      buttonText: "Debug Code",
      gradient: "from-red-500 to-rose-600",
      onClick: () => setActiveModal({ type: 'debug', title: 'Error Analysis & Debugging' })
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <HeroSection />
        
        {/* Features Section */}
        <section id="features-section" className="py-8 md:py-12 lg:py-16 px-4 md:px-6">
          <div className="container max-w-7xl mx-auto">
            <div className="text-center mb-6 md:mb-8 lg:mb-12">
              <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 md:mb-3 lg:mb-4">
                Powerful AI Tools for
                <span className="gradient-text block">Modern Developers</span>
              </h2>
              <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
                Enhance your development workflow with cutting-edge AI assistance
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12 lg:mb-16">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <FeatureCard {...feature} />
                </div>
              ))}
            </div>

            {/* Stats Section */}
            <div className="bg-gradient-to-r from-primary/10 via-blue-500/10 to-purple-500/10 rounded-2xl p-4 md:p-6 lg:p-8 mb-8 md:mb-12 lg:mb-16 border border-primary/20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 text-center">
                <div className="space-y-1 md:space-y-2">
                  <div className="text-xl md:text-2xl lg:text-3xl font-bold gradient-text">10K+</div>
                  <div className="text-xs md:text-sm text-muted-foreground">Code Reviews</div>
                </div>
                <div className="space-y-1 md:space-y-2">
                  <div className="text-xl md:text-2xl lg:text-3xl font-bold gradient-text">95%</div>
                  <div className="text-xs md:text-sm text-muted-foreground">Accuracy Rate</div>
                </div>
                <div className="space-y-1 md:space-y-2">
                  <div className="text-xl md:text-2xl lg:text-3xl font-bold gradient-text">15+</div>
                  <div className="text-xs md:text-sm text-muted-foreground">Languages Supported</div>
                </div>
              </div>
            </div>

            {/* Tech Articles Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              <div className="lg:col-span-2">
                <TechArticles />
              </div>
              
              <div className="space-y-4 md:space-y-6">
                <div className="bg-gradient-to-br from-primary/5 to-blue-500/5 p-4 md:p-6 rounded-xl border border-primary/20">
                  <div className="flex items-center gap-3 mb-3 md:mb-4">
                    <Sparkles className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 text-primary flex-shrink-0" />
                    <h3 className="font-semibold text-sm md:text-base">AI-Powered Insights</h3>
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4 leading-relaxed">
                    Get personalized coding insights and recommendations tailored to your development style.
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full text-xs md:text-sm h-8 md:h-9"
                    onClick={() => navigate('/blog/ai-insights')}
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-3 w-3 md:h-4 md:w-4" />
                  </Button>
                </div>

                <div className="bg-gradient-to-br from-green-500/5 to-emerald-500/5 p-4 md:p-6 rounded-xl border border-green-500/20">
                  <div className="flex items-center gap-3 mb-3 md:mb-4">
                    <Code className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 text-green-500 flex-shrink-0" />
                    <h3 className="font-semibold text-sm md:text-base">Code Quality</h3>
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4 leading-relaxed">
                    Maintain high code standards with automated quality checks and suggestions.
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full text-xs md:text-sm h-8 md:h-9"
                    onClick={() => navigate('/blog/code-quality')}
                  >
                    Explore Features
                    <ArrowRight className="ml-2 h-3 w-3 md:h-4 md:w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-4 md:py-6 lg:py-8 px-4 md:px-6">
        <div className="container max-w-7xl mx-auto text-center">
          <p className="text-muted-foreground text-xs md:text-sm">
            Built with ❤️ for developers • Powered by AI • Made with Lovable
          </p>
        </div>
      </footer>

      {/* Analysis Modal */}
      <AnalysisModal
        isOpen={activeModal.type !== null}
        onClose={() => setActiveModal({ type: null, title: '' })}
        title={activeModal.title}
        type={activeModal.type || 'review'}
      />
    </div>
  );
};

export default Index;
