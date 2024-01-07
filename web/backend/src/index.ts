import morgan from "morgan";
import chalk from 'chalk';
import express from "express";
import cors from "cors";
import compression from "compression";
import bodyParser from "body-parser";
import http from "http";
import Database from "./utils/Database.js";
import AnnualLeaveRouter from "./routers/AnnualLeave.router.js";
import MachineRouter from "./routers/Machine.router.js";
import DepartmentRouter from "./routers/Department.router.js";
import GuestRouter from "./routers/Guest.router.js";
import GuestCardRouter from "./routers/GuestCard.router.js";
import GuestMovementRouter from "./routers/GuestMovement.router.js";
import MalfunctionRouter from "./routers/Malfunction.router.js";
import ParkingSlotRouter from "./routers/ParkingSlot.router.js";
import StaffRouter from "./routers/Staff.router.js";
import StaffMovementRouter from "./routers/StaffMovement.router.js";
import VehicleRouter from "./routers/Vehichle.router.js"
import WorkDayRouter from "./routers/WorkDay.router.js";

const app = express();

app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(express.raw({ limit: '50mb', type: 'application/octet-stream' }));


const corsOptions = {
    origin: ['http://localhost:5173'],
    credentials: true, // Allow sending cookies and other credentials
};
  
  

app.use(cors(corsOptions));
app.use(express.json());

  //Print coming requests to the console
app.use(morgan(function (tokens, req, res){
    return [
        "\n\n\n--------------------------New Request---------------------------\n",
        chalk.hex('#1946BD').bold(tokens.method(req, res)),
        chalk.hex("#3A5FE9")(tokens.url(req, res)),
        chalk.hex("#2ed573").bold(tokens.status(req, res)),
        chalk.white(tokens['response-time'](req, res) + ' ms'),
        chalk.hex('#f78fb3').bold(' ' + tokens.date(req, res)),
    ].join(" ");
  }));


//converts body to json
app.use(bodyParser.json());

//Conect to database
Database.connect();

const server = http.createServer(app);
server.listen(5000, ()=>{
  console.log("Server running on port 5000");
})


app.use("/api/annual-leaves",AnnualLeaveRouter)
app.use("/api/departments",DepartmentRouter)
app.use("/api/guests",GuestRouter)
app.use("/api/guest-cards",GuestCardRouter)
app.use("/api/guest-movements",GuestMovementRouter)
app.use("/api/machines",MachineRouter)
app.use("/api/malfunctions",MalfunctionRouter)
app.use("/api/parking-slots", ParkingSlotRouter)
app.use("/api/staffs",StaffRouter)
app.use("/api/staff-movements", StaffMovementRouter)
app.use("/api/vehicles",VehicleRouter)
app.use("/api/work-days",WorkDayRouter)



