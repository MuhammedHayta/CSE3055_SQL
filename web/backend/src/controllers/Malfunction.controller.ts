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
    const {StaffID, MachineID, MalfunctionDefinition} = req.body;

    const pool = await Database.getPool();
    const request = pool.request();

    console.log(req.body)

    const StartDate = new Date().toISOString().slice(0, 10);

    try {
        request.input('StaffID', StaffID);
        request.input('MachineID', MachineID);
        request.input('StartDate', StartDate);
        request.input('MalfunctionDefinition', MalfunctionDefinition);

        await request.execute('ReportMalfunction');
        console.log("Malfunction reported successfully");
        res.status(200).send("Malfunction reported successfully");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error while reporting malfunction");
    }
}

const updateMalfunction = async (req, res) => {
    const {ID,FixedBy, PerformedProcess} = req.body;

    const pool = await Database.getPool();
    const request = await pool.request();
    const EndDate = new Date().toISOString().slice(0, 10);
    const Status = "Closed";
    console.log(request.body);
    try {
        await Database.execute(`update malfunction set enddate = '${EndDate}', fixedby = '${FixedBy}', performedprocess = '${PerformedProcess}', status = '${Status}' where id = ${ID}`);

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
