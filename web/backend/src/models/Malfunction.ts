import Person from './Person.js';
import Machine from './Machine.js';

class Malfunction {
    ID: number;
    StaffId: number;
    Staff: Person; // Reference to the associated Staff (Person) entity
    MachineId: number;
    Machine: Machine; // Reference to the associated Machine entity
    MalfunctionDefinition: string;
    StartDate?: Date;
    EndDate?: Date;
    FixedBy?: string | null;
    PerformedProcess: string;
    Status: 'Open' | 'Closed' | 'InProgress';

    constructor(
        ID: number,
        StaffId: number,
        Staff: Person,
        MachineId: number,
        Machine: Machine,
        MalfunctionDefinition: string,
        StartDate: Date,
        EndDate: Date,
        FixedBy: string | null = null,
        PerformedProcess: string,
        Status: 'Open' | 'Closed' | 'InProgress'
    ) {
        this.ID = ID;
        this.StaffId = StaffId;
        this.Staff = Staff;
        this.MachineId = MachineId;
        this.Machine = Machine;
        this.MalfunctionDefinition = MalfunctionDefinition;
        this.StartDate = StartDate;
        this.EndDate = EndDate;
        this.FixedBy = FixedBy;
        this.PerformedProcess = PerformedProcess;
        this.Status = Status;
    }
}

export default Malfunction;
