import { Router } from "express";
import { registerUser} from "../controllers/user.controller.js"

const userRoutes = Router();

// userRoutes.route("/curruser").get(getCurrUser);
userRoutes.route("/signup").post(registerUser);

export default userRoutes;
