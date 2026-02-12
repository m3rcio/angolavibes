import { Router } from "express";
import { signup } from "../controllers/auth.controller";
import { login } from "../controllers/auth.controller";
import {googleAuth} from "../controllers/auth.controller"
import { refreshTokenController } from "../controllers/utils/refreshTokenController";
const authRoutes=Router();

authRoutes.post("/signup",signup);
authRoutes.post("/login",login);
authRoutes.post("/refresh",refreshTokenController);
authRoutes.post("/google", googleAuth);
export default authRoutes;