import express from "express"; 
import multer from "multer";
import fs from "fs";
import { 
  processarFaltasArquivo, 
  adicionarFaltaManual,
  listarFaltasDaAula   // <--- adicione esta linha
} from "../controllers/faltasController.js";

const router = express.Router();

// Garante que a pasta exista
const uploadDir = "src/uploads";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const upload = multer({ dest: uploadDir });

// Upload de arquivo
router.post("/upload-faltas", upload.single("arquivo"), processarFaltasArquivo);

// Adição manual
router.post("/manual", adicionarFaltaManual);

// LISTAR faltas de uma aula
router.get("/aula/:id", listarFaltasDaAula);  // <--- essa rota é nova

export default router;
