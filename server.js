import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/connectDB.js";
import cors from "cors";
import todoRoute from "./routes/todoRoute.js"
import reportRoute from "./routes/reportRoute.js"
import startDailyReportJob from "./cron/dailyReportJob.js";
dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL;
connectDB();
startDailyReportJob();

const corsOption = {
    origin:FRONTEND_URL,
    creadentials: true
}
app.use(cors(corsOption));

app.get("/", (req, res) => {
    res.json({
        message: "home get route"
    })
});

app.use("/todo", todoRoute);
app.use("/report", reportRoute);

app.listen(PORT, (req, res) => {
    console.log(`app is started on port: ${PORT}`);
});