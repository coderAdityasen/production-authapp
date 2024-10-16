import { Router } from "express";
import { getallprintdata, updatePrintStatus, uploadprint } from "../controllers/printer.controller.js";

const printRoutes = Router();

// admin routes 
printRoutes.route("/uploadprint").post(uploadprint);
printRoutes.route("/getallprint").get(getallprintdata)
printRoutes.route("/updatestatus").post(updatePrintStatus)
export default printRoutes;
