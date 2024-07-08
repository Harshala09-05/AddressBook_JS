console.log("Welcome to Address Book.");

class Contact {
    constructor(firstName, lastName, address, city, state, zip, phoneNo, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.phoneNo = phoneNo;
        this.email = email;
    }

    toString() {
        return `${this.firstName}, ${this.lastName}, ${this.address}, ${this.city}, ${this.state}, ${this.zip}, ${this.phoneNo}, ${this.email}`;
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
    
}

class AddressBookMain {
    constructor() {
        this.addressBook = new AddressBook();
    }

    addContact(firstName, lastName, address, city, state, zip, phoneNo, email) {
        const newContact = new Contact(firstName, lastName, address, city, state, zip, phoneNo, email);
        this.addressBook.addContact(newContact);
    }

    showAllContacts() {
        console.log(this.addressBook.listContacts());
    }
}

// Example usage
const addressBookMain = new AddressBookMain();
addressBookMain.addContact('Harshala', 'Patil', 'Gokul Apartment', 'Panvel', 'MH', '410206', '1234567890', 'harshu@gmail.com');  // Add a new contact
addressBookMain.showAllContacts();   // Display all contacts
