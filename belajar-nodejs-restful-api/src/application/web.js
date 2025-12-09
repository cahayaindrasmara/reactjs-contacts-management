import express from "express";
import {publicRouter} from "../route/public-api.js";
import {errorMiddleware} from "../middleware/error-middleware.js";
import {userRouter} from "../route/api.js";
import cors from "cors"

export const web = express();
web.use(cors({
  origin: "https://reactjs-contacts-management.vercel.app",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}))

web.options("*", cors());

web.use(express.json());

web.get("/", (req, res) => {
    res.status(200).json({ status: "OK", message: "API is running" });
});

web.use(publicRouter);
web.use(userRouter);

web.use(errorMiddleware);

// --- 8️⃣ Optional: global uncaught exception logging ---
process.on("uncaughtException", (err) => console.error("Uncaught Exception:", err));
process.on("unhandledRejection", (err) => console.error("Unhandled Rejection:", err));
