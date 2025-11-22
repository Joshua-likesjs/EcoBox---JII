import { auth } from '@/lib/firebase';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { database } from '@/lib/firebase';

export const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const register = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Criar estrutura do usuário no Realtime Database
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
    
    console.log('Usuário criado:', user.email, 'ID:', user.uid);
    
    return { success: true, user: user };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const getCurrentUser = () => {
  return auth.currentUser;
};