import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";

import alunosRoutes from "./routes/alunosRoutes.js";
import aulasRoutes from "./routes/aulasRoutes.js";
import faltasRoutes from "./routes/faltasRoutes.js";

dotenv.config();

const app = express();

// ===== Garantir que a pasta de uploads exista =====
const uploadDir = "src/uploads";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// ===== Middlewares =====
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== Rotas =====
app.use("/api/alunos", alunosRoutes);
app.use("/api/aulas", aulasRoutes);
app.use("/api/faltas", faltasRoutes);

// Rota de teste
app.get("/", (req, res) => {
  res.send(`Servidor rodando na porta ${process.env.PORT || 3000}`);
});

export default app;
