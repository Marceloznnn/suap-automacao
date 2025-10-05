import express from "express";
import {
  listarAlunos,
  criarAluno,
  atualizarAluno,
  deletarAluno,
  buscarAluno
} from "../controllers/alunosController.js";

const router = express.Router();

// GET /api/alunos
router.get("/", listarAlunos);

// GET /api/alunos/:id
router.get("/:id", buscarAluno);

// POST /api/alunos
router.post("/", criarAluno);

// PUT /api/alunos/:id
router.put("/:id", atualizarAluno);

// DELETE /api/alunos/:id
router.delete("/:id", deletarAluno);

export default router;
