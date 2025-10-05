import * as AulasService from "../services/aulasService.js";

export async function listarAulas(req, res) {
  const aulas = await AulasService.listarAulas();
  res.json(aulas);
}

export async function criarAula(req, res) {
  try {
    const { data_aula, materia, quantidade_aulas, observacao, etapa, conteudo } = req.body;

    if (!data_aula) {
      return res.status(400).json({ erro: "Data da aula obrigatória" });
    }

    const aula = await AulasService.criarAula({
      data_aula,
      materia: materia || "Sem nome",
      quantidade_aulas: quantidade_aulas || 1,
      observacao: observacao || "",
      etapa: etapa || "1º Bimestre",
      conteudo: conteudo || "(não informado)"
    });

    res.json({ id: aula.id, ...aula });
  } catch (err) {
    console.error("❌ Erro ao criar aula:", err);
    res.status(500).json({ erro: "Erro ao criar aula" });
  }
}



export async function atualizarAula(req, res) {
  try {
    const { id } = req.params;
    const { data_aula, materia, quantidade_aulas, observacao, etapa, conteudo } = req.body;
    await AulasService.atualizarAula(id, { data_aula, materia, quantidade_aulas, observacao, etapa, conteudo });
    res.json({ sucesso: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao atualizar aula" });
  }
}

export async function deletarAula(req, res) {
  try {
    const { id } = req.params;
    await AulasService.deletarAula(id);
    res.json({ sucesso: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao deletar aula" });
  }
}

export async function buscarAula(req, res) {
  try {
    const { id } = req.params;
    const aula = await AulasService.buscarAula(id);
    if (!aula) return res.status(404).json({ erro: "Aula não encontrada" });
    res.json(aula);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao buscar aula" });
  }
}
