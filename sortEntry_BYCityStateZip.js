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
        this.cityMap = new Map();
        this.stateMap = new Map();
    }

    addContact(contact) {
        if (this.contacts.some(c => c.equals(contact))) {
            console.log("Duplicate contact found. Cannot add this contact.");
        } else {
            this.contacts.push(contact);
            this.updateCityAndStateMaps(contact);
            console.log("Contact added successfully.");
        }
    }

    removeContact(contact) {
        const index = this.contacts.findIndex(c => c.equals(contact));
        if (index !== -1) {
            this.contacts.splice(index, 1);
            this.updateCityAndStateMaps(contact, true); // true indicates removal
            return true;
        }
        return false;
    }

    updateCityAndStateMaps(contact, remove = false) {
        const updateMap = (map, key, value) => {
            if (remove) {
                map.get(key)?.delete(value);
                if (map.get(key)?.size === 0) {
                    map.delete(key);
                }
            } else {
                if (!map.has(key)) {
                    map.set(key, new Set());
                }
                map.get(key).add(value);
            }
        };

        updateMap(this.cityMap, contact.city, contact);
        updateMap(this.stateMap, contact.state, contact);
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
        const contact = this.findContactByName(firstName, lastName);
        if (contact) {
            this.removeContact(contact);
            return true;
        }
        return false;
    }

    searchByCity(city) {
        return Array.from(this.cityMap.get(city) || []);
    }

    searchByState(state) {
        return Array.from(this.stateMap.get(state) || []);
    }

    sortContactsByName() {
        this.contacts.sort((a, b) => {
            const nameA = a.firstName.toLowerCase() + " " + a.lastName.toLowerCase();
            const nameB = b.firstName.toLowerCase() + " " + b.lastName.toLowerCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        });
    }

    sortContactsByCity() {
        this.contacts.sort((a, b) => {
            if (a.city.toLowerCase() < b.city.toLowerCase()) return -1;
            if (a.city.toLowerCase() > b.city.toLowerCase()) return 1;
            return 0;
        });
    }

    sortContactsByState() {
        this.contacts.sort((a, b) => {
            if (a.state.toLowerCase() < b.state.toLowerCase()) return -1;
            if (a.state.toLowerCase() > b.state.toLowerCase()) return 1;
            return 0;
        });
    }

    sortContactsByZip() {
        this.contacts.sort((a, b) => a.zip.localeCompare(b.zip));
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
            results.push(addressBook.searchByCity(city));
        });
        return results;
    }

    searchByState(state) {
        const results = [];
        Object.values(this.addressBooks).forEach(addressBook => {
            results.push(addressBook.searchByState(state));
        });
        return results;
    }

};
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
        if (results.length === 0) {
            console.log(`No contacts found in city: ${city}`);
        } else {
            console.log(`Contacts found in city: ${city}`);
            results.forEach(contact => console.log(contact.toString()));
        }
    }

    searchByState(state) {
        const results = this.addressBookSystem.searchByState(state);
        if (results.length === 0) {
            console.log(`No contacts found in state: ${state}`);
        } else {
            console.log(`Contacts found in state: ${state}`);
            results.forEach(contact => console.log(contact.toString()));
        }
    }

    viewPersonsByCity() {
        const cityMap = this.addressBookSystem.viewPersonsByCity();
        cityMap.forEach((contacts, city) => {
            console.log(`City: ${city}`);
            contacts.forEach(contact => console.log(contact.toString()));
        });
    }

    viewPersonsByState() {
        const stateMap = this.addressBookSystem.viewPersonsByState();
        stateMap.forEach((contacts, state) => {
            console.log(`State: ${state}`);
            contacts.forEach(contact => console.log(contact.toString()));
        });
    }

    sortContactsByName(addressBookName) {
        const addressBook = this.addressBookSystem.getAddressBook(addressBookName);
        if (!addressBook) {
            console.log(`Address book "${addressBookName}" not found.`);
            return;
        }

        addressBook.sortContactsByName();
        console.log("Contacts sorted by name:");
        console.log(addressBook.listContacts());
    }

    sortContactsByCity(addressBookName) {
        const addressBook = this.addressBookSystem.getAddressBook(addressBookName);
        if (!addressBook) {
            console.log(`Address book "${addressBookName}" not found.`);
            return;
        }

        addressBook.sortContactsByCity();
        console.log("Contacts sorted by city:");
        console.log(addressBook.listContacts());
    }

    sortContactsByState(addressBookName) {
        const addressBook = this.addressBookSystem.getAddressBook(addressBookName);
        if (!addressBook) {
            console.log(`Address book "${addressBookName}" not found.`);
            return;
        }

        addressBook.sortContactsByState();
        console.log("Contacts sorted by state:");
        console.log(addressBook.listContacts());
    }

    sortContactsByZip(addressBookName) {
        const addressBook = this.addressBookSystem.getAddressBook(addressBookName);
        if (!addressBook) {
            console.log(`Address book "${addressBookName}" not found.`);
            return;
        }

        addressBook.sortContactsByZip();
        console.log("Contacts sorted by zip");
        console.log(addressBook.listContacts());
    }
}
const addressBookMain = new AddressBookMain();
addressBookMain.promptNewAddressBook();  // Add a new address book
addressBookMain.listAllAddressBooks(); 

const addressBookName = prompt('Enter the name of the address book to use: ');  // Use a specific address book
addressBookMain.addMultipleContacts(addressBookName);  // Add multiple new contacts to the specified address book
addressBookMain.showAllContacts(addressBookName);      // Display all contacts in the specified address book
addressBookMain.sortContactsByCity(addressBookName);
addressBookMain.sortContactsByState(addressBookName);
addressBookMain.sortContactsByZip(addressBookName);




