import axios from 'axios';
import 'dotenv/config'; 

// Add this line to test
console.log('Is API Key loaded?', process.env.GEMINI_API_KEY);
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

// async function callGemini(prompt) {
//   try {
//     const response = await axios.post(GEMINI_API_URL, {
//       contents: [
//         {
//           parts: [{ text: prompt }],
//         },
//       ],
//     });

//     return response.data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
//   } catch (error) {
//     console.error('Gemini API error:', error.message);
//     return 'Error communicating with Gemini API.';
//   }
// }

async function callGemini(prompt) {
  // console.log(prompt)
  try {
    const response = await axios.post(GEMINI_API_URL, {
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }]
        }
      ]
    });

    return response.data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
  } catch (error) {
    console.error('Gemini API error:', error.response?.data || error.message);
    return 'Error communicating with Gemini API.';
  }
}

export async function reviewCode(code) {
  const prompt = `
You are a senior software engineer. Review the following code strictly.

Return the result in this structure:

- **Code Quality**: One or two sentences.
- **Performance Suggestions**: One or two clear bullet points.
- **Best Practices**: One or two recommendations.

Code:
${code}

Keep the response compact and structured.
`;
  return await callGemini(prompt);
}

export async function explainCode(code) {
  const prompt = `
You are an expert programming teacher. Explain the following code clearly.

Use this structure:
- **Overview**: What the code does.
- **Key Concepts**: Bullet points explaining logic, syntax, and features used.
- **Real-World Example**: Optional (1 line) analogy if applicable.

Code:
${code}

Be concise but accurate.
`;
  return await callGemini(prompt);
}

export async function analyzeErrors(code) {
  const prompt = `
You are a bug analysis assistant. Analyze the following code for bugs or errors.

Respond using this format:
- **Detected Issues**: Short bullet points of problems found.
- **Fix Suggestions**: What should be changed or rewritten.
- **Warnings (if any)**: Other non-critical concerns.

Code:
${code}

Make response short, useful, and structured.
`;
  return await callGemini(prompt);
}
