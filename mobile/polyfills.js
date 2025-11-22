import { findNodeHandle } from 'react-native';

// Adicionar polyfills necessários para o React Native
if (typeof global.process === 'undefined') {
  global.process = require('process');
}

// Adicionar polyfill para fetch
if (typeof global.fetch === 'undefined') {
  global.fetch = require('node-fetch');
}