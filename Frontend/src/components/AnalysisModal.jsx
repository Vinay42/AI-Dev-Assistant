
import { useState, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import CodeInput from './CodeInput';
import { apiService } from '@/services/api.js';
import { toast } from '@/hooks/use-toast';

const AnalysisModal = ({ isOpen, onClose, title, type }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const abortControllerRef = useRef(null);

  const handleAnalyze = async (code, language) => {
    setIsLoading(true);
    setError('');
    setResult('');

    // Create new abort controller for this request
    abortControllerRef.current = new AbortController();

    try {
      let analysisResult;
      
      switch (type) {
        case 'review':
          analysisResult = await apiService.reviewCode(code, language);
          break;
        case 'explain':
          analysisResult = await apiService.explainCode(code, language);
          break;
        case 'debug':
          analysisResult = await apiService.debugCode(code, language);
          break;
        default:
          throw new Error('Invalid analysis type');
      }

      setResult(analysisResult);
      toast({
        title: "Analysis Complete!",
        description: "Your code has been successfully analyzed.",
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      toast({
        title: "Analysis Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleCancel = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsLoading(false);
    toast({
      title: "Analysis Cancelled",
      description: "The analysis has been cancelled.",
    });
  };

  const handleClose = () => {
    if (isLoading) {
      handleCancel();
    }
    setResult('');
    setError('');
    onClose();
  };

  const placeholders = {
    review: "// Paste your code here for AI-powered review\n// Get suggestions for improvements, best practices, and optimizations\n\nfunction example() {\n  const data = fetchData();\n  return processData(data);\n}",
    explain: "// Paste code here for detailed explanation\n// Choose between simplified or technical explanations\n\nconst users = data.filter(user => user.active)\n  .map(user => ({ ...user, status: 'verified' }));",
    debug: "// Paste problematic code here for error analysis\n// Get specific fixes and solutions\n\ntry {\n  const result = await api.call();\n  console.log(result.data.items);\n} catch (error) {\n  // Error handling needed\n}"
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[95vh] overflow-hidden items-start scroll-smooth">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-1 max-h-[80vh] overflow-y-auto scroll-smooth">
          <div className="p-2">
            <CodeInput
              title={`AI ${title}`}
              placeholder={placeholders[type]}
              onAnalyze={handleAnalyze}
              isLoading={isLoading}
              result={result}
              error={error}
              onCancel={handleCancel}
            />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default AnalysisModal;
