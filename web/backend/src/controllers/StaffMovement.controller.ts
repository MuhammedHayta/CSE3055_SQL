import Database from "../utils/Database.js"

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


const StaffMovementController = {
    getAllStaffMovements
}

export default StaffMovementController