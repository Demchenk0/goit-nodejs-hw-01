const { Command } = require('commander');
const contacts = require('./contact');
// TODO: рефакторить
const invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
        case "list":
            const allContacts = await contacts.listContacts();
            console.table(allContacts);
            // ...
            break;

        case "get":
            const oneContact = await contacts.getContactById(id);
            console.log(oneContact);
            // ... id
            break;

        case "add":
            const newContact = await contacts.addContact(id, name, email, phone)
            console.log(newContact);
            // ... name email phone
            break;

        case "remove":
            const deleteContact = await contacts.removeContact(id)
            console.log(deleteContact);
            // ... id
            break;

        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}

const program = new Command();
program
    .option("-a, --action <type>", "choose action")
    .option("-i, --id <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const option = program.opts();
invokeAction(option);
