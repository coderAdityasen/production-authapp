import { Router } from "express";
import {
  login,
  registerUser,
  getCurrUser,
} from "../controllers/user.controller.js";
import {protectRoute} from "../middlewares/protectRoute.js";

const userRoutes = Router();

// userRoutes.route("/curruser").get(getCurrUser);
userRoutes.route("/signup").post(registerUser);
userRoutes.route("/login").post(login);
userRoutes.route("/curruser").get(protectRoute, getCurrUser);


export default userRoutes;
