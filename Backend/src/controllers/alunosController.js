import * as AlunosService from "../services/alunosService.js";

export async function listarAlunos(req, res) {
  try {
    const alunos = await AlunosService.listarAlunos();
    res.json(alunos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao listar alunos" });
  }
}

export async function buscarAluno(req, res) {
  try {
    const { id } = req.params;
    const aluno = await AlunosService.buscarAluno(id);
    if (!aluno) return res.status(404).json({ erro: "Aluno não encontrado" });
    res.json(aluno);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao buscar aluno" });
  }
}

export async function criarAluno(req, res) {
  try {
    const { nome, matricula } = req.body;
    if (!nome || !matricula) return res.status(400).json({ erro: "Nome e matrícula são obrigatórios" });

    const aluno = await AlunosService.criarAluno({ nome, matricula });
    res.json({ sucesso: true, aluno });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao criar aluno" });
  }
}

export async function atualizarAluno(req, res) {
  try {
    const { id } = req.params;
    const { nome, matricula } = req.body;
    await AlunosService.atualizarAluno(id, { nome, matricula });
    res.json({ sucesso: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao atualizar aluno" });
  }
}

export async function deletarAluno(req, res) {
  try {
    const { id } = req.params;
    await AlunosService.deletarAluno(id);
    res.json({ sucesso: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao deletar aluno" });
  }
}