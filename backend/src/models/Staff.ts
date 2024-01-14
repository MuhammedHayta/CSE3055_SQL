import Person from './Person.js';

class Staff {
    StaffID: number;
    Person: Person; // Reference to the associated Person entity
    BaseSalary: number;
    Password: string;
    UserPermission: Buffer;
    MechanicPermission: Buffer;
    GuestPermission: Buffer;
    EmploymentDate: string; // Assuming string for simplicity; you might use a specific Date type
    TotalLaborTime: number;
    TotalSalary: number;

    constructor(
        StaffID: number,
        Person: Person,
        BaseSalary: number = 106.26,
        Password: string,
        UserPermission: Buffer,
        MechanicPermission: Buffer,
        GuestPermission: Buffer,
        EmploymentDate: string,
        TotalLaborTime: number = 0,
        TotalSalary: number = 17002.12
    ) {
        this.StaffID = StaffID;
        this.Person = Person;
        this.BaseSalary = BaseSalary;
        this.Password = Password;
        this.UserPermission = UserPermission;
        this.MechanicPermission = MechanicPermission;
        this.GuestPermission = GuestPermission;
        this.EmploymentDate = EmploymentDate;
        this.TotalLaborTime = TotalLaborTime;
        this.TotalSalary = TotalSalary;
    }
}

export default Staff;
