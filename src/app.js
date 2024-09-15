import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDataBase from './config/db.js';

import { homeRouter } from './routes/home.routes.js';
import { prestamosRouter } from './routes/prestamos.routes.js';

dotenv.config();
const app = express();

connectDataBase();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', homeRouter);
app.use('/api', prestamosRouter);

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server run on: http://localhost:${PORT}`);
});

export default app;