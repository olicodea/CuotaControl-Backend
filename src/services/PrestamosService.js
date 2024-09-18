import Loan from "../models/Loan.js";
import Contact from "../models/Contact.js";
import Installment from "../models/Installment.js";
import { LoanTypesReverse } from "../enums/LoanTypes.js";
import { InstallmentStatusesReverse } from "../enums/InstallmentStatuses.js";

export const findLoansByUser = async (userId) => {
    try {
        const loans = await Loan.find({ usuarioId: userId })
            .populate("cuotas")
            .populate("contactoId");

        const formattedLoans = loans.map((loan) => {
            const loanType = LoanTypesReverse[loan.tipoPrestamo];
            const totalInstallments = loan.cuotas.length;
            const paidInstallments = loan.cuotas.filter(
                (installment) =>
                    InstallmentStatusesReverse[installment.estadoCuota] ===
                    "pagada"
            ).length;
            const porcentajePagado =
                totalInstallments > 0
                    ? (paidInstallments / totalInstallments) * 100
                    : 0;

            return {
                id: loan._id,
                tipo: loanType,
                nroPrestamo: loan.nroPrestamo,
                nombreContacto: loan.contactoId.nombre,
                porcentajePagado: porcentajePagado.toFixed(2),
            };
        });

        return formattedLoans;
    } catch (error) {
        console.error("Error al obtener prestamos:", error);
        throw new Error("Error al obtener prestamos.");
    }
};

export const findLoanById = async (loanId) => {
    try {
        const loan = await Loan.findById(loanId)
            .populate("cuotas")
            .populate("contactoId");

        const formattedLoan = {
            id: loan._id,
            tipo: LoanTypesReverse[loan.tipoPrestamo],
            nroPrestamo: loan.nroPrestamo,
            nombreContacto: loan.contactoId.nombre,
            monto: loan.montoTotal,
            notas: loan.notas,
            cuotas: loan.cuotas.map((installment) => {
                const nroCuota = loan.cuotas.indexOf(installment) + 1;
                const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
                const fechaVencimiento =  new Date(installment.fechaVencimiento).toLocaleDateString('es-AR', options);
                return {
                    id: installment._id,
                    nroCuota: nroCuota,
                    monto: installment.montoCuota,
                    fechaVencimiento: fechaVencimiento,
                    estado: InstallmentStatusesReverse[installment.estadoCuota],
                };
            }),
        };

        return formattedLoan;
    } catch (error) {
        console.error("Error al obtener detalle de prestamo:", error);
        throw new Error("Error al obtener detalle de prestamo.");
    }
};
