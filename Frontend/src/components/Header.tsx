
import { Bot, Zap, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onMenuToggle?: () => void;
}

const Header = ({ onMenuToggle }: HeaderProps) => {
  const handleGetStarted = () => {
    const featuresSection = document.getElementById('features-section');
    if (featuresSection) {
      featuresSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4 md:px-6">
        <div className="flex items-center gap-2 md:gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={onMenuToggle}
          >
            {/* <Menu className="h-5 w-5" /> */}
          </Button>
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <Bot className="h-6 w-6 md:h-8 md:w-8 text-primary animate-pulse-glow" />
              <Zap className="absolute -top-1 -right-1 h-3 w-3 md:h-4 md:w-4 text-yellow-400 animate-float" />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold gradient-text">AI Dev Assistant</h1>
              <p className="text-xs text-muted-foreground hidden md:block">Intelligent Coding Companion</p>
            </div>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2 md:gap-4">
          <div className="hidden lg:flex items-center gap-2 text-sm text-muted-foreground">
            <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
            AI Status: Online
          </div>
          
          <Button 
            variant="outline" 
            size="sm"
            className="ai-glow hover:scale-105 transition-transform text-xs md:text-sm px-3 md:px-4 hidden sm:flex"
            onClick={handleGetStarted}
          >
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
