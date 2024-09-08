import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    telefono: { type: String },
    email: { type: String },
    direccion: { type: String },
    notas: { type: String },
    usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const Contact = mongoose.model('Contact', ContactSchema);
export default Contact;