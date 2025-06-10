
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Loader2, Rss } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

interface Article {
  id: number;
  title: string;
  description: string;
  url: string;
  published_at: string;
  public_reactions_count: number;
  comments_count: number;
  tag_list: string[];
  user: {
    name: string;
    username: string;
    profile_image: string;
  };
  cover_image?: string;
}

const TechArticles = () => {
  const { data: articles, isLoading, error } = useQuery({
    queryKey: ['devto-articles'],
    queryFn: async (): Promise<Article[]> => {
      const response = await fetch('https://dev.to/api/articles?per_page=10&top=1');
      if (!response.ok) {
        throw new Error('Failed to fetch articles');
      }
      return response.json();
    },
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Rss className="h-5 w-5" />
            Latest Tech Articles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground text-sm">Failed to load articles. Please try again later.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3 md:pb-6">
        <CardTitle className="flex items-center gap-2 text-base md:text-lg">
          <Rss className="h-4 w-4 md:h-5 md:w-5 text-primary" />
          <span className="flex-1">Latest Tech Articles</span>
          <Badge variant="secondary" className="text-xs">Dev.to</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground text-sm">Loading articles...</span>
          </div>
        ) : (
          <div className="space-y-3 max-h-[600px] overflow-y-auto">
            {articles?.map((article) => (
              <div
                key={article.id}
                className="group p-3 border border-border rounded-lg hover:border-primary/30 transition-all duration-200 hover:shadow-md"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={article.user.profile_image}
                    alt={article.user.name}
                    className="w-7 h-7 md:w-8 md:h-8 rounded-full flex-shrink-0 mt-0.5"
                  />
                  <div className="flex-1 min-w-0 pr-2">
                    <h3 className="font-medium text-xs md:text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors mb-1">
                      {article.title}
                    </h3>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                      <span className="truncate text-[10px] md:text-xs">by {article.user.name}</span>
                      <span className="flex-shrink-0 ml-2 text-[10px] md:text-xs">{formatDate(article.published_at)}</span>
                    </div>
                    
                    {article.description && (
                      <p className="text-[10px] md:text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-2">
                        {article.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between gap-2">
                      <div className="flex flex-wrap gap-1 flex-1 min-w-0">
                        {article.tag_list.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-[8px] md:text-[10px] px-1 py-0 h-3 md:h-4 truncate max-w-16 md:max-w-none">
                            {tag}
                          </Badge>
                        ))}
                        {article.tag_list.length > 2 && (
                          <Badge variant="outline" className="text-[8px] md:text-[10px] px-1 py-0 h-3 md:h-4">
                            +{article.tag_list.length - 2}
                          </Badge>
                        )}
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-5 md:h-6 px-1.5 md:px-2 text-[10px] md:text-xs flex-shrink-0 min-w-0"
                        onClick={() => window.open(article.url, '_blank')}
                      >
                        <ExternalLink className="h-2.5 w-2.5 md:h-3 md:w-3 mr-0.5 md:mr-1" />
                        <span className="hidden sm:inline">Read</span>
                        <span className="sm:hidden">↗</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TechArticles;
