module.exports = {
  publicPath: '/', // Define o caminho base para o projeto
  outputDir: 'dist', // Diretório de saída para builds
  assetsDir: 'assets', // Diretório para ativos estáticos
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Proxy para o backend
        changeOrigin: true,
        pathRewrite: { '^/api': '' }, // Remove o prefixo "/api" ao fazer a requisição
      },
    },
    historyApiFallback: true, // Redireciona para index.html em rotas desconhecidas
    port: 8080, // Porta para o servidor de desenvolvimento
    open: true, // Abre o navegador automaticamente ao iniciar o servidor
  },
  lintOnSave: false, // Desativa linting em tempo de execução
  productionSourceMap: false, // Remove mapas de origem em produção
  configureWebpack: {
    devtool: process.env.NODE_ENV === 'development' ? 'eval-source-map' : false, // Melhora a depuração em dev
  },
};
