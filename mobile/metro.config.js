const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Adicionar suporte para arquivos .ts e .tsx
config.resolver.assetExts.push(
  // Adiciona suporte para fontes
  '.ttf',
  '.otf',
  '.woff',
  '.woff2'
);

module.exports = config;