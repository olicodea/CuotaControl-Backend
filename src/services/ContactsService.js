import Contact from "../models/Contact.js";

export const findContactsByUserId = async (userId) => {
  try {
    const contacts = await Contact.find({ usuarioId: userId });
    return contacts;
  } catch (error) {
    console.error("Error al obtener contactos:", error);
    throw new Error("Error al obtener contactos.");
  }
};
