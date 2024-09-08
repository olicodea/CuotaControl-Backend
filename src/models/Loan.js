import mongoose from 'mongoose';
import { LoanTypes } from '../enums/LoanTypes';

const LoanSchema = new mongoose.Schema({
    tipo: { type: Number, enum: Object.values(LoanTypes), required: true },
    monto: { type: Number, required: true },
    tasaInteres: { type: Number },
    fechaInicio: { type: Date, required: true },
    notas: { type: String },
    cuotas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Installment' }],
    contactoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact', required: true },
    usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const Loan = mongoose.model('Loan', LoanSchema);
export default Loan;