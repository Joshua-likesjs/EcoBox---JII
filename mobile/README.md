# Incubadora VPJS - Mobile

Projeto mobile desenvolvido com Expo/React Native para controle da incubadora de ovos VPJS.

## 🚀 Como Executar

### Pré-requisitos
- Node.js instalado
- Expo CLI: `npm install -g @expo/cli`
- Expo Go no seu dispositivo móvel

### Instalação
```bash
cd mobile
npm install
```

### Executar com Tunnel
```bash
# Para iniciar com tunnel (acesso externo)
npm start

# Para Android específico
npm run android

# Para iOS específico  
npm run ios

# Para versão web
npm run web
```

## 📱 Funcionalidades

### 🔐 Autenticação
- Login e cadastro de usuários
- Integração com Firebase Authentication
- Sincronização de dados em tempo real

### 📊 Dashboard
- Cards em tempo real dos sensores
- Controle rápido dos atuadores
- Menu de navegação intuitivo

### 🌡️ Sensores
- Monitoramento de temperatura
- Controle de umidade
- Sensor de luminosidade
- Detecção de presença

### ⚙️ Atuadores
- Controle do aquecedor
- Controle do umidificador
- Feedback visual em tempo real

### 👥 Sobre Nós
- Informações da equipe VPJS
- Detalhes das tecnologias utilizadas
- Contato e redes sociais

## 🔗 Integração com Web

O app mobile compartilha:
- **Mesmo banco de dados** Firebase
- **Mesmas credenciais** de acesso
- **Sincronização em tempo real** entre plataformas
- **API endpoints** compartilhados

## 🌐 Tunnel Configuration

O projeto está configurado para usar **tunnel** por padrão, permitindo:
- Acesso externo via internet
- Teste em dispositivos reais
- Compartilhamento da URL com outros desenvolvedores
- Integração com hardware remoto

## 📂 Estrutura do Projeto

```
mobile/
├── app/                    # Telas do aplicativo
│   ├── _layout.tsx        # Layout principal
│   ├── index.tsx          # Tela inicial (redirecionamento)
│   ├── login.tsx          # Login/Cadastro
│   ├── dashboard.tsx      # Dashboard principal
│   ├── sensores.tsx       # Monitoramento de sensores
│   ├── atuadores.tsx      # Controle de atuadores
│   └── sobre-nos.tsx      # Sobre a equipe
├── contexts/              # Contextos React
│   └── AuthContextVPJS.tsx
├── lib/                   # Utilitários
│   └── firebaseMobile.ts  # Configuração Firebase
├── assets/                # Recursos estáticos
└── package.json           # Dependências
```

## 🔧 Tecnologias

- **Expo SDK 51** - Plataforma de desenvolvimento
- **React Native** - Framework mobile
- **TypeScript** - Tipagem segura
- **Expo Router** - Navegação
- **Firebase** - Autenticação e banco de dados
- **Lucide React Native** - Ícones

## 📱 Dispositivos Compatíveis

- **Android** 7.0+ (API level 24+)
- **iOS** 12.0+
- **Web** (via Expo web)

## 🔒 Segurança

- Autenticação via Firebase
- Tokens de sessão seguros
- Validação de dados
- Conexões HTTPS

## 🚀 Deploy

O app pode ser distribuído através de:
- **Expo Application Services (EAS)**
- **Google Play Store**
- **Apple App Store**
- **QR Code direto do Expo**

## 📞 Suporte

Para dúvidas ou suporte:
- Email: contato@incubadora-vpjs.com
- GitHub: github.com/vpjs-incubadora
- Documentação completa no projeto web

---

**Equipe VPJS** - Tecnologia para avicultura 🥚📱