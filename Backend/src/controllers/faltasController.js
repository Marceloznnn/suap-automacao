import { registrarFaltasArquivo, registrarFaltaManual } from "../services/faltasService.js";

// Upload de arquivo (integração N8N)
export async function processarFaltasArquivo(req, res) {
  try {
    const { aula_id } = req.body;

    if (!req.file) {
      return res.status(400).json({ erro: "Nenhum arquivo enviado" });
    }

    if (!aula_id || aula_id === "null") {
      return res.status(400).json({ erro: "Aula não definida. Crie ou selecione uma aula antes do upload." });
    }

    const aulaId = Number(aula_id);
    const resultado = await registrarFaltasArquivo(req.file.path, aulaId);

    res.json({ sucesso: true, ...resultado });
  } catch (error) {
    console.error("❌ Erro no controlador:", error);
    res.status(500).json({ erro: "Erro ao processar arquivo" });
  }
}

// Adição manual de falta
export async function adicionarFaltaManual(req, res) {
  try {
    const { aluno_id, aula_id, quantidade } = req.body;
    if (!aluno_id) {
      return res.status(400).json({ erro: "Aluno obrigatório" });
    }

    const aulaId = aula_id && aula_id !== "null" ? Number(aula_id) : null;
    const qtd = quantidade ? Number(quantidade) : 1;

    const resultado = await registrarFaltaManual(aluno_id, aulaId, qtd);
    res.json({ message: "Falta registrada com sucesso", resultado });
  } catch (error) {
    console.error("❌ Erro ao adicionar falta manual:", error);
    res.status(500).json({ erro: "Erro ao adicionar falta manual" });
  }
}
