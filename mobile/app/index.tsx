import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';

// 1. Importar o contexto correto do EcoBox
import { useAuth } from '../contexts/AuthContextJII';

export default function IndexScreen() {
  // 2. Usar as variáveis do nosso contexto (sem o sufixo VPJS)
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Só age quando o estado de carregamento inicial terminar
    if (!loading) {
      if (user) {
        console.log("Usuário logado:", user.email);
        // Se tem usuário, manda pro Dashboard
        router.replace('/dashboard');
      } else {
        console.log("Usuário não logado → indo pro login");
        // Se não tem usuário, manda pro Login
        router.replace('/login');
      }
    }
  }, [loading, user, router]); // Adicionei o router ao array de dependências

  // 3. Enquanto carrega, mostra a tela de loading com a cor do EcoBox
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#10b981" />
        <Text style={styles.text}>Carregando...</Text>
      </View>
    );
  }

  // Se não estiver mais carregando, o useEffect já fez o redirecionamento.
  // Retornar null é o correto aqui.
  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#f0fdf4', // Adicionando um fundo verde claro para consistência
  },
  text: { 
    marginTop: 10,
    color: '#065f46' // Cor do texto para combinar com o tema
  }
});