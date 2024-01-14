import Database from "../utils/Database.js";

const getAllDepartments = async (req, res) => {
    try {
        const data = await Database.execute("SELECT * FROM Department inner join staff on Department.ManagerID = staff.ID inner join person on staff.personid = person.id");
        const allDepartments = data.recordset;
        res.status(200).json(allDepartments);
    } catch (error) {
        console.error(`Error fetching departments: ${error}`);
        res.status(500).json({ errorMessage: error });
    }
}

const DepartmentController = {
    getAllDepartments
}

export default DepartmentController
