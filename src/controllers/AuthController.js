import { signIn, signUp } from "../services/AuthService.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await signUp({
            nombre: name,
            email: email,
            password: password,
        });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.status(200).json({ name: name, email: email, token: token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await signIn(email, password);
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.status(200).json({ id: user._id, name: user.nombre, email: user.email, token: token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
