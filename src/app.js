import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { homeRouter } from './routes/home.routes.js';

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/home', homeRouter);

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server on port: ${PORT}`);
});

export default app;