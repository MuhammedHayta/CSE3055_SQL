import sql from "mssql"
import Database from "../utils/Database.js"

const getAllGuestMovements = async (req, res) => {
    try {
        const data = await Database.execute("select * from guest_movement gm "+
        "inner join guest g on gm.guestid = g.id " +
        "left join vehicle v on gm.vehicleid = v.id " +
        "left join staff s on gm.WhoToVisit = s.id "+
        "inner join person p on s.personid = p.id")

        res.status(200).json(data.recordset)
    } catch (error) {
        console.error(`Error fetching guest movements: ${error}`)
        res.status(500).json({ errorMessage: error })
    }
}

const addGuestMovement = async (req, res) => {

    const pool = await Database.getPool()
    const request = await pool.request()


    try {
        const { GuestID, LicensePlate, EnterDate, VisitingReason, WhoToVisit } = req.body

        //If staff has a vehicle, check if it exists in the database, if not, add it
        if(LicensePlate != null) {
            const vehiclesData = await request.input('LicensePlate', sql.NVarChar(100), LicensePlate).query`select * from vehicle where LicensePlate = @LicensePlate`

            console.log("bu" + vehiclesData.recordset.length)
            if(vehiclesData.recordset.length == 0) {
                await request.query`insert into vehicle (LicensePlate) values (${LicensePlate})`
            }
        }

        const data1 = await request.query('SELECT ID FROM vehicle WHERE LicensePlate = @LicensePlate');
        var VehicleID;

        if(data1.rowsAffected[0] != 0) {
            VehicleID = data1.recordset[0].ID;
        }

        const data = await Database.execute(`
            INSERT INTO guest_movement (GuestID, VehicleID, EnterDate, VisitingReason, WhoToVisit)
            OUTPUT INSERTED.id
            VALUES (@GuestID, @VehicleID, @EnterDate, @VisitingReason, @WhoToVisit)
            `, {
            GuestID,
            VehicleID,
            EnterDate,
            VisitingReason,
            WhoToVisit
            })

        const guestMovementId = data.recordset[0].id

        request.input("GuestMovementID", guestMovementId)

        await request.execute("GiveCardToGuestMovement");

        const data2 = await Database.execute(`select id from parking_slot where vehicleid = ${VehicleID}`)
        const ParkingSlotID = data2.recordset[0]?.id

        const returnData = {
            ParkingSlotID: ParkingSlotID,
            GuestMovementID: guestMovementId,
            CardNumber: data.recordset[0].CardNumber
        }

        res.status(200).json(returnData)
    } catch (error) {
        console.error(`Error adding guest movement: ${error}`)
        res.status(500).json({ errorMessage: error })
    }

}





const GuestMovementController = {
    getAllGuestMovements,
    addGuestMovement
}

export default GuestMovementController