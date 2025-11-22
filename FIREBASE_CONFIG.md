# 🔥 Configuração Firebase - EcoBox JII

## ✅ **Firebase já está configurado no código!**

Usei suas credenciais exatas:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyA8sm6ZnLvHF3oHjUvWA5bCcLWJBtHZULA",
  authDomain: "ecobox-jii.firebaseapp.com",
  databaseURL: "https://ecobox-jii-default-rtdb.firebaseio.com",
  projectId: "ecobox-jii",
  storageBucket: "ecobox-jii.firebasestorage.app",
  messagingSenderId: "141770386004",
  appId: "1:141770386004:web:f5d50ca505bb61f5df5bc1",
  measurementId: "G-H75XWY1XHZ"
};
```

## 📦 **Passo 1: Instalar Firebase**

```bash
cd /home/z/my-project
npm install firebase
```

## ⚙️ **Passo 2: Configurar Firebase Console**

### 2.1 Ativar Authentication
1. Vá para: https://console.firebase.google.com/project/ecobox-jii/authentication
2. Clique em "Começar"
3. Selecione "Email/Senha"
4. Ative "Email/Senha"
5. Adicione seu domínio (localhost:3000) para teste

### 2.2 Configurar Realtime Database
1. Vá para: https://console.firebase.google.com/project/ecobox-jii/database
2. Crie um Realtime Database
3. Inicie no modo de teste
4. **IMPORTANTE:** Configure as regras de segurança:

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

## 🚀 **Passo 3: Testar o Sistema**

### 3.1 Instalar dependências
```bash
npm install firebase
```

### 3.2 Iniciar o servidor
```bash
npm run dev
```

### 3.3 Testar funcionalidades
1. **Cadastro:** Crie uma conta → verifique no Firebase Console
2. **Login:** Entre com a conta criada
3. **Dashboard:** Verifique se conecta ao Firebase
4. **Dados:** Os dados serão salvos em tempo real

## 📊 **Estrutura de Dados no Firebase**

Após o cadastro, a estrutura será:
```
ecobox-jii-default-rtdb.firebaseio.com/
└── users/
    └── {userId}/
        ├── email: "usuario@exemplo.com"
        ├── createdAt: "2024-01-01T00:00:00.000Z"
        └── sensores/
            ├── temperatura: 0
            ├── umidade: 0
            ├── lastUpdate: null
            ├── status: "active"
            └── leituras/
                └── {autoId}/
                    ├── temperature: 25.5
                    ├── humidity: 60.2
                    ├── timestamp: 1640995200000
                    └── userId: "userId"
```

## 🔧 **Para Hardware (Arduino/ESP)**

Use o código em `/home/z/my-project/arduino/ecoBox_jii.ino` com as mesmas credenciais.

## ⚠️ **Importante**

1. **Regras de segurança:** Configure as regras no Firebase Console
2. **Domínios autorizados:** Adicione localhost para desenvolvimento
3. **Dependências:** Instale `firebase` via npm
4. **Teste:** Crie uma conta e verifique no Console Firebase

## 🎯 **Resumo**

✅ Firebase configurado com suas credenciais  
✅ Código pronto para usar Firebase real  
✅ Estrutura de dados automática no cadastro  
✅ Atualizações em tempo real  
✅ Segurança por usuário  

**Só precisa instalar o Firebase e configurar as regras no Console!** 🔥