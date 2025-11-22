import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../contexts/AuthContextJII'; 
import { Sprout, Thermometer, Droplets } from 'lucide-react-native';

export default function LoginScreen() {
  const [isCadastroJII, setIsCadastroJII] = useState(false);
  const [nomeJII, setNomeJII] = useState('');
  const [emailJII, setEmailJII] = useState('');
  const [passwordJII, setPasswordJII] = useState('');
  const [confirmPasswordJII, setConfirmPasswordJII] = useState('');
  const [loadingJII, setLoadingJII] = useState(false);
  const [errorJII, setErrorJII] = useState('');
  const [successJII, setSuccessJII] = useState('');
  
  const { user, login, register } = useAuth();
  const routerJII = useRouter();

  useEffect(() => {
    if (user) {
      routerJII.replace('/dashboard');
    }
  }, [user, routerJII]);

  const handleLoginJII = async () => {
    if (!emailJII || !passwordJII) {
      setErrorJII('Preencha todos os campos');
      return;
    }

    setLoadingJII(true);
    setErrorJII('');
    try {
      await login(emailJII, passwordJII);
    } catch (error: any) {
      setErrorJII('Erro ao fazer login. Verifique suas credenciais.');
    } finally {
      setLoadingJII(false);
    }
  };

  const handleCadastroJII = async () => {
    if (!nomeJII || !emailJII || !passwordJII || !confirmPasswordJII) {
      setErrorJII('Preencha todos os campos');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailJII)) {
      setErrorJII('Por favor, insira um endereço de e-mail válido.');
      return;
    }

    if (passwordJII !== confirmPasswordJII) {
      setErrorJII('As senhas não coincidem');
      return;
    }

    if (passwordJII.length < 6) {
      setErrorJII('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    setLoadingJII(true);
    setErrorJII('');
    setSuccessJII('');

    try {
      await register(nomeJII, emailJII, passwordJII);
      setSuccessJII('Cadastro realizado com sucesso! Redirecionando...');
      setTimeout(() => {
        routerJII.replace('/dashboard');
      }, 2000);
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        setErrorJII('Este email já está em uso. Tente fazer login.');
      } else if (error.code === 'auth/weak-password') {
        setErrorJII('A senha é muito fraca. Use pelo menos 6 caracteres.');
      } else {
        setErrorJII('Erro ao criar conta. Tente novamente.');
      }
    } finally {
      setLoadingJII(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.containerJII}>
        <View style={styles.headerJII}>
          <View style={styles.iconContainerJII}>
            <Sprout size={64} color="#10b981" />
          </View>
          <Text style={styles.titleJII}>JII ECOBOX</Text>
          <Text style={styles.subtitleJII}>
            Estufa Inteligente
          </Text>
        </View>

        <View style={styles.formContainerJII}>
          <Text style={styles.formTitleJII}>
            {isCadastroJII ? 'Criar Conta' : 'Acesso ao Sistema'}
          </Text>

          {isCadastroJII && (
            <View style={styles.inputContainerJII}>
              <Text style={styles.labelJII}>Nome Completo</Text>
              <TextInput
                style={styles.inputJII}
                value={nomeJII}
                onChangeText={setNomeJII}
                placeholder="Seu nome"
                autoCapitalize="words"
                editable={!loadingJII}
              />
            </View>
          )}

          <View style={styles.inputContainerJII}>
            <Text style={styles.labelJII}>Email</Text>
            <TextInput
              style={styles.inputJII}
              value={emailJII}
              onChangeText={setEmailJII}
              placeholder="seu@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!loadingJII}
            />
          </View>

          <View style={styles.inputContainerJII}>
            <Text style={styles.labelJII}>Senha</Text>
            <TextInput
              style={styles.inputJII}
              value={passwordJII}
              onChangeText={setPasswordJII}
              placeholder={isCadastroJII ? "Mínimo 6 caracteres" : "••••••••"}
              secureTextEntry
              editable={!loadingJII}
            />
          </View>

          {isCadastroJII && (
            <View style={styles.inputContainerJII}>
              <Text style={styles.labelJII}>Confirmar Senha</Text>
              <TextInput
                style={styles.inputJII}
                value={confirmPasswordJII}
                onChangeText={setConfirmPasswordJII}
                placeholder="Confirme sua senha"
                secureTextEntry
                editable={!loadingJII}
              />
            </View>
          )}

          {errorJII ? <Text style={styles.errorTextJII}>{errorJII}</Text> : null}
          {successJII ? <Text style={styles.successTextJII}>{successJII}</Text> : null}

          <TouchableOpacity
            style={[styles.buttonJII, loadingJII && styles.buttonDisabledJII]}
            onPress={isCadastroJII ? handleCadastroJII : handleLoginJII}
            disabled={loadingJII}
          >
            {loadingJII ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonTextJII}>
                {isCadastroJII ? 'Cadastrar' : 'Entrar'}
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.switchButtonJII}
            onPress={() => setIsCadastroJII(!isCadastroJII)}
            disabled={loadingJII}
          >
            <Text style={styles.switchButtonTextJII}>
              {isCadastroJII 
                ? 'Já tem uma conta? Faça login' 
                : 'Não tem uma conta? Cadastre-se'
              }
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.featuresJII}>
          <Text style={styles.featuresTitleJII}>Recursos do Sistema:</Text>
          <View style={styles.featureItemJII}>
            <Thermometer size={16} color="#ef4444" />
            <Text style={styles.featureTextJII}>Monitoramento de temperatura em tempo real</Text>
          </View>
          <View style={styles.featureItemJII}>
            <Droplets size={16} color="#3b82f6" />
            <Text style={styles.featureTextJII}>Controle de umidade automático</Text>
          </View>
          <View style={styles.featureItemJII}>
            <Sprout size={16} color="#10b981" />
            <Text style={styles.featureTextJII}>Controle remoto de aquecedor e umidificador</Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  containerJII: { flex: 1, backgroundColor: '#f0fdf4' },
  headerJII: { alignItems: 'center', paddingTop: 60, paddingBottom: 40, paddingHorizontal: 20 },
  iconContainerJII: { position: 'relative', marginBottom: 20 },
  sensorIconsJII: { position: 'absolute', top: -8, right: -8, flexDirection: 'row', gap: 2 },
  titleJII: { fontSize: 28, fontWeight: 'bold', color: '#064e3b', marginBottom: 8 },
  subtitleJII: { fontSize: 16, color: '#047857', textAlign: 'center', paddingHorizontal: 40 },
  formContainerJII: { backgroundColor: '#ffffff', marginHorizontal: 20, padding: 24, borderRadius: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 4 },
  formTitleJII: { fontSize: 20, fontWeight: 'bold', color: '#064e3b', marginBottom: 20, textAlign: 'center' },
  inputContainerJII: { marginBottom: 16 },
  labelJII: { fontSize: 14, fontWeight: '600', color: '#065f46', marginBottom: 6 },
  inputJII: { borderWidth: 1, borderColor: '#a7f3d0', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 12, fontSize: 16, backgroundColor: '#f0fdf4' },
  buttonJII: { backgroundColor: '#10b981', paddingVertical: 14, borderRadius: 8, alignItems: 'center', marginTop: 8 },
  buttonDisabledJII: { backgroundColor: '#a7f3d0' },
  buttonTextJII: { color: '#ffffff', fontSize: 16, fontWeight: '600' },
  switchButtonJII: { marginTop: 16, alignItems: 'center' },
  switchButtonTextJII: { color: '#10b981', fontSize: 14, fontWeight: '500' },
  featuresJII: { margin: 20, padding: 20, backgroundColor: '#ffffff', borderRadius: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 4 },
  featuresTitleJII: { fontSize: 16, fontWeight: '600', color: '#064e3b', marginBottom: 12 },
  featureItemJII: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  featureTextJII: { fontSize: 14, color: '#6b7280', flex: 1 },
  errorTextJII: { color: '#dc2626', marginBottom: 12, textAlign: 'center', fontSize: 14 },
  successTextJII: { color: '#16a34a', marginBottom: 12, textAlign: 'center', fontSize: 14 },
});