class Person {
    ID: number;
    FirstName: string;
    LastName: string;
    Birthdate: string; // Assuming string for simplicity; you might use a specific Date type
    PhoneNumber?: string; // Optional field
    IdentityNumber?: string; // Optional field

    constructor(
        ID: number,
        FirstName: string,
        LastName: string,
        Birthdate: string,
        PhoneNumber?: string,
        IdentityNumber?: string
    ) {
        this.ID = ID;
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.Birthdate = Birthdate;
        this.PhoneNumber = PhoneNumber;
        this.IdentityNumber = IdentityNumber;
    }

}

export default Person