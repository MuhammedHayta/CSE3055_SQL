import sql from "mssql";
import Database from "../utils/Database.js";

const getAllWorkDays = async (req, res) => {
    try {
        const data = await Database.execute("select * from work_day w "+
        "inner join staff s on w.staffid = s.id " +
        "inner join person p on s.personid = p.id" );
        res.status(200).json(data.recordset);
    } catch (error) {
        console.error(`Error fetching work days: ${error}`);
        res.status(500).json({ errorMessage: error });
    }
}

const addWorkDay = async (req, res) => {
    console.log("burasııııııııııııııııııııııııııııııııııııııııııııı")
    const {StaffID, Date, EntryTime, ExitTime} = req.body;
    console.log(req.body);
    const pool = await Database.getPool();
    const request = pool.request();

    try {
        request.input("StaffID", sql.Int, StaffID);
        request.input("Date", sql.Date, Date);
        request.input("EntryTime", sql.Time, EntryTime);
        request.input("ExitTime", sql.Time, ExitTime);
        request.query(`insert into work_day (staffid, date, entrytime, exittime) values (@StaffID, @Date, @EntryTime, @ExitTime)`);

        res.status(200).send("Work day added successfully");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error while adding work day");
    } 

    
}

const updateWorkDay = async (req, res) => {
    const {ID, StaffID, Date, EntryTime, ExitTime} = req.body;

    try {
        await Database.execute(`update work_day set staffid = ${StaffID}, date = '${Date}', entrytime = '${EntryTime}', exittime = '${ExitTime}' where id = ${ID}`);

        console.log("Work day updated successfully");
        res.status(200).send("Work day updated successfully");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error while updating work day");
    }
}

const deleteWorkDay = async (req, res) => {
    const {ID} = req.body;

    try {
        await Database.execute(`delete from work_day where id = ${ID}`);

        console.log("Work day deleted successfully");
        res.status(200).send("Work day deleted successfully");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error while deleting work day");
    }
}

const WorkDayController = {
    getAllWorkDays,
    addWorkDay,
    updateWorkDay,
    deleteWorkDay
}

export default WorkDayController
