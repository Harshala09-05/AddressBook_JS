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

    equals(contact) {
        return this.firstName === contact.firstName && this.lastName === contact.lastName;
    }
}

class AddressBook {
    constructor() {
        this.contacts = [];
        this.cityDictionary = new Map();
        this.stateDictionary = new Map();
    }

    addContact(contact) {
        if (this.contacts.some(c => c.equals(contact))) {
            console.log("Contact with this name already exists.");
            return;
        }
        this.contacts.push(contact);
        this.addToDictionary(this.cityDictionary, contact.city, contact);
        this.addToDictionary(this.stateDictionary, contact.state, contact);
        this.sortContacts();
    }

    listContacts() {
        return this.contacts.map(contact => contact.toString()).join("\n");
    }

    findContactByName(firstName, lastName) {
        return this.contacts.find(contact => contact.firstName === firstName && contact.lastName === lastName);
    }

    editContact(contact, updatedDetails) {
        const index = this.contacts.indexOf(contact);
        if (index !== -1) {
            this.removeFromDictionary(this.cityDictionary, contact.city, contact);
            this.removeFromDictionary(this.stateDictionary, contact.state, contact);

            Object.assign(contact, updatedDetails);

            this.addToDictionary(this.cityDictionary, contact.city, contact);
            this.addToDictionary(this.stateDictionary, contact.state, contact);
            this.sortContacts();
        }
    }

    deleteContact(firstName, lastName) {
        const index = this.contacts.findIndex(contact => contact.firstName === firstName && contact.lastName === lastName);
        if (index !== -1) {
            const contact = this.contacts[index];
            this.removeFromDictionary(this.cityDictionary, contact.city, contact);
            this.removeFromDictionary(this.stateDictionary, contact.state, contact);
            this.contacts.splice(index, 1);
            return true;
        }
        return false;
    }

    searchByCity(city) {
        return this.cityDictionary.get(city) || [];
    }

    searchByState(state) {
        return this.stateDictionary.get(state) || [];
    }

    countByCity(city) {
        return (this.cityDictionary.get(city) || []).length;
    }

    countByState(state) {
        return (this.stateDictionary.get(state) || []).length;
    }

    addToDictionary(dictionary, key, contact) {
        if (!dictionary.has(key)) {
            dictionary.set(key, []);
        }
        dictionary.get(key).push(contact);
    }

    removeFromDictionary(dictionary, key, contact) {
        if (dictionary.has(key)) {
            const contacts = dictionary.get(key);
            const index = contacts.indexOf(contact);
            if (index !== -1) {
                contacts.splice(index, 1);
                if (contacts.length === 0) {
                    dictionary.delete(key);
                }
            }
        }
    }
//sorting name by lastName
    sortContacts() {
        this.contacts.sort((a, b) => {
            if (a.lastName < b.lastName) return -1;
            if (a.lastName > b.lastName) return 1;
            if (a.firstName < b.firstName) return -1;
            if (a.firstName > b.firstName) return 1;
            return 0;
        });
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

    searchByCity(city) {
        const results = [];
        Object.values(this.addressBooks).forEach(addressBook => {
            results.push(...addressBook.searchByCity(city));
        });
        return results;
    }

    searchByState(state) {
        const results = [];
        Object.values(this.addressBooks).forEach(addressBook => {
            results.push(...addressBook.searchByState(state));
        });
        return results;
    }

    countByCity(city) {
        return Object.values(this.addressBooks)
            .map(addressBook => addressBook.countByCity(city))
            .reduce((acc, count) => acc + count, 0);
    }

    countByState(state) {
        return Object.values(this.addressBooks)
            .map(addressBook => addressBook.countByState(state))
            .reduce((acc, count) => acc + count, 0);
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

    searchByCity(city) {
        const results = this.addressBookSystem.searchByCity(city);
        const count = this.addressBookSystem.countByCity(city);
        if (results.length === 0) {
            console.log(`No contacts found in city: ${city}`);
        } else {
            console.log(`Contacts found in city: ${city} (Total: ${count})`);
            results.forEach(contact => console.log(contact.toString()));
        }
    }

    searchByState(state) {
        const results = this.addressBookSystem.searchByState(state);
        const count = this.addressBookSystem.countByState(state);
        if (results.length === 0) {
            console.log(`No contacts found in state: ${state}`);
        } else {
            console.log(`Contacts found in state: ${state} (Total: ${count})`);
            results.forEach(contact => console.log(contact.toString()));
        }
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

addressBookMain.deleteContact(addressBookName);

