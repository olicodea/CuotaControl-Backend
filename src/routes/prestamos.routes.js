import express from 'express';
import { getLoans } from '../controllers/PrestamosController.js';

export const prestamosRouter = express.Router();

prestamosRouter.get('/loans', getLoans);