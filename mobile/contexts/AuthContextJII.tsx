import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  User 
} from 'firebase/auth';
import { ref, set } from 'firebase/database';

// Importa o auth e o database do nosso arquivo central
import { auth, database } from '../lib/firebaseMobile';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, senha: string) => Promise<void>;
  register: (nome: string, email: string, senha: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, senha: string) => {
    await signInWithEmailAndPassword(auth, email, senha);
  };

  const register = async (nome: string, email: string, senha: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;
      
      await updateProfile(user, { displayName: nome });

      // --- CORREÇÃO AQUI ---
      // Salva os dados na estrutura correta que o dashboard espera
      await set(ref(database, `users/${user.uid}`), {
        email: email,
        dataCriacao: new Date().toISOString(),
      });

      // Cria o nó 'sensores' com os valores iniciais para o dashboard
      await set(ref(database, `users/${user.uid}/sensores`), {
        temperatura: 0,
        umidade: 0,
        lastUpdate: Date.now(),
        status: "active",
      });


    } catch (error) {
      console.error("Erro no cadastro:", error);
      throw error; 
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading,
      login, 
      register, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}