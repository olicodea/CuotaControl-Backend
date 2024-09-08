import mongoose from 'mongoose';

const InstallmentSchema = new mongoose.Schema({
    loanId: { type: mongoose.Schema.Types.ObjectId, ref: 'Loan', required: true },
    montoCuota: { type: Number, required: true },
    fechaVencimiento: { type: Date, required: true },
    estadoCuota: { type: Number, required: true },
}, { timestamps: true });

const Installment = mongoose.model('Installment', InstallmentSchema);
export default Installment;