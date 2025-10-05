import pool from "../config/db.js";

export async function listarAlunos() {
  const [alunos] = await pool.query(`
    SELECT a.id, a.nome, a.matricula, 
           COALESCE(SUM(f.quantidade), 0) AS faltas
    FROM alunos a
    LEFT JOIN faltas f ON a.id = f.aluno_id
    GROUP BY a.id
    ORDER BY a.nome
  `);
  return alunos;
}

export async function criarAluno({ nome, matricula }) {
  const [result] = await pool.query(
    "INSERT INTO alunos (nome, matricula) VALUES (?, ?)",
    [nome, matricula]
  );
  return { id: result.insertId, nome, matricula, faltas: 0 };
}

export async function atualizarAluno(id, { nome, matricula }) {
  await pool.query(
    "UPDATE alunos SET nome = ?, matricula = ? WHERE id = ?",
    [nome, matricula, id]
  );
}

export async function deletarAluno(id) {
  await pool.query("DELETE FROM alunos WHERE id = ?", [id]);
}

export async function buscarAluno(id) {
  const [alunos] = await pool.query(`
    SELECT a.id, a.nome, a.matricula, 
           COALESCE(SUM(f.quantidade), 0) AS faltas
    FROM alunos a
    LEFT JOIN faltas f ON a.id = f.aluno_id
    WHERE a.id = ?
    GROUP BY a.id
  `, [id]);
  return alunos[0];
}
