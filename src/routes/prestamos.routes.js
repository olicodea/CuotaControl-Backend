import express from 'express';
import { getLoans, addLoan } from '../controllers/PrestamosController.js';
import { getLoanById, editLoan, removeLoan } from '../controllers/PrestamoDetalleController.js';
import { verifyToken } from '../middlewares/AuthMiddleware.js';

export const prestamosRouter = express.Router();

prestamosRouter.get('/loans', verifyToken, getLoans);
prestamosRouter.get('/loan-detail', verifyToken, getLoanById);
prestamosRouter.patch('/loans', verifyToken, editLoan);
prestamosRouter.delete('/loans', verifyToken, removeLoan);
prestamosRouter.post('/loans', verifyToken, addLoan);
