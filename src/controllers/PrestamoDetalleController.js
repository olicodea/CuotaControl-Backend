import {
    findLoanById,
    updateLoan,
    deleteLoanById,
} from "../services/PrestamosService.js";

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

export const editLoan = async (req, res) => {
    const loan = req.body;

    if (!loan || !loan.id)
        return res
            .status(400)
            .json({ error: "Los datos del prestamo son requeridos." });
    try {
        const updatedLoan = await updateLoan(loan);

        res.status(200).json(updatedLoan);
    } catch (error) {
        res.status(500).send("Error al actualizar el prestamo.");
    }
};

export const removeLoan = async (req, res) => {
    const loanId = req.headers["loanId"] || req.query.loanId;

    if (!loanId) {
        return res
            .status(400)
            .json({ error: "El ID de prestamo es requerido." });
    }

    try {
        await deleteLoanById(loanId);

        res.status(200).send(true);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
