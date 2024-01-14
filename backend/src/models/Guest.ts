import Person from './Person.js'; // Assuming you have a Person class or interface

class Guest {
    ID: number;
    Person: Person; // Reference to the associated Person entity
    Company: string;

    constructor(ID: number, Person: Person, Company: string) {
        this.ID = ID;
        this.Person = Person;
        this.Company = Company;
    }
}

export default Guest;
