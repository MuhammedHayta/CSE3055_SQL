import Database from "../utils/Database.js";

const getAllGuests = async (req, res) => {
    try {
        const data = await Database.execute("SELECT * FROM Guest inner join person on guest.id = person.id");
        res.status(200).json(data.recordset);
    } catch (error) {
        console.error(`Error fetching guests: ${error}`);
        res.status(500).json({ errorMessage: error });
    }
}


const GuestController = {
    getAllGuests
}

export default GuestController;
