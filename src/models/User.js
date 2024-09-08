import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    prestamos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Loan' }],
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);
export default User;