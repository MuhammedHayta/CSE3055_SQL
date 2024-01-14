import Database from "../utils/Database.js";

const getAllGuestCards = async (req, res) => {
    try {
        const data = await Database.execute("select * from guest_card left join guest_movement on guest_card.guestmovementid = guest_movement.id")
        res.status(200).json(data.recordset)
    } catch (error) {
        console.error(`Error fetching guest cards: ${error}`)
        res.status(500).json({ errorMessage: error })
    }
}


const GuestCardController = {
    getAllGuestCards
}

export default GuestCardController;