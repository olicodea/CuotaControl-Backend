import express from 'express';
import { getHomeData } from '../controllers/HomeController.js';

export const homeRouter = express.Router();

homeRouter.get('/', getHomeData);