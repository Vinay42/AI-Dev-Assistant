
import { ArrowLeft, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

interface BlogLayoutProps {
  title: string;
  content: React.ReactNode;
  readTime: string;
  category: string;
}

const BlogLayout = ({ title, content, readTime, category }: BlogLayoutProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <article className="container max-w-4xl mx-auto px-4 md:px-6 py-6 md:py-12">
        <div className="mb-6 md:mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-4 md:mb-6 -ml-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="mb-4">
            <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs md:text-sm font-medium mb-3 md:mb-4">
              {category}
            </span>
            <h1 className="text-xl md:text-2xl lg:text-4xl font-bold leading-tight mb-2 md:mb-4">
              {title}
            </h1>
            <p className="text-xs md:text-sm text-muted-foreground">
              {readTime} read • Published today
            </p>
          </div>
        </div>

        <div className="prose prose-sm md:prose-lg max-w-none mb-6 md:mb-12 text-sm md:text-base">
          {content}
        </div>

        {/* Interaction Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0 py-4 md:py-6 border-t border-border">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogLayout;
