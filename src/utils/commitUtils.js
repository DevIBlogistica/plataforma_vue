// src/utils/commitUtils.js
export const summarizeCommits = (commits) => {
    return commits.map(commit => {
      const { sha, commit: { message, author: { name, date } }, html_url } = commit;
      return {
        sha,
        message,
        author: name,
        date: new Date(date).toLocaleDateString(),
        url: html_url,
        summary: generateSummary(message),
      };
    });
  };
  
  const generateSummary = (message) => {
    // Implementar lógica para gerar um resumo da mensagem do commit
    return message.split('\n')[0]; // Exemplo simples: primeira linha da mensagem
  };