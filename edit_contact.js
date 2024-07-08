class Contact {
    constructor(firstName, lastName, address, city, state, zip, phoneNumber, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }

    toString() {
        return `${this.firstName} ${this.lastName}, ${this.address}, ${this.city}, ${this.state}, ${this.zip}, ${this.phoneNumber}, ${this.email}`;
    }
}
class AddressBook {
    constructor() {
        this.contacts = [];
    }

    addContact(contact) {
        this.contacts.push(contact);
    }

    listContacts() {
        return this.contacts.map(contact => contact.toString()).join("\n");
    }

    findContactByName(firstName, lastName) {
        return this.contacts.find(contact => contact.firstName === firstName && contact.lastName === lastName);
    }

    editContact(contact, updatedDetails) {
        Object.assign(contact, updatedDetails);
    }
}
class AddressBookMain {
    constructor() {
        this.addressBook = new AddressBook();
    }

    promptNewContact() {
        const contact = this.getContactDetailsFromUser();
        this.addressBook.addContact(contact);
    }

    editExistingContact() {
        const firstName = prompt('Enter first name of the contact to edit: ');
        const lastName = prompt('Enter last name of the contact to edit: ');

        const contact = this.addressBook.findContactByName(firstName, lastName);

        if (contact) {
            console.log("Contact found. Enter new details:");
            const updatedDetails = this.getContactDetailsFromUser();
            this.addressBook.editContact(contact, updatedDetails);
            console.log("Contact updated successfully.");
        } else {
            console.log("Contact not found.");
        }
    }

    getContactDetailsFromUser() {
        const firstName = prompt('Enter first name: ');
        const lastName = prompt('Enter last name: ');
        const address = prompt('Enter address: ');
        const city = prompt('Enter city: ');
        const state = prompt('Enter state: ');
        const zip = prompt('Enter zip: ');
        const phoneNumber = prompt('Enter phone number: ');
        const email = prompt('Enter email: ');

        return new Contact(firstName, lastName, address, city, state, zip, phoneNumber, email);
    }

    showAllContacts() {
        console.log(this.addressBook.listContacts());
    }
}

// calling function
const addressBookMain = new AddressBookMain();
addressBookMain.promptNewContact();  // Add a new contact
addressBookMain.showAllContacts();   // Display all contacts
addressBookMain.editExistingContact(); // Edit an existing contact
addressBookMain.showAllContacts();   // Display all contacts again to show the update
