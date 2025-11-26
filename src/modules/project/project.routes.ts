import { Router } from "express";
import { ProjectController } from "./project.controller";
import { requireAuth } from "../../middlewares/auth.middleware";

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

/**
 * @swagger
 * /projects:
 *   put:
 *     summary: Create new project
 *     tags: [Project]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the project to update
 *         example: "a1b2c3d4"
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
 *         description: Project update success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Project"
 */
router.put("/:id", requireAuth, ProjectController.update);

/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     summary: Get project detail
 *     description: Retrieve detailed information of a specific project by its ID.
 *     tags: [Project]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the project to retrieve
 *         example: "54bffccd-9a30-4ed2-ac4e-4ffbe4eaaaba"
 *     responses:
 *       200:
 *         description: Project detail fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Project"
 *       404:
 *         description: Project not found
 *       401:
 *         description: Unauthorized - authentication required
 */
router.get("/:id", requireAuth, ProjectController.detail);

/**
 * @swagger
 * /projects/{id}:
 *   delete:
 *     summary: Delete Project
 *     description: Retrieve detailed information of a specific project by its ID.
 *     tags: [Project]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the project to retrieve
 *         example: "54bffccd-9a30-4ed2-ac4e-4ffbe4eaaaba"
 *     responses:
 *       200:
 *         description: Project detail fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Project"
 *       404:
 *         description: Project not found
 *       401:
 *         description: Unauthorized - authentication required
 */
router.get("/:id", requireAuth, ProjectController.delete);

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Get my project
 *     description: Retrieve detailed information of a specific project by its ID.
 *     tags: [Project]
 *     parameters:
 *       - in: query
 *         name: page
 *         required: true
 *         schema:
 *           type: number
 *         description: Page number
 *         example: 1
 *       - in: query
 *         name: limit
 *         required: true
 *         schema:
 *           type: number
 *         description: Page number
 *         example: 10
 *     responses:
 *       200:
 *         description: Project List successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Project"
 *       404:
 *         description: Project not found
 *       401:
 *         description: Unauthorized - authentication required
 */
router.get("/", requireAuth, ProjectController.getMyProject);

export default router;
