import express from 'express';
import { getContacts, addContact, editContact, removeContact } from '../controllers/ContactsController.js';

export const contactsRouter = express.Router();

contactsRouter.get('/contacts', getContacts);
contactsRouter.post('/contacts', addContact);
contactsRouter.patch('/contacts', editContact);
contactsRouter.delete('/contacts', removeContact);