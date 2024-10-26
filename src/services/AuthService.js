import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const signUp = async (user) => {
    const { nombre, email, password } = user;

    try {
        const user = new User({
            nombre,
            email,
            password: await bcrypt.hash(password, 10),
        });
        await user.save();
        return user;
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        throw new Error("Error al registrar usuario.");
    }
};

export const signIn = async (email, password) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("Usuario no encontrado.");
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            throw new Error("Contraseña incorrecta.");
        }
        return user;
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        throw new Error("Error al iniciar sesión.");
    }
};
