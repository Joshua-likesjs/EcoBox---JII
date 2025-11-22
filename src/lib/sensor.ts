import { database } from '@/lib/firebase';
import { get, ref, push, set, onValue, off } from 'firebase/database';

export interface SensorData {
  temperature: number;
  humidity: number;
  timestamp: number;
  userId: string;
}

export const saveSensorData = async (userId: string, temperature: number, humidity: number) => {
  try {
    // Salvar leitura individual com push() para criar ID único
    const readingsRef = ref(database, `usersJII/${userId}/sensoresJII/leituras`);
    const newReadingRef = push(readingsRef);
    
    await set(newReadingRef, {
      temperature,
      humidity,
      timestamp: Date.now(),
      userId
    });
    
    // Atualizar valores atuais do usuário
    const currentSensorRef = ref(database, `usersJII/${userId}/sensoresJII`);
    await set(currentSensorRef, {
      temperatura: temperature,
      umidade: humidity,
      lastUpdate: Date.now(),
      status: 'active'
    });
    
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const getSensorData = (userId: string, callback: (data: SensorData[]) => void) => {
  const readingsRef = ref(database, `usersJII/${userId}/sensoresJII/leituras`);
  
  const handleValue = (snapshot: any) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      const sensorData: SensorData[] = [];
      
      Object.keys(data).forEach(key => {
        sensorData.push({
          id: key,
          ...data[key]
        });
      });
      
      // Ordenar por timestamp (mais recente primeiro)
      sensorData.sort((a, b) => b.timestamp - a.timestamp);
      callback(sensorData);
    } else {
      callback([]);
    }
  };
  
  onValue(readingsRef, handleValue);
  
  // Retornar função para limpar listener
  return () => off(readingsRef, 'value', handleValue);
};

export const getCurrentSensorData = async (userId: string) => {
  try {
    const sensorRef = ref(database, `usersJII/${userId}/sensoresJII`);
    const snapshot = await get(sensorRef);
    
    if (snapshot.exists()) {
      return snapshot.val();
    }
    return null;
  } catch (error: any) {
    return null;
  }
};

export const subscribeToSensorUpdates = (userId: string, callback: (data: any) => void) => {
  const sensorRef = ref(database, `usersJII/${userId}/sensoresJII`);
  
  const handleValue = (snapshot: any) => {
    if (snapshot.exists()) {
      callback(snapshot.val());
    }
  };
  
  onValue(sensorRef, handleValue);
  
  // Retornar função para limpar listener
  return () => off(sensorRef, 'value', handleValue);
};