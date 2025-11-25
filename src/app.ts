import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import { errorHandler } from "./middlewares/error.middleware";
import routes from "./routes";
import { connectDB } from "./database/ormconfig";
import { setupSwagger } from "./config/swagger";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(morgan("dev"));
setupSwagger(app);
app.use("/api", routes);
app.use(errorHandler);

connectDB();

export default app;
