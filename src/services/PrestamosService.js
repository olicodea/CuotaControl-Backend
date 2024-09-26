import Loan from "../models/Loan.js";
import Contact from "../models/Contact.js";
import User from "../models/User.js";
import Installment from "../models/Installment.js";
import { LoanTypes, LoanTypesReverse } from "../enums/LoanTypes.js";
import { InstallmentStatuses, InstallmentStatusesReverse } from "../enums/InstallmentStatuses.js";
import moment from "moment";

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

        if (!loan) throw new Error("Prestamo no encontrado.");

        const totalPaid = loan.cuotas.reduce((acc, installment) => {
            if (
                InstallmentStatusesReverse[installment.estadoCuota] === "pagada"
            )
                return acc + installment.montoCuota;

            return acc;
        }, 0);

        const paidPercentage = (totalPaid / loan.montoTotal) * 100;

        const options = { day: "2-digit", month: "2-digit", year: "numeric" };
        const fechaInicio = new Date(loan.fechaInicio).toLocaleDateString(
            "es-AR",
            options
        );

        const installments = loan.cuotas.map((installment) => {
            const nroCuota = loan.cuotas.indexOf(installment) + 1;

            const options = {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            };

            const fechaVencimiento = new Date(
                installment.fechaVencimiento
            ).toLocaleDateString("es-AR", options);

            return {
                id: installment._id,
                nroCuota: nroCuota,
                monto: installment.montoCuota,
                fechaVencimiento: fechaVencimiento,
                estado: InstallmentStatusesReverse[installment.estadoCuota],
            };
        });

        const contact = await Contact.findById(loan.contactoId) || {};

        const formattedLoan = {
            id: loan._id,
            tipo: LoanTypesReverse[loan.tipoPrestamo],
            fechaInicio: fechaInicio,
            nroPrestamo: loan.nroPrestamo,
            nombreContacto: loan.contactoId.nombre,
            idContacto: contact?._id,
            monto: loan.montoTotal,
            porcentajeCumplido: paidPercentage.toFixed(2),
            totalCobrado: totalPaid,
            notas: loan.notas,
            cuotas: installments,
        };

        return formattedLoan;
    } catch (error) {
        console.error("Error al obtener detalle de prestamo:", error);
        throw new Error("Error al obtener detalle de prestamo.");
    }
};

export const updateLoan = async (loan) => {
    const bReturnUpdatedLoan = true;

    try {
        const contact = await Contact.findById(loan.contactoId);
        const type = +LoanTypes[loan.tipo];

        if (!contact) throw new Error("Contacto no encontrado.");

        if(!type) throw new Error("Tipo de préstamo inválido.");

        const editProps = {
            contactoId: contact?._id,
            tipoPrestamo: type,
            notas: loan?.notas,
        };

        const updatedLoan = await Loan.findByIdAndUpdate(loan.id, editProps, {
            new: bReturnUpdatedLoan,
        });

        return updatedLoan;
    } catch (error) {
        console.error("Error al actualizar prestamo:", error);
        throw new Error("Error al actualizar prestamo.");
    }
};

export const deleteLoanById = async (loanId) => {
    try {
        const loan = await Loan.findById(loanId);

        if (!loan) throw new Error("Prestamo no encontrado.");

        await Installment.deleteMany({ _id: { $in: loan.cuotas } });
        await Loan.findByIdAndDelete(loanId);

        return true;
    } catch (error) {
        console.error("Error al eliminar prestamo:", error);
        throw new Error("Error al eliminar prestamo.");
    }
};

export const createLoan = async (loan) => {
    try {
        const contact = await Contact.findById(loan.contactoId);
        const user = await User.findById(loan.usuarioId);
        const INSTALLMENT_INITIAL_STATUS = "pendiente";

        if (!contact || !user) throw new Error("Contacto o usuario no encontrado.");

        const type = +LoanTypes[loan.tipoPrestamo];

        let loansCount = (await Loan.countDocuments());

        let newLoan = await Loan.create({
            contactoId: contact._id,
            usuarioId: user._id,
            tipoPrestamo: type,
            montoTotal: loan.monto,
            nroPrestamo: loansCount + 1, 
            fechaInicio: moment(loan.fechaInicio, "DD/MM/YYYY").toDate(),
            notas: loan.notas,
            cuotas: []
        });

        const installmentAmount = newLoan.montoTotal / loan.cantidadCuotas;

        let installments = [];

        for (let i = 0; i < loan.cantidadCuotas; i++) {
            const installment = {
                nroCuota: i + 1,
                montoCuota: installmentAmount,
                fechaVencimiento: new Date(
                    newLoan.fechaInicio.setMonth(newLoan.fechaInicio.getMonth() + i)
                ),
                estadoCuota: +InstallmentStatuses[INSTALLMENT_INITIAL_STATUS],
                loanId: newLoan._id,
            };

            installments.push(installment);
        }

        newLoan.cuotas = await Installment.insertMany(installments);

        await Loan.findByIdAndUpdate(newLoan._id, { cuotas: newLoan.cuotas });

        return newLoan;

    } catch (error) {
        console.error("Error al agregar préstamo:", error);
        throw new Error("Error al agregar préstamo.");
    }
};