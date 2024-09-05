import mongoose from 'mongoose';

const LoanSchema = new mongoose.Schema({
    // true para préstamos hechos, false para préstamos recibidos
    tipo: { type: Boolean, required: true },
    monto: { type: Number, required: true },
    tasaInteres: { type: Number, required: true },
    fechaInicio: { type: Date, required: true },
    notas: { type: String },
    cuotas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Installment' }],
    contactoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact', required: true },
    usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const Loan = mongoose.model('Loan', LoanSchema);
export default Loan;