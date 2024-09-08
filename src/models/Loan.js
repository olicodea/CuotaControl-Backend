import mongoose from 'mongoose';
import { LoanTypes } from '../enums/LoanTypes';

const LoanSchema = new mongoose.Schema({
    tipoPrestamo: { type: Number, required: true },
    montoTotal: { type: Number, required: true },
    tasaInteres: { type: Number },
    fechaInicio: { type: Date, required: true },
    notas: { type: String },
    cantidadCuotas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Installment' }],
    contactoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact', required: true },
    usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const Loan = mongoose.model('Loan', LoanSchema);
export default Loan;