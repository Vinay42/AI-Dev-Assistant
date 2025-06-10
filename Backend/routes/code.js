import express from 'express';
import { reviewCode, explainCode, analyzeErrors } from '../services/geminiService.js';

const router = express.Router();



router.post('/review', async (req, res) => {
  const { code } = req.body;
  const result = await reviewCode(code);
  res.json({ review: result });
});

router.post('/explain', async (req, res) => {
  const { code } = req.body;
  console.log(code);
  const result = await explainCode(code);
  res.json({ explanation: result });
});

router.post('/errors', async (req, res) => {
  const { code } = req.body;
  console.log(req.body);
  console.code(code);
  const result = await analyzeErrors(code);
  res.json({ errors: result });
});

export default router;
