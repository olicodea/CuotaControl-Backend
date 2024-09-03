import { findHomeData } from "../services/HomeService.js";

export const getHomeData = (req, res) => {
    try {
        const data = findHomeData();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los datos del Home" });
    }
};
