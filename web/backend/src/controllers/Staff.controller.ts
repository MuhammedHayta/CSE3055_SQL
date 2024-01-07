import Database from "../utils/Database.js";

const getAllStaffs = async (req, res) => {
    try {
        const data = await Database.execute("select * from staff s "+
        "inner join person p on s.personid = p.id ");
        res.status(200).json(data.recordset);
    } catch (error) {
        console.error(`Error fetching staffs: ${error}`);
        res.status(500).json({ errorMessage: error });
    }
}

const StaffController = {
    getAllStaffs
}

export default StaffController;
