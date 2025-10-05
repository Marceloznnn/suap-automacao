import express from "express";
import {
  listarAulas,
  criarAula,
  atualizarAula,
  deletarAula,
  buscarAula
} from "../controllers/aulasController.js";

const router = express.Router();

// GET /api/aulas
router.get("/", listarAulas);

// GET /api/aulas/:id
router.get("/:id", buscarAula);

// POST /api/aulas
router.post("/", criarAula);

// PUT /api/aulas/:id
router.put("/:id", atualizarAula);

// DELETE /api/aulas/:id
router.delete("/:id", deletarAula);

export default router;
