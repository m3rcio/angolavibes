import { Router } from "express";
import { signup } from "../controllers/auth.controller";
import {googleAuth} from "../controllers/auth.controller"
const authRoutes=Router();

authRoutes.post("/signup",signup);
authRoutes.post("/google", googleAuth);
export default authRoutes;