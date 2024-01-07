import sql from "msnodesqlv8";
import Database from "../utils/Database.js";

const getAllMalfunctions = async (req, res) => {

    const pool = await Database.getPool();
    const request = pool.request();
    try {
        const data = await request.query("select * from malfunction m "+
        "left join staff s on m.staffid = s.id "+
        "inner join person p on s.personid = p.id "+
        "inner join machine mc on m.machineid = mc.id")
        res.status(200).send(data.recordset);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
}

const addMalfunction = async (req, res) => {
    const {staffID, machineID, startDate, malfunctionDefinition} = req.body;

    const pool = await Database.getPool();
    const request = pool.request();

    try {
        request.input('StaffID', staffID);
        request.input('MachineID', machineID);
        request.input('StartDate', startDate);
        request.input('MalfunctionDefinition', malfunctionDefinition);

        await request.execute('ReportMalfunction');
        console.log("Malfunction reported successfully");
        res.status(200).send("Malfunction reported successfully");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error while reporting malfunction");
    }
}

const updateMalfunction = async (req, res) => {
    const {ID, StaffID, MachineID, MalfunctionDefinition, StartDate, EndDate, FixedBy, PerformedProcess, Status} = req.body;

    const pool = await Database.getPool();
    const request = await pool.request();

    try {
        await Database.execute(`update malfunction set staffid = ${StaffID}, machineid = ${MachineID}, malfunctiondefinition = '${MalfunctionDefinition}', startdate = '${StartDate}', enddate = '${EndDate}', fixedby = '${FixedBy}', performedprocess = '${PerformedProcess}', status = '${Status}' where id = ${ID}`);

        console.log("Malfunction updated successfully");
        res.status(200).send("Malfunction updated successfully");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error while updating malfunction");
    }
}

const deleteMalfunction = async (req, res) => {
    const {ID} = req.body;

    const pool = await Database.getPool();
    const request = await pool.request();

    try {
        await Database.execute(`delete from malfunction where id = ${ID}`);

        console.log("Malfunction deleted successfully");
        res.status(200).send("Malfunction deleted successfully");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error while deleting malfunction");
    }
}

const MalfunctionController = {
    getAllMalfunctions,
    addMalfunction,
    updateMalfunction,
    deleteMalfunction
}

export default MalfunctionController;
