import pool from "../config/db.js";

export async function listarAulas() {
  const [aulas] = await pool.query("SELECT * FROM aulas ORDER BY data_aula DESC");
  return aulas;
}

export async function criarAula({ data_aula, materia, quantidade_aulas, observacao, etapa, conteudo }) {
  const etapaValida = etapa || "1º Bimestre"; // padrão seguro
  const materiaValida = materia || "Sem nome";
  const quantidadeValida = quantidade_aulas || 1;
  const observacaoValida = observacao || "";
  const conteudoValido = conteudo || "(não informado)";

  const [result] = await pool.query(
    `INSERT INTO aulas (data_aula, materia, quantidade_aulas, observacao, etapa, conteudo)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [data_aula, materiaValida, quantidadeValida, observacaoValida, etapaValida, conteudoValido]
  );

  return {
    id: result.insertId,
    data_aula,
    materia: materiaValida,
    quantidade_aulas: quantidadeValida,
    observacao: observacaoValida,
    etapa: etapaValida,
    conteudo: conteudoValido,
  };
}

export async function atualizarAula(id, { data_aula, materia, quantidade_aulas, observacao, etapa, conteudo }) {
  await pool.query(
    `UPDATE aulas SET data_aula = ?, materia = ?, quantidade_aulas = ?, observacao = ?, etapa = ?, conteudo = ?
     WHERE id = ?`,
    [data_aula, materia, quantidade_aulas, observacao, etapa, conteudo, id]
  );
}


export async function deletarAula(id) {
  await pool.query("DELETE FROM aulas WHERE id = ?", [id]);
}

export async function buscarAula(id) {
  const [aulas] = await pool.query("SELECT * FROM aulas WHERE id = ?", [id]);
  return aulas[0];
}
