import Database from "../utils/Database.js";

const getAllVehicles = async (req, res) => {
    try {
        const data = await Database.execute("select * from vehicle")
        res.status(200).json(data.recordset)
    } catch (error) {
        console.error(`Error fetching vehicles: ${error}`)
        res.status(500).json({ errorMessage: error })
    }
}

const VehicleController = {
    getAllVehicles
}

export default VehicleController;
