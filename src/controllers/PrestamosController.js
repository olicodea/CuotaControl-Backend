import { findLoansByUser, createLoan } from "../services/PrestamosService.js";

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

export const addLoan = async (req, res) => {
  const loan = req.body;

  if (
    !loan ||
    !loan.contactoId ||
    !loan.usuarioId ||
    !loan.tipoPrestamo ||
    !loan.cantidadCuotas ||
    !loan.monto ||
    !loan.fechaInicio
  ) {
    return res.status(400).json({ error: "Datos de préstamo incompletos." });
  }

  try {
    const newLoan = await createLoan(loan);
    res.status(201).json(newLoan);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
