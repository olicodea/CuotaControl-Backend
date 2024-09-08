import mongoose from 'mongoose';
import { PaymentMethods } from '../enums/PaymentMethods';

const PaymentSchema = new mongoose.Schema({
    installmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Installment', required: true },
    montoPago: { type: Number, required: true },
    fechaPago: { type: Date, required: true },
    medioPago: { type: Number, enum: Object.values(PaymentMethods), required: true },
}, { timestamps: true });

const Payment = mongoose.model('Payment', PaymentSchema);
export default Payment;