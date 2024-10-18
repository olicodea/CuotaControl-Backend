import {
    findContactsByUserId,
    createContact,
    updateContact,
    deleteContact,
} from "../services/ContactsService.js";

export const getContacts = async (req, res) => {
  const userId = req.query.userId || req.headers["userId"];

  if (!userId)
    return res.status(400).json({ error: "El ID de usuario es requerido." });

  try {
    const data = await findContactsByUserId(userId);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
    try {
        const data = await findContactsByUserId(userId);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const addContact = async (req, res) => {
    const newContact = req.body;

    if (!newContact.nombre)
        return res.status(400).json({ error: "El nombre es requerido." });

    if (!newContact.userId)
        return res
            .status(400)
            .json({ error: "El ID de usuario es requerido." });

    try {
        const data = await createContact(newContact);
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const editContact = async (req, res) => {
    const contact = req.body;

    if (!contact.contactId || !contact.nombre)
        return res.status(400).json({ error: "ID de contacto requerido." });

    try {
        const data = await updateContact(contact);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const removeContact = async (req, res) => {
    const contactId = req.query.contactId;

    if (!contactId)
        return res.status(400).json({ error: "ID de contacto requerido." });

    try {
        await deleteContact(contactId);
        res.status(200).json({ message: "Contacto eliminado." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
>>>>>>> fec7b944183f83602049b393b79aa5bdc9a7375f
};
