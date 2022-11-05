const fs = require("fs/promises");

const patch = require("path");
const crypto = require('crypto');

const updateContact = async (contacts) => {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}
const contactsPath = patch.join(__dirname, "db/contacts.json");
/*
 * Розкоментуйте і запиши значення
 * const contactsPath = ;
 */

// TODO: задокументувати кожну функцію
const listContacts = async () => {
    // ...твій код
    const result = await fs.readFile(contactsPath)
    return JSON.parse(result)
}

const getContactById = async (id) => {
    // ...твій код
    const contacts = await listContacts()
    const result = await contacts.find(contact => contact.id === id)
    if (!result) {
        return null;
    }
    return result;
}
const addContact = async (id, name, email, phone) => {
    // ...твій код
    const contacts = await listContacts()
    const newContact = {
        id: crypto.randomInt(999).toString(),
        name,
        email,
        phone,
    }
    contacts.push(newContact);
    updateContact(contacts);
    return newContact
}

const removeContact = async (id) => {
    // ...твій код
    const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === id);

    if (idx === -1) {
        return null;
    }

    const [result] = contacts.splice(idx, 1);
    updateContact(contacts);

    return result;
}



module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact
}