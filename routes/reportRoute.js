
import express from "express"
import { getTodayReport } from "../controller/ReportControllers/getTodayReport.js";
import { getStoredReport } from "../controller/ReportControllers/getStoredReport.js";
const route = express.Router();

route.get("/getStoredReport", getStoredReport);
route.get("/getTodayReport", getTodayReport);

export default route;