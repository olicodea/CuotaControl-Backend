import mongoose from 'mongoose';

const InstallmentSchema = new mongoose.Schema({
    loanId: { type: mongoose.Schema.Types.ObjectId, ref: 'Loan', required: true },
    monto: { type: Number, required: true },
    fechaVencimiento: { type: Date, required: true },
    estado: { type: String, enum: ['pendiente', 'pagada', 'atrasada'], default: 'pendiente' },
}, { timestamps: true });

const Installment = mongoose.model('Installment', InstallmentSchema);
export default Installment;