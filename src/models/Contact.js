import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    telefono: { type: String },
    email: { type: String },
    nota: { type: String },
    usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    activo: { type: Boolean, default: true },
}, { timestamps: true });

const Contact = mongoose.model('Contact', ContactSchema);
export default Contact;