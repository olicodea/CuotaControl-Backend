import Contact from "../models/Contact.js";

export const findContactsByUserId = async (userId) => {
    try {
        const contacts = await Contact.find({
            usuarioId: userId,
            activo: true,
        });
        return contacts;
    } catch (error) {
        console.error("Error al obtener contactos:", error);
        throw new Error("Error al obtener contactos.");
    }
};

export const createContact = async (newContact) => {
    try {
        const contact = new Contact(newContact);
        await contact.save();
        return contact;
    } catch (error) {
        console.error("Error al crear contacto:", error);
        throw new Error("Error al crear contacto.");
    }
};

export const updateContact = async (contact) => {
    try {
        const updatedContact = await Contact.findByIdAndUpdate(
            contact.contactId,
            contact,
            { new: true }
        );
        return updatedContact;
    } catch (error) {
        console.error("Error al actualizar contacto:", error);
        throw new Error("Error al actualizar contacto.");
    }
};

export const deleteContact = async (contactId) => {
    try {
        await Contact.findByIdAndUpdate(contactId, { activo: false });
    } catch (error) {
        console.error("Error al eliminar contacto:", error);
        throw new Error("Error al eliminar contacto.");
    }
};
