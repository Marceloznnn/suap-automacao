import express from "express";
import multer from "multer";
import fs from "fs";
import { processarFaltasArquivo, adicionarFaltaManual } from "../controllers/faltasController.js";

const router = express.Router();

// Garante que a pasta exista
const uploadDir = "src/uploads";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const upload = multer({ dest: uploadDir });

// Upload para N8N
router.post("/upload-faltas", upload.single("arquivo"), processarFaltasArquivo);

// Adição manual
router.post("/manual", adicionarFaltaManual);

export default router;
