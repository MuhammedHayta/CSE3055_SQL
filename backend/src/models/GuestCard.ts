import GuestMovement from "./GuestMovement.js";


class GuestCard {
    ID: number;
    CardNumber: string;
    CardName: string;
    CardStatus: 'Available' | 'Busy' | 'Lost';
    IssuedID: number;
    IssuedMovement: GuestMovement; // Reference to the associated GuestMovement entity

    constructor(
        ID: number,
        CardNumber: string,
        CardName: string,
        CardStatus: 'Available' | 'Busy' | 'Lost',
        IssuedID: number,
        IssuedMovement: GuestMovement
    ) {
        this.ID = ID;
        this.CardNumber = CardNumber;
        this.CardName = CardName;
        this.CardStatus = CardStatus;
        this.IssuedID = IssuedID;
        this.IssuedMovement = IssuedMovement;
    }
}

export default GuestCard;
