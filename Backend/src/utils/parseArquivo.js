export function parseArquivo(conteudo) {
  return conteudo
    .split(/\r?\n/)
    .map(linha => linha.trim())
    .filter(linha => linha.length > 0);
}
