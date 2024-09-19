import express from 'express';
import { getLoans } from '../controllers/PrestamosController.js';
import { getLoanById, editLoan, removeLoan } from '../controllers/PrestamoDetalleController.js';

export const prestamosRouter = express.Router();

prestamosRouter.get('/loans', getLoans);
prestamosRouter.get('/loan-detail', getLoanById);
prestamosRouter.patch('/loans', editLoan);
prestamosRouter.delete('/loans', removeLoan);
