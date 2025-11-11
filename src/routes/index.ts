import {Router} from "express";
import userRoutes from "../modules/user/user.routes";
import authRoutes from "../modules/auth/auth.routes";
import healthRoutes from "../modules/health/health.routes";
import projectRoutes from "../modules/project/project.routes";

const router = Router();
router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/health", healthRoutes);
router.use("/project", projectRoutes);
export default router;
