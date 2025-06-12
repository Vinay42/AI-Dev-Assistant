
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from '@/components/ui/dialog';
// import { ScrollArea } from '@/components/ui/scroll-area';
// import CodeInput from './CodeInput';

// interface AnalysisModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   title: string;
//   type: 'review' | 'explain' | 'debug';
// }

// const AnalysisModal = ({ isOpen, onClose, title, type }: AnalysisModalProps) => {
// //   const mockAnalyze = (code: string, language: string) => {
// //     // Mock analysis - in a real app, this would call an AI API
// //     console.log(`Analyzing ${language} code:`, code);
    
// //     const mockResults = {
// //       review: `Code Review Analysis:

// // ✅ **Strengths:**
// // - Good variable naming conventions
// // - Proper error handling structure
// // - Clear function separation

// // ⚠️ **Improvements:**
// // - Consider adding input validation
// // - Add JSDoc comments for better documentation
// // - Use const instead of let where possible
// // - Consider extracting magic numbers to constants

// // 🔧 **Refactoring Suggestions:**
// // - Extract repeated logic into helper functions
// // - Consider using TypeScript for better type safety
// // - Add unit tests for critical functions

// // 📈 **Performance:**
// // - Current implementation is efficient for small datasets
// // - Consider optimization for larger data sets`,

// //       explain: `Code Explanation:

// // 🎯 **Purpose:**
// // This code defines a function that processes user input and returns formatted data.

// // 🔍 **How it works:**
// // 1. **Input Validation:** Checks if the input meets required criteria
// // 2. **Data Processing:** Transforms the input using built-in methods
// // 3. **Return Value:** Outputs the processed result in the expected format

// // 💡 **Key Concepts:**
// // - **Variables:** Store temporary data during processing
// // - **Functions:** Encapsulate reusable logic
// // - **Conditionals:** Handle different execution paths
// // - **Loops:** Iterate over data collections

// // 🚀 **Simplified Version:**
// // Think of this code like a recipe - it takes ingredients (input), follows steps (processing), and creates a dish (output).`,

// //       debug: `Error Analysis & Fixes:

// // 🐛 **Issues Found:**

// // 1. **Potential Null Reference (Line 5)**
// //    - Problem: Variable might be undefined
// //    - Fix: Add null check before usage
// //    - Code: \`if (variable && variable.property)\`

// // 2. **Missing Error Handling (Line 12)**
// //    - Problem: Async operation without try-catch
// //    - Fix: Wrap in try-catch block
// //    - Code: \`try { await operation() } catch (e) { handleError(e) }\`

// // 3. **Memory Leak Risk (Line 18)**
// //    - Problem: Event listener not removed
// //    - Fix: Add cleanup in useEffect return
// //    - Code: \`return () => element.removeEventListener()\`

// // 🔧 **Recommended Fixes:**
// // ✅ Add TypeScript for compile-time error checking
// // ✅ Implement proper error boundaries
// // ✅ Add input sanitization
// // ✅ Use ESLint rules for consistent code quality`
// //     };

// //     return mockResults[type];
// //   };

// const fetchAnalysis = async (code: string, language: string) => {
//   try {
//     const response = await fetch(`http://localhost:5000/api/code/${type}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ code, language }),
//     });

//     const data = await response.json();
//     console.log('API Response:', data);
//     // return data[type];
//      type = 'review' | 'explain' | 'debug'
//   } catch (error) {
//     console.error('Error fetching analysis:', error);
//     return 'Error analyzing code.';
//   }
// };

//   const placeholders = {
//     review: "// Paste your code here for AI-powered review\n// Get suggestions for improvements, best practices, and optimizations\n\nfunction example() {\n  const data = fetchData();\n  return processData(data);\n}",
//     explain: "// Paste code here for detailed explanation\n// Choose between simplified or technical explanations\n\nconst users = data.filter(user => user.active)\n  .map(user => ({ ...user, status: 'verified' }));",
//     debug: "// Paste problematic code here for error analysis\n// Get specific fixes and solutions\n\ntry {\n  const result = await api.call();\n  console.log(result.data.items);\n} catch (error) {\n  // Error handling needed\n}"
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
//         <DialogHeader>
//           <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>
//         </DialogHeader>
//         <ScrollArea className="flex-1">
//           <div className="p-2">
//             <CodeInput
//               title={`AI ${title}`}
//               placeholder={placeholders[type]}
//               onAnalyze={async (code, language) => {
//                 const result = await fetchAnalysis(code, language);
//                 // In a real app, you'd update state here
//                 console.log('Analysis result:', result);
//               }}
//               result={"// Result will show here..."}
//             />
//           </div>
//         </ScrollArea>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default AnalysisModal;

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import CodeInput from './CodeInput';
import { useState } from 'react';

interface AnalysisModalProps {
  
  isOpen: boolean;
  onClose: () => void;
  title: string;
  type: 'review' | 'explain' | 'errors';
}

const AnalysisModal = ({ isOpen, onClose, title, type }: AnalysisModalProps) => {
  const [result, setResult] = useState<string>(''); // 🆕 Track analysis result

  const keyMap = {
    review: 'review',
    explain: 'explanation',
    errors: 'errors'
  };

  // fetch(`http://localhost:5000/api/code/${type}`, {

  const fetchAnalysis = async (code: string, language: string) => {
    try {
      const response = await fetch(`https://ai-dev-assistant-ywdj.vercel.app/api/code/${type}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, language }),
      });

      const data = await response.json();
      console.log('API Response:', data);

      const key = keyMap[type];
      return data[key] || 'No analysis result found.';
    } catch (error) {
      console.error('Error fetching analysis:', error);
      return 'Error analyzing code.';
    }
  };

  const placeholders = {
    review: `// Paste your code here for AI-powered review
// Get suggestions for improvements, best practices, and optimizations

function example() {
  const data = fetchData();
  return processData(data);
}`,
    explain: `// Paste code here for detailed explanation
// Choose between simplified or technical explanations

const users = data.filter(user => user.active)
  .map(user => ({ ...user, status: 'verified' }));`,
    errors: `// Paste problematic code here for error analysis
// Get specific fixes and solutions

try {
  const result = await api.call();
  console.log(result.data.items);
} catch (error) {
  // Error handling needed
}`
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-1">
          <div className="p-2">
            <CodeInput
              title={`AI ${title}`}
              placeholder={placeholders[type]}
              onAnalyze={async (code, language) => {
                const analysis = await fetchAnalysis(code, language);
                setResult(analysis); // 🆕 Update result in state
                console.log('Analysis result:', analysis);
              }}
              result={result || '// Result will show here...'}
            />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default AnalysisModal;
