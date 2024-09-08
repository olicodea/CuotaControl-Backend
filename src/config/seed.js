import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Loan from '../models/Loan.js';
import Contact from '../models/Contact.js';
import User from '../models/User.js';
import Installment from '../models/Installment.js';

dotenv.config();

const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}`;

mongoose.connect(URI, {})
    .then(() => {
        console.log('Conectado a MongoDB');
    })
    .catch((error) => {
        console.error('Error al conectar a MongoDB', error);
    });

const seedData = async () => {
    try {
        const usuario = await User.create({
            nombre: 'Juan Aquino',
            email: 'juan@ejemplo.com',
            password: 'password'
        });

        const contacto = await Contact.create({
            nombre: 'Gian Fernandez',
            telefono: '123456789',
            usuarioId: usuario._id
        });

        const prestamo = await Loan.create({
            tipo: true,
            monto: 3000,
            fechaInicio: new Date(),
            contactoId: contacto._id,
            usuarioId: usuario._id
        });

        const cuotas = await Installment.insertMany([
            {
                loanId: prestamo._id,
                monto: 1000,
                fechaVencimiento: new Date(new Date().setMonth(new Date().getMonth() + 1)),
                estado: 'pendiente'
            },
            {
                loanId: prestamo._id,
                monto: 1000,
                fechaVencimiento: new Date(new Date().setMonth(new Date().getMonth() + 2)),
                estado: 'pendiente'
            },
            {
                loanId: prestamo._id,
                monto: 1000,
                fechaVencimiento: new Date(new Date().setMonth(new Date().getMonth() + 3)),
                estado: 'pendiente'
            }
        ]);

        prestamo.cuotas = cuotas.map(cuota => cuota._id);
        await prestamo.save();

        console.log('Datos de prueba insertados correctamente');
    } catch (error) {
        console.error('Error al insertar datos de prueba:', error);
    } finally {
        mongoose.connection.close();
    }
};

seedData();