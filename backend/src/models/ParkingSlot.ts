import Vehicle from './Vehicle.js';

class ParkingSlot {
    ID: number;
    VehicleID: number | null;
    Vehicle: Vehicle | null; // Reference to the associated Vehicle entity
    Status: 'Available' | 'Occupied' | 'Reserved';
    Category: string;

    constructor(
        ID: number,
        VehicleID: number | null,
        Vehicle: Vehicle | null,
        Status: 'Available' | 'Occupied' | 'Reserved' = 'Available',
        Category: string
    ) {
        this.ID = ID;
        this.VehicleID = VehicleID;
        this.Vehicle = Vehicle;
        this.Status = Status;
        this.Category = Category;
    }
}

export default ParkingSlot;
