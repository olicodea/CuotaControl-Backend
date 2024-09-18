import { findLoanById } from "../services/PrestamosService.js";

export const getLoanById = async (req, res) => {
    const loanId = req.headers["loanId"] || req.query.loanId;

    if (!loanId) {
        return res
            .status(400)
            .json({ error: "El ID de prestamo es requerido." });
    }

    try {
        const loan = await findLoanById(loanId);
        res.status(200).json(loan);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
