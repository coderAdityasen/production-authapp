import { Router } from "express";
import { login, registerUser} from "../controllers/user.controller.js"

const userRoutes = Router();

// userRoutes.route("/curruser").get(getCurrUser);
userRoutes.route("/signup").post(registerUser);
userRoutes.route("/login").post(login);

export default userRoutes;
