import Person from './Person.js';
import Vehicle from './Vehicle.js';

class GuestMovement {
    ID: number;
    GuestID: number;
    Guest: Person; // Reference to the associated Guest (Person) entity
    VehicleID: number;
    Vehicle: Vehicle; // Reference to the associated Vehicle entity
    EnterDate: Date;
    LeaveDate?: Date;
    VisitingReason: string;
    WhoToVisitID: number;
    WhoToVisit: Person; // Reference to the associated WhoToVisit (Person) entity
    CardNumber: string;

    constructor(
        ID: number,
        GuestID: number,
        Guest: Person,
        VehicleID: number,
        Vehicle: Vehicle,
        EnterDate: Date,
        LeaveDate: Date,
        VisitingReason: string,
        WhoToVisitID: number,
        WhoToVisit: Person,
        CardNumber: string
    ) {
        this.ID = ID;
        this.GuestID = GuestID;
        this.Guest = Guest;
        this.VehicleID = VehicleID;
        this.Vehicle = Vehicle;
        this.EnterDate = EnterDate;
        this.LeaveDate = LeaveDate;
        this.VisitingReason = VisitingReason;
        this.WhoToVisitID = WhoToVisitID;
        this.WhoToVisit = WhoToVisit;
        this.CardNumber = CardNumber;
    }
}

export default GuestMovement;
