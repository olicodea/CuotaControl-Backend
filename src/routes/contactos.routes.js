import express from 'express';
import { getContacts } from '../controllers/ContactsController.js';

export const contactsRouter = express.Router();

contactsRouter.get('/contacts', getContacts);

