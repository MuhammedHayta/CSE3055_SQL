import Person from './Person.js';

class Department {
    DepartmentID: number;
    DepartmentName: string;
    Location: string;
    ManagerID: number;
    Manager: Person; // Reference to the associated Manager (Person) entity

    constructor(
        DepartmentID: number,
        DepartmentName: string,
        Location: string,
        ManagerID: number,
        Manager: Person
    ) {
        this.DepartmentID = DepartmentID;
        this.DepartmentName = DepartmentName;
        this.Location = Location;
        this.ManagerID = ManagerID;
        this.Manager = Manager;
    }
}

export default Department;
