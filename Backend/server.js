import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import codeRoutes from './routes/code.js';

dotenv.config();

const app = express();
app.use(cors({
  origin: ['http://localhost:8080',process.env.FRONT_END_API], // or whatever your Vite/React port is
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true
}));
app.use(express.json());

app.use('/api/', codeRoutes);

app.get('/', (req, res) => {
  res.send('AI Backend Running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
