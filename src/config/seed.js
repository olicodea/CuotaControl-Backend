import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Loan from '../models/Loan.js';
import Contact from '../models/Contact.js';
import User from '../models/User.js';
import Installment from '../models/Installment.js';

dotenv.config();

const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}`;

mongoose.connect(URI)
    .then(() => {
        console.log('Conectado a MongoDB');
    })
    .catch((error) => {
        console.error('Error al conectar a MongoDB', error);
    });

const seedData = async () => {
    try {
        let usuario = await User.findOne({ email: 'juan@ejemplo.com' });
        if (!usuario) {
            usuario = await User.create({
                nombre: 'Juan Aquino',
                email: 'juan@ejemplo.com',
                password: 'password'
            });
        }

        let contacto = await Contact.findOne({ nombre: 'Gian Fernandez', telefono: '123456789' });
        if (!contacto) {
            contacto = await Contact.create({
                nombre: 'Gian Fernandez',
                telefono: '123456789',
                usuarioId: usuario._id
            });
        }

        const prestamoPrestado = await Loan.create({
            tipoPrestamo: 1,
            montoTotal: 3000,
            fechaInicio: new Date(),
            contactoId: contacto._id,
            usuarioId: usuario._id,
            nroPrestamo: 1,
        });

        const prestamoRecibido = await Loan.create({
            tipoPrestamo: 2,
            montoTotal: 4000,
            fechaInicio: new Date(),
            contactoId: contacto._id,
            usuarioId: usuario._id,
            nroPrestamo: 2,
        });

        const cuotasPrestamoPrestado = await Installment.insertMany([
            {
                loanId: prestamoPrestado._id,
                montoCuota: 1000,
                fechaVencimiento: new Date(new Date().setMonth(new Date().getMonth() + 1)),
                estadoCuota: 1,
            },
            {
                loanId: prestamoPrestado._id,
                montoCuota: 1000,
                fechaVencimiento: new Date(new Date().setMonth(new Date().getMonth() + 2)),
                estadoCuota: 1,
            },
            {
                loanId: prestamoPrestado._id,
                montoCuota: 1000,
                fechaVencimiento: new Date(new Date().setMonth(new Date().getMonth() + 3)),
                estadoCuota: 1
            }
        ]);

        const cuotasPrestamoRecibido = await Installment.insertMany([
            {
                loanId: prestamoRecibido._id,
                montoCuota: 1000,
                fechaVencimiento: new Date(new Date().setMonth(new Date().getMonth() + 1)),
                estadoCuota: 1,
            },
            {
                loanId: prestamoRecibido._id,
                montoCuota: 1000,
                fechaVencimiento: new Date(new Date().setMonth(new Date().getMonth() + 2)),
                estadoCuota: 1,
            },
            {
                loanId: prestamoRecibido._id,
                montoCuota: 1000,
                fechaVencimiento: new Date(new Date().setMonth(new Date().getMonth() + 3)),
                estadoCuota: 1
            }
        ]);

        await Loan.findByIdAndUpdate(prestamoPrestado._id, { cuotas: cuotasPrestamoPrestado.map(cuota => cuota._id) });
        await Loan.findByIdAndUpdate(prestamoRecibido._id, { cuotas: cuotasPrestamoRecibido.map(cuota => cuota._id) });

        await User.findByIdAndUpdate(usuario._id, {
            $push: { prestamos: { $each: [prestamoPrestado._id, prestamoRecibido._id] } }
        });

        console.log('Datos de prueba insertados correctamente');
    } catch (error) {
        console.error('Error al insertar datos de prueba:', error);
    } finally {
        mongoose.connection.close();
    }
};

seedData();
