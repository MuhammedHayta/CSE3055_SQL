import Machine from "../models/Machine.js"
import Database from "../utils/Database.js"

const getAllMachines = async (req, res) => {
    try {
        const data = await Database.execute("SELECT * FROM Machine INNER JOIN Department ON Machine.DepartmentID = Department.ID")
        const allMachines: Machine[] = data.recordset;
        res.status(200).json(allMachines)
    } catch (error) {
        console.error(`Error fetching machines: ${error}`)
        res.status(500).json({ errorMessage: error })
    }
}



const MachineController = {
    getAllMachines
}

export default MachineController
