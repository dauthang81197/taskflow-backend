import {Router} from "express";
import {ProjectController} from "./project.controller";
import {requireAuth} from "../../middlewares/auth.middleware";
import {UserController} from "../user/user.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Project
 *   description: Project endpoints
 */

/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Create new project
 *     tags: [Project]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, description]
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Project A"
 *               description:
 *                 type: string
 *                 example: "Project A"
 *     responses:
 *       200:
 *         description: Project create success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Project"
 */
router.post("/", requireAuth, ProjectController.create);


export default router;
