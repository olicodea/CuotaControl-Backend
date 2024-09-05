import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
    installmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Installment', required: true },
    monto: { type: Number, required: true },
    fechaPago: { type: Date, required: true },
    medioPago: { type: String, enum: ['efectivo', 'transferencia', 'tarjeta'], required: true },
}, { timestamps: true });

const Payment = mongoose.model('Payment', PaymentSchema);
export default Payment;