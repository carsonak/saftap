import cors from "cors";
import express from "express";
import helmet from "helmet";
import { API_VERSION, createHealthResponse } from "@saftap/shared";
import { authRouter } from "./modules/auth/auth.routes.js";
import { mpesaRouter } from "./modules/mpesa/mpesa.routes.js";

const app = express();
const port = Number(process.env.PORT ?? 3000);

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/health", (_request, response) => {
  response.json(createHealthResponse("backend"));
});

app.get("/api/version", (_request, response) => {
  response.json({ version: API_VERSION });
});

app.use("/api/auth", authRouter);
app.use("/mpesa", mpesaRouter);

app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`);
});
