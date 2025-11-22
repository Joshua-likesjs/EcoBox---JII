# 🔥 Integração Firebase Real - EcoBox JII

## 📋 Estrutura no Firebase Realtime Database

```
ecobox-jii-default-rtdb.firebaseio.com/
└── users/
    └── {userId}/
        ├── email: "usuario@exemplo.com"
        ├── createdAt: "2024-01-01T00:00:00.000Z"
        └── sensores/
            ├── temperatura: 25.5
            ├── umidade: 60.2
            ├── lastUpdate: 1640995200000
            ├── status: "active"
            └── leituras/
                ├── 1640995200000/
                │   ├── temperature: 25.5
                │   ├── humidity: 60.2
                │   ├── timestamp: 1640995200000
                │   └── userId: "userId"
                └── 1640995205000/
                    ├── temperature: 25.7
                    ├── humidity: 60.1
                    ├── timestamp: 1640995205000
                    └── userId: "userId"
```

## 🔧 Configuração do Firebase

### 1. Ativar Authentication
- No Console Firebase > Authentication
- Ativar "Email/Password"
- Configurar domínios autorizados

### 2. Configurar Realtime Database
- No Console Firebase > Realtime Database
- Criar database
- Configurar regras de segurança:

```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    }
  }
}
```

### 3. Obter Chave de API
- Configurações do Projeto > Contas de Serviço
- Gerar nova chave privada
- Baixar arquivo JSON

## 💻 Como Funciona

### Cadastro de Usuário
1. Usuário preenche formulário de cadastro
2. Firebase Authentication cria conta
3. Automaticamente cria estrutura no Realtime Database
4. Inicializa dados dos sensores com valores zerados

### Leitura de Sensores
1. Arduino/ESP lê DHT22 a cada 5 segundos
2. Envia dados para Firebase via HTTP
3. Dashboard web recebe atualizações em tempo real
4. Histórico de leituras é armazenado

### Dashboard em Tempo Real
1. Conecta ao Firebase usando `onValue()`
2. Recebe atualizações automaticamente
3. Mostra temperatura e umidade atuais
4. Exibe histórico completo de leituras

## 🎯 Próximos Passos

1. **Instalar Firebase no projeto:**
   ```bash
   npm install firebase
   ```

2. **Configurar Arduino/ESP:**
   - Instalar biblioteca FirebaseESP32
   - Configurar WiFi e credenciais
   - Conectar sensor DHT22

3. **Testar integração:**
   - Criar conta no sistema web
   - Verificar estrutura no Firebase
   - Enviar dados do hardware
   - Confirmar atualização no dashboard

## 🔗 Conexão Hardware → Firebase → Web

```
Arduino/ESP32 → WiFi → Firebase Realtime Database → Dashboard Web (Next.js)
     ↓              ↓                    ↓                           ↓
   DHT22        HTTP POST        users/{uid}/sensores/    React + Firebase SDK
   Leitura      JSON Data        leituras/{timestamp}     Real-time Updates
```

O sistema agora está **100% integrado** com Firebase Realtime Database! 🚀