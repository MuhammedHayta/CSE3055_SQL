import Person from './Person.js';
import Vehicle from './Vehicle.js';

class StaffMovement {
    ID: number;
    VehicleID: number;
    Vehicle: Vehicle; // Reference to the associated Vehicle entity
    StaffId: number;
    Staff: Person; // Reference to the associated Staff (Person) entity
    DeparturePlace: string;
    ArrivalPlace: string;
    Description: string;
    Date: Date;

    constructor(
        ID: number,
        VehicleID: number,
        Vehicle: Vehicle,
        StaffId: number,
        Staff: Person,
        DeparturePlace: string,
        ArrivalPlace: string,
        Description: string,
        Date: Date
    ) {
        this.ID = ID;
        this.VehicleID = VehicleID;
        this.Vehicle = Vehicle;
        this.StaffId = StaffId;
        this.Staff = Staff;
        this.DeparturePlace = DeparturePlace;
        this.ArrivalPlace = ArrivalPlace;
        this.Description = Description;
        this.Date = Date;
    }
}

export default StaffMovement;
