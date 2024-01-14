import Person from './Person.js';

class AnnualLeave {
    ID: number;
    StaffID: number;
    Staff: Person; // Reference to the associated Staff (Person) entity
    Description: string;
    StartDate: Date;
    EndDate?: Date;
    ApprovalStatus: 'Denied' | 'Pending' | 'Approved';

    constructor(
        ID: number,
        StaffID: number,
        Staff: Person,
        Description: string = 'EMPTY',
        StartDate: Date = new Date(),
        EndDate?: Date,
        ApprovalStatus: 'Denied' | 'Pending' | 'Approved' = 'Pending'
    ) {
        this.ID = ID;
        this.StaffID = StaffID;
        this.Staff = Staff;
        this.Description = Description;
        this.StartDate = StartDate;
        this.EndDate = EndDate;
        this.ApprovalStatus = ApprovalStatus;
    }
}

export default AnnualLeave;
