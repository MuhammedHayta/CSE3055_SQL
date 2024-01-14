import Person from './Person.js';

class WorkDay {
    ID: number;
    Date: string; // Assuming string for simplicity; you might use a specific Date type
    EntryTime: string; // Assuming string for simplicity; you might use a specific Time type
    ExitTime?: string; // Assuming string for simplicity; you might use a specific Time type
    StaffID: number;
    Staff: Person; // Reference to the associated Person entity

    constructor(
        ID: number,
        Date: string,
        EntryTime: string,
        ExitTime: string,
        StaffID: number,
        Staff: Person
    ) {
        this.ID = ID;
        this.Date = Date;
        this.EntryTime = EntryTime;
        this.ExitTime = ExitTime;
        this.StaffID = StaffID;
        this.Staff = Staff;
    }
}

export default WorkDay;
