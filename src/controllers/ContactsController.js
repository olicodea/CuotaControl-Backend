import { findContactsByUserId } from "../services/ContactsService.js";

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
        res.status(500).json({ error: error.message});
    }
};
