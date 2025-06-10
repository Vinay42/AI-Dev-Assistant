
import { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  buttonText: string;
  gradient: string;
  onClick: () => void;
}

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  buttonText, 
  gradient,
  onClick 
}: FeatureCardProps) => {
  return (
    <Card className="group relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 hover:scale-[1.02] ai-glow h-full flex flex-col">
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br ${gradient}`} />
      
      <CardHeader className="relative pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} shadow-lg`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
        <CardTitle className="text-lg font-semibold leading-tight">{title}</CardTitle>
      </CardHeader>
      
      <CardContent className="relative flex-1 flex flex-col">
        <CardDescription className="text-muted-foreground mb-6 leading-relaxed text-sm flex-1">
          {description}
        </CardDescription>
        
        <Button 
          onClick={onClick}
          className="w-full group-hover:scale-105 transition-transform mt-auto"
          variant="secondary"
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
