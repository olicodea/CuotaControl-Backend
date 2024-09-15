import { findLoansByUser } from "../services/PrestamosService.js";

export const getLoans = async (req, res) => {
    const userId = req.query.userId || req.headers["userId"];

    if (!userId) {
        return res.status(400).json({ error: "El ID de usuario es requerido." });
    }

    try {
        const loans = await findLoansByUser(userId);
        res.status(200).json(loans);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};