import sql from "mssql"
import Database from "../utils/Database.js"
import Vehicle from "../models/Vehicle.js"

const getAllStaffMovements = async (req, res) => {
    try {
        const data = await Database.execute("select * from staff_movement sm "+
        "left join vehicle v on sm.vehicleid = v.id "+
        "inner join staff s on sm.staffid = s.id " + 
        "inner join person p on s.personid = p.id")
        res.status(200).json(data.recordset)
    } catch (error) {
        console.error(`Error fetching staff movements: ${error}`)
        res.status(500).json({ errorMessage: error })
    }
}

const addStaffMovement = async (req, res) => {

    const {StaffID, LicensePlate, DeparturePlace, ArrivalPlace, Description, Date} = req.body
    
    const pool = await Database.getPool()
    const request = await pool.request()

    try {
        
        //If staff has a vehicle, check if it exists in the database, if not, add it
        if(LicensePlate != null) {
            const vehiclesData = await request.input('LicensePlate', sql.NVarChar(100), LicensePlate).query`select * from vehicle where LicensePlate = @LicensePlate`

            console.log("bu" + vehiclesData.recordset.length)
            if(vehiclesData.recordset.length == 0) {
                console.log("vehicle is adding...")
                await request.query("insert into vehicle (LicensePlate) values (@LicensePlate)")
            }
        }

        const data = await request.query('SELECT ID FROM vehicle WHERE LicensePlate = @LicensePlate');
        var VehicleID;

        if(data.rowsAffected[0] != 0) {
            VehicleID = data.recordset[0].ID;

            const pool = await Database.getPool()
            const request2 = await pool.request()
            request2.input("VehicleID", VehicleID)

            await request2.execute("GiveParkingSlotToVehicle");
        }



        await pool.request()
        .input('StaffID', StaffID)
        .input('VehicleID', VehicleID)
        .input('DeparturePlace', DeparturePlace)
        .input('ArrivalPlace', ArrivalPlace)
        .input('Description', Description)
        .input('Date', Date)
        .query("INSERT INTO staff_movement (StaffID, VehicleID, DeparturePlace, ArrivalPlace, Description, Date) VALUES (@StaffID, @VehicleID, @DeparturePlace, @ArrivalPlace, @Description, @Date)");        



        res.status(201).json({ message: 'Staff movement added successfully!' })

    } catch (error) {
        console.error(`Error while adding staff movement: ${error}`)
        res.status(500).json({ errorMessage: error })
        
    }

}


const deleteStaffMovement = async (req, res) => {
    const { ID } = req.body

    console.log("ID: " + ID);

    const pool = await Database.getPool()
    const request = await pool.request()

    try {
        await request.input('ID', ID).query('DELETE FROM staff_movement WHERE ID = @ID')

        res.status(200).json({ message: 'Staff movement deleted successfully!' })
    } catch (error) {
        console.error(`Error while deleting staff movement: ${error}`)
        res.status(500).json({ errorMessage: error })
    }

}


const StaffMovementController = {
    getAllStaffMovements,
    addStaffMovement,
    deleteStaffMovement

}

export default StaffMovementController