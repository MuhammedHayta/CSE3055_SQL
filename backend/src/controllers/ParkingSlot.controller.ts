import Database from "../utils/Database.js"

const getAllParkingSlots = async (req, res) => {
    try {
        const data = await Database.execute("select * from parking_slot ps " +
        "left join vehicle v on ps.vehicleid = v.id");
        res.status(200).json(data.recordset);
    } catch (error) {
        console.error(`Error fetching parking slots: ${error}`);
        res.status(500).json({ errorMessage: error });
    }
}

const ParkingSlotController = {
    getAllParkingSlots
}

export default ParkingSlotController
