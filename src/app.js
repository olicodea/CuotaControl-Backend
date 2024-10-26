import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDataBase from './config/db.js';
import passport from 'passport';
import { jwtStrategy } from './config/passport.js';

import { authRouter } from './routes/auth.routes.js';
import { homeRouter } from './routes/home.routes.js';
import { prestamosRouter } from './routes/prestamos.routes.js';
import { contactsRouter } from './routes/contactos.routes.js';

dotenv.config();
const app = express();

connectDataBase();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
passport.use(jwtStrategy);

// Routes
app.use('/api', authRouter);
app.use('/api', homeRouter);
app.use('/api', prestamosRouter);
app.use('/api', contactsRouter);

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server run on: http://localhost:${PORT}`);
});

export default app;