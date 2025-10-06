import fs from "fs/promises";
import pool from "../config/db.js";
import { parseArquivo } from "../utils/parseArquivo.js";

export async function registrarFaltasArquivo(caminhoArquivo, aulaId = null) {
  console.log("📖 Lendo arquivo:", caminhoArquivo);
  const conteudo = await fs.readFile(caminhoArquivo, "utf8");
  const nomes = parseArquivo(conteudo);

  const aulaIdFinal = !aulaId || aulaId === "null" ? null : Number(aulaId);
  let faltasRegistradas = 0;

  for (const nome of nomes) {
    const [alunos] = await pool.query("SELECT id FROM alunos WHERE nome = ?", [nome]);
    if (!alunos.length) {
      console.warn(`⚠️ Aluno não encontrado: ${nome}`);
      continue;
    }

    const alunoId = alunos[0].id;
    await pool.query(
      "INSERT INTO faltas (aluno_id, aula_id, data_falta, quantidade) VALUES (?, ?, CURRENT_DATE, 1)",
      [alunoId, aulaIdFinal]
    );
    faltasRegistradas++;
  }

  console.log(`✅ Total faltas registradas: ${faltasRegistradas} de ${nomes.length} alunos`);
  return { totalAlunosNoArquivo: nomes.length, faltasRegistradas };
}

// === FUNÇÃO NOVA ===
export async function listarFaltasDaAulaService(aulaId) {
  console.log("📌 listando faltas para aulaId =", aulaId);
  const [rows] = await pool.query(
    "SELECT aluno_id, quantidade FROM faltas WHERE aula_id = ?",
    [aulaId]
  );
  console.log("📌 resultado da query:", rows);
  return rows;
}


export async function registrarFaltaManual(alunoId, aulaId = null, quantidade = 1) {
  await pool.query(
    "INSERT INTO faltas (aluno_id, aula_id, data_falta, quantidade) VALUES (?, ?, CURRENT_DATE, ?)",
    [alunoId, aulaId, quantidade]
  );

  console.log(`✅ Falta manual registrada: aluno ${alunoId}, aula ${aulaId || "nenhuma"}, quantidade ${quantidade}`);
  return { sucesso: true };
}
