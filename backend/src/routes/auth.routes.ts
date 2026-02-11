import { Router } from "express";
import { signup } from "../controllers/auth.controller";
import { login } from "../controllers/auth.controller";
import {googleAuth} from "../controllers/auth.controller"
const authRoutes=Router();

authRoutes.post("/signup",signup);
authRoutes.post("/login",login);
authRoutes.post("/google", googleAuth);
export default authRoutes;