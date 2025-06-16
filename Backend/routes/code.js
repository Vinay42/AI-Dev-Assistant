// import express from 'express';
// import { reviewCode, explainCode, analyzeErrors } from '../services/geminiService.js';

// const router = express.Router();



// router.post('/review', async (req, res) => {
//   const { code } = req.body;
//   const result = await reviewCode(code);
//   res.json({ review: result });
// });

// router.post('/explain', async (req, res) => {
//   const { code } = req.body;
//   console.log(code);
//   const result = await explainCode(code);
//   res.json({ explanation: result });
// });

// router.post('/errors', async (req, res) => {
//   const { code } = req.body;
//   console.log(req.body);
//   console.log(code);
//   const result = await analyzeErrors(code);
//   res.json({ errors: result });
// });

// export default router;


// routes/code.js

import express from 'express';
import { reviewCode, explainCode, analyzeErrors } from '../services/geminiService.js';

const router = express.Router();

router.post('/analyze', async (req, res) => {
  const { code, language, type } = req.body;

  try {
    if (!code || !type) {
      return res.status(400).json({ success: false, error: 'Code and type are required.' });
    }

    let result;

    switch (type) {
      case 'review':
        result = await reviewCode(code, language);
        break;
      case 'explain':
        result = await explainCode(code, language);
        break;
      case 'debug':
        result = await analyzeErrors(code, language);
        break;
      default:
        return res.status(400).json({ success: false, error: 'Invalid analysis type.' });
    }

    res.json({ success: true, result });
  } catch (error) {
    console.error('Error in /analyze:', error);
    res.status(500).json({ success: false, error: 'Server error. Please try again.' });
  }
});

export default router;
