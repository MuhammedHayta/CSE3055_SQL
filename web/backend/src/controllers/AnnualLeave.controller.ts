import AnnualLeave from "../models/AnnualLeave.js";
import Database from "../utils/Database.js";

const getAllAnnualLeaves = async (req, res) => {

    try {
        const data = await Database.execute("SELECT * FROM annual_leave inner join staff on annual_leave.StaffID = staff.ID");
        const annualLeaves: AnnualLeave[] = data.recordset;
        res.status(200).json(annualLeaves);
      } catch (error) {
        console.error(`Error fetching annual leaves: ${error}`);
        res.status(500).json({ errorMessage: error });
      }

}

const addAnnualLeave = async (req, res) => {
    const {StaffID, Description, StartDate, EndDate, ApprovalStatus} = req.body;

    const pool = await Database.getPool();
    const request = pool.request();

    try {
        request.query(`insert into annual_leave values (${StaffID}, '${Description}', '${StartDate}', '${EndDate}', '${ApprovalStatus}')`);

        res.status(200).send("Annual leave added successfully");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error while adding annual leave");
    }
}

const updateAnnualLeave = async (req, res) => {
    const {ID, StaffID, Description, StartDate, EndDate, ApprovalStatus} = req.body;

    try {
        await Database.execute(`update annual_leave set staffid = ${StaffID}, description = '${Description}', startdate = '${StartDate}', enddate = '${EndDate}', approvalstatus = '${ApprovalStatus}' where id = ${ID}`);

        console.log("Annual leave updated successfully");
        res.status(200).send("Annual leave updated successfully");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error while updating annual leave");
    }
}

const deleteAnnualLeave = async (req, res) => {
    const {ID} = req.body;

    try {
        await Database.execute(`delete from annual_leave where id = ${ID}`);

        console.log("Annual leave deleted successfully");
        res.status(200).send("Annual leave deleted successfully");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error while deleting annual leave");
    }

}


      

const AnnualLeaveController = {
    getAllAnnualLeaves,
    addAnnualLeave,
    updateAnnualLeave,
    deleteAnnualLeave
}

export default AnnualLeaveController;