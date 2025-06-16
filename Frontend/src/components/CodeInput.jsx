
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, Loader2, Copy, CheckCircle, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import ReactMarkdown from 'react-markdown';
import removeMarkdown from 'remove-markdown';


// Convert props interface to JSDoc for autocomplete/intellisense
/**
 * @param {{
 *  title: string;
 *  placeholder: string;
 *  onAnalyze: (code: string, language: string) => Promise<void>;
 *  isLoading?: boolean;
 *  result?: string;
 *  error?: string;
 *  onCancel?: () => void;
 * }} props
 */
const CodeInput = ({ title, placeholder, onAnalyze, isLoading, result, error, onCancel }) => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [copied, setCopied] = useState(false);

  const handleAnalyze = async () => {
    if (!code.trim()) {
      toast({
        title: "Error",
        description: "Please enter some code to analyze.",
        variant: "destructive",
      });
      return;
    }
    try {
      await onAnalyze(code, language);
    } catch (error) {
      // Error handling is done in the parent component
      console.error('Analysis failed:', error);
    }
  };

  // const copyToClipboard = async () => {
  //   if (result) {
  //     await navigator.clipboard.writeText(result);
  //     setCopied(true);
  //     toast({
  //       title: "Copied!",
  //       description: "Result copied to clipboard.",
  //     });
  //     setTimeout(() => setCopied(false), 2000);
  //   }
  // };
  const copyToClipboard = async () => {
  if (result) {
    const plainText = removeMarkdown(result); // 👈 Strip all markdown formatting
    await navigator.clipboard.writeText(plainText); // 👈 Copy plain text
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Result copied to clipboard.",
    });
    setTimeout(() => setCopied(false), 2000);
  }
};


  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <Select value={language} onValueChange={setLanguage} disabled={isLoading}>
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="typescript">TypeScript</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="cpp">C++</SelectItem>
                <SelectItem value="go">Go</SelectItem>
                <SelectItem value="rust">Rust</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={handleAnalyze}
              disabled={isLoading || !code.trim()}
              className="min-w-[100px]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Analyze
                </>
              )}
            </Button>
            {isLoading && onCancel && (
              <Button 
                variant="outline"
                onClick={onCancel}
                size="sm"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        <Textarea
          placeholder={placeholder}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="min-h-[200px] font-mono text-sm resize-none"
          disabled={isLoading}
        />

        {error && (
          <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
            <p className="text-sm text-destructive font-medium">Analysis Error:</p>
            <p className="text-sm text-destructive/80 mt-1">{error}</p>
          </div>
        )}

        {result && !error && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-sm">AI Analysis Result:</h4>
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                className="h-8"
              >
                {copied ? (
                  <CheckCircle className="h-4 w-4 text-green-400" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <div className="code-block max-h-[300px] overflow-y-auto scroll-smooth mt-4 rounded-md p-4 bg-muted/40 prose prose-sm dark:prose-invert">
              {/* <pre className="whitespace-pre-wrap text-sm">{result}</pre> */}
              <ReactMarkdown>{result}</ReactMarkdown>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CodeInput;
