import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import codeRoutes from './routes/code.js';

dotenv.config();

const app = express();
app.use(cors({
  origin: 'http://localhost:8080', // or whatever your Vite/React port is
  methods: ['POST'],
  credentials: true
}));
app.use(express.json());

app.use('/api/code', codeRoutes);

app.get('/', (req, res) => {
  res.send('AI Backend Running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
