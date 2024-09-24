import express from 'express';
import { getHomeData } from '../controllers/HomeController.js';
import { verifyToken } from '../middlewares/AuthMiddleware.js';

export const homeRouter = express.Router();

homeRouter.get('/home', verifyToken, getHomeData);