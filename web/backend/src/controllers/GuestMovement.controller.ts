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



const GuestMovementController = {
    getAllGuestMovements
}

export default GuestMovementController