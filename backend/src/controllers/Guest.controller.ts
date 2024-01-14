import Database from "../utils/Database.js";

const getAllGuests = async (req, res) => {
    try {
        const data = await Database.execute("SELECT * FROM Guest inner join person on guest.personid = person.id");
        res.status(200).json(data.recordset);
    } catch (error) {
        console.error(`Error fetching guests: ${error}`);
        res.status(500).json({ errorMessage: error });
    }
}

const addGuest = async (req, res) => {
    try {
        const {FirstName, LastName, Birthdate, PhoneNumber, IdentityNumber, Company} = req.body;

        const data = await Database.execute(`
            INSERT INTO person (FirstName, LastName, Birthdate, PhoneNumber, IdentityNumber)
            OUTPUT INSERTED.id
            VALUES (@FirstName, @LastName, @Birthdate, @PhoneNumber, @IdentityNumber)
            `, {
            FirstName,
            LastName,
            Birthdate,
            PhoneNumber,
            IdentityNumber,
            });

        
        const personId = data.recordset[0].id;

        await Database.execute(`INSERT INTO guest VALUES ('${personId}', '${Company}')`);

        res.status(200).json({ message: "Guest added successfully" });
    } catch (error) {
        console.error(`Error adding guest: ${error}`);
        res.status(500).json({ errorMessage: error });
    }
}


const updateGuest = async (req, res) => {
    try {
        const { ID, FirstName, LastName, Birthdate, PhoneNumber, IdentityNumber, Company} = req.body;

        await Database.execute(`UPDATE person SET FirstName = '${FirstName}', LastName = '${LastName}', Birthdate = '${Birthdate}', PhoneNumber = '${PhoneNumber}', IdentityNumber = '${IdentityNumber}' WHERE ID = '${ID}'`);
        await Database.execute(`UPDATE guest SET Company = '${Company}' WHERE ID = '${ID}'`);

        res.status(200).json({ message: "Guest updated successfully" });
    } catch (error) {
        console.error(`Error updating guest: ${error}`);
        res.status(500).json({ errorMessage: error });
    }
}

const deleteGuest = async (req, res) => {
    try {
        const { ID } = req.body;

        await Database.execute(`DELETE FROM guest WHERE ID = '${ID}'`);
        await Database.execute(`DELETE FROM person WHERE ID = '${ID}'`);

        res.status(200).json({ message: "Guest deleted successfully" });
    } catch (error) {
        console.error(`Error deleting guest: ${error}`);
        res.status(500).json({ errorMessage: error });
    }
}


const GuestController = {
    getAllGuests,
    addGuest,
    updateGuest,
    deleteGuest
}

export default GuestController;
