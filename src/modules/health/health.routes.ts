import {Router} from "express";
import {AppDataSource} from "../../database/ormconfig";

const router = Router();

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check API
 *     description: Check status server và connect database.
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Server successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 uptime:
 *                   type: string
 *                   example: 124.25s
 *                 responseTime:
 *                   type: string
 *                   example: 3ms
 *                 database:
 *                   type: string
 *                   example: connected
 *                 timestamp:
 *                   type: string
 *                   example: 2025-11-10T02:31:04.123Z
 *       500:
 *         description: Server or database error.
 */

router.get("", async (req, res) => {
    const start = Date.now();

    try {
        const isDbConnected = AppDataSource.isInitialized;
        if (!isDbConnected) {
            await AppDataSource.initialize();
        }

        await AppDataSource.query("SELECT 1");

        const duration = Date.now() - start;

        return res.status(200).json({
            status: "ok",
            uptime: process.uptime().toFixed(2) + "s",
            responseTime: `${duration}ms`,
            database: "connected",
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error("❌ Health check error:", error);
        return res.status(500).json({
            status: "error",
            database: "disconnected",
            error: (error as Error).message,
            timestamp: new Date().toISOString(),
        });
    }
});

export default router;
