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

    equals(other) {
        return this.firstName === other.firstName && this.lastName === other.lastName;
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
        if (this.contacts.some(c => c.equals(contact))) {
            console.log("Duplicate contact found. Cannot add this contact.");
        } else {
            this.contacts.push(contact);
            console.log("Contact added successfully.");
        }
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

    deleteContact(firstName, lastName) {
        const index = this.contacts.findIndex(contact => contact.firstName === firstName && contact.lastName === lastName);
        if (index !== -1) {
            this.contacts.splice(index, 1);
            return true;
        }
        return false;
    }
}
class AddressBookMain {
    constructor() {
        this.addressBookSystem = new AddressBookSystem();
    }

    promptNewAddressBook() {
        const name = prompt('Enter name for new address book: ');
        this.addressBookSystem.addAddressBook(name);
    }

    addMultipleContacts(addressBookName) {
        const addressBook = this.addressBookSystem.getAddressBook(addressBookName);
        if (!addressBook) {
            console.log(`Address book "${addressBookName}" not found.`);
            return;
        }

        let addMore = true;
        while (addMore) {
            const contact = this.getContactDetailsFromUser();
            addressBook.addContact(contact);
            addMore = confirm('Do you want to add another contact?');
        }
    }

    editExistingContact(addressBookName) {
        const addressBook = this.addressBookSystem.getAddressBook(addressBookName);
        if (!addressBook) {
            console.log(`Address book "${addressBookName}" not found.`);
            return;
        }

        const firstName = prompt('Enter first name of the contact to edit: ');
        const lastName = prompt('Enter last name of the contact to edit: ');

        const contact = addressBook.findContactByName(firstName, lastName);

        if (contact) {
            console.log("Contact found. Enter new details:");
            const updatedDetails = this.getContactDetailsFromUser();
            addressBook.editContact(contact, updatedDetails);
            console.log("Contact updated successfully.");
        } else {
            console.log("Contact not found.");
        }
    }

    deleteContact(addressBookName) {
        const addressBook = this.addressBookSystem.getAddressBook(addressBookName);
        if (!addressBook) {
            console.log(`Address book "${addressBookName}" not found.`);
            return;
        }

        const firstName = prompt('Enter first name of the contact to delete: ');
        const lastName = prompt('Enter last name of the contact to delete: ');

        if (addressBook.deleteContact(firstName, lastName)) {
            console.log("Contact deleted successfully.");
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

    showAllContacts(addressBookName) {
        const addressBook = this.addressBookSystem.getAddressBook(addressBookName);
        if (!addressBook) {
            console.log(`Address book "${addressBookName}" not found.`);
            return;
        }

        console.log(addressBook.listContacts());
    }

    listAllAddressBooks() {
        console.log(this.addressBookSystem.listAddressBooks());
    }
}
class AddressBookSystem {
    constructor() {
        this.addressBooks = {};
    }

    addAddressBook(name) {
        if (this.addressBooks[name]) {
            console.log("Address book with this name already exists.");
        } else {
            this.addressBooks[name] = new AddressBook();
            console.log(`Address book "${name}" added successfully.`);
        }
    }

    getAddressBook(name) {
        return this.addressBooks[name];
    }

    listAddressBooks() {
        return Object.keys(this.addressBooks).join(", ");
    }
}
// calling function
const addressBookMain = new AddressBookMain();
addressBookMain.promptNewAddressBook();  // Add a new address book
addressBookMain.listAllAddressBooks();   // List all address books

const addressBookName = prompt('Enter the name of the address book to use: ');  // Use a specific address book
addressBookMain.addMultipleContacts(addressBookName);  // Add multiple new contacts to the specified address book
addressBookMain.showAllContacts(addressBookName);      // Display all contacts in the specified address book
addressBookMain.editExistingContact(addressBookName);  // Edit an existing contact in the specified address book
addressBookMain.showAllContacts(addressBookName);      // Display all contacts again to show the update
addressBookMain.deleteContact(addressBookName);        // Delete a contact in the specified address book
addressBookMain.showAllContacts(addressBookName);      // Display all contacts again to show the deletion
