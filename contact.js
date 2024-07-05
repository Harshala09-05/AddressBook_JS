console.log("Welcome to Address Book.");
class Contacts{
    constructor(firstName, LastName, Address, city, state, zip, phone_No, email) {
        this.firstName = firstName;
        this.LastName = LastName;
        this.Address = Address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.phone_No = phone_No;
        this.email = email;
    }
    toString() {
        return '{this.firstName} ,{this.LastName},{this.Address},{this.city},{this.state},{this.zip},{this.phone_No},{this.email}';
    }
    
}
let Address = new Contacts("Harshu","Patil","Pen");

