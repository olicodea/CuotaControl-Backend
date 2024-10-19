import {
    findContactsByUserId,
    createContact,
    updateContact,
    deleteContact,
} from "../services/ContactsService.js";

export const getContacts = async (req, res) => {
    const userId = req.query.userId || req.headers["userId"];

    if (!userId)
        return res
            .status(400)
            .json({ error: "El ID de usuario es requerido." });

    try {
        const data = await findContactsByUserId(userId);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const addContact = async (req, res) => {
    console.log(req.body);
    const { nombre, userId, email, telefono, nota } = req.body;

    if (!nombre)
        return res.status(400).json({ error: "El nombre es requerido." });

    if (!userId)
        return res
            .status(400)
            .json({ error: "El ID de usuario es requerido." });

    try {
        const data = await createContact({
            nombre,
            usuarioId: userId,
            email,
            telefono,
            nota,
        });
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
};
