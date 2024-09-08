import Loan from "../models/Loan.js";
import { LoanTypesReverse } from "../enums/LoanTypes.js";
import { InstallmentStatusesReverse } from "../enums/InstallmentStatuses.js";

export const findHomeData = async (userId) => {

    try {
        const loans = await Loan.find({ usuarioId: userId }).populate("cuotas");

        let totalDebt = 0;
        let totalInFavor = 0;
        let totalDebtPaid = 0;
        let totalInFavorPaid = 0;
        let dueDebts = [];
        let dueInFavor = [];

        loans.forEach((loan, indexLoan) => {
            const loanType = LoanTypesReverse[loan.tipoPrestamo];

            loan.cuotas.forEach((installment, indexInstallment) => {
                const installmentStatus = InstallmentStatusesReverse[installment.estadoCuota];
                const options = { day: '2-digit', month: '2-digit', year: 'numeric' };

                if (loanType === "prestado") {
                    totalInFavor += loan.montoTotal;
                    if (installmentStatus === "pagada") {
                        totalInFavorPaid += installment.montoCuota;
                    } else {
                        dueInFavor.push({
                            nroPrestamo: indexLoan + 1,
                            cuotaNro: `${indexInstallment + 1}/${loan.cuotas.length}`,
                            fechaVencimiento: new Date(installment.fechaVencimiento).toLocaleDateString('es-AR', options),
                        });
                    }
                } else {
                    totalDebt += loan.montoTotal;
                    if (installmentStatus === "pagada") {
                        totalDebtPaid += installment.montoCuota;
                    } else {
                        dueDebts.push({
                            nroPrestamo: indexLoan + 1,
                            cuotaNro: `${indexInstallment + 1}/${loan.cuotas.length}`, 
                            fechaVencimiento: new Date(installment.fechaVencimiento).toLocaleDateString('es-AR', options),
                        });
                    }
                }
            });
        });

        return {
            totalDeuda: totalDebt,
            totalAFavor: totalInFavor,
            totalDeudaPago: totalDebtPaid,
            totalAFavorPago: totalInFavorPaid,
            vencimientosDeuda: dueDebts,
            vencimientosAFavor: dueInFavor,
        };
    } catch (error) {
        console.error("Error al obtener datos del servicio Home:", error);
        throw new Error("Error al obtener los datos del Home");
    }
};
