import Department from './Department.js';

class Machine {
    ID: number;
    DepartmentId: number;
    Department: Department; // Reference to the associated Department entity
    Description: string;
    PurchaseDate?: Date;
    SellDate?: Date;
    PurchasePrice?: number;
    SellPrice?: number;
    ServiceTime: number;

    constructor(
        ID: number,
        DepartmentId: number,
        Department: Department,
        Description: string,
        PurchaseDate: Date,
        SellDate: Date,
        PurchasePrice: number,
        SellPrice: number,
        ServiceTime: number
    ) {
        this.ID = ID;
        this.DepartmentId = DepartmentId;
        this.Department = Department;
        this.Description = Description;
        this.PurchaseDate = PurchaseDate;
        this.SellDate = SellDate;
        this.PurchasePrice = PurchasePrice;
        this.SellPrice = SellPrice;
        this.ServiceTime = ServiceTime;
    }
}

export default Machine;
