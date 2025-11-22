'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { getCurrentUser, logout } from '@/lib/auth';
import { ref, onValue, off } from 'firebase/database';
import { database } from '@/lib/firebase';
import { Leaf, Thermometer, Droplets, Users, Power, PowerOff, LogOut } from 'lucide-react';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [currentSensor, setCurrentSensor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'error'>('connecting');
  const router = useRouter();

  useEffect(() => {
    // Verificar usuário imediatamente
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.push('/login');
      return;
    }
    
    setUser(currentUser);
    
    // Timeout para evitar carregamento infinito
    const timeout = setTimeout(() => {
      setLoading(false);
      setConnectionStatus('error');
      setError('Tempo esgotado ao carregar dados do Firebase');
    }, 15000); // 15 segundos

    // Conectar ao Firebase Realtime Database
    const connectToFirebase = () => {
      try {
        console.log('Conectando ao Firebase para usuário:', currentUser.uid);
        
        // Referência aos dados do usuário no Firebase
        const userSensorRef = ref(database, `users/${currentUser.uid}/sensores`);
        
        const handleValue = (snapshot: any) => {
          console.log('Dados recebidos do Firebase:', snapshot.val());
          
          if (snapshot.exists()) {
            const data = snapshot.val();
            console.log('Dados do sensor:', data);
            
            // Se não tiver dados de temperatura/umidade, usar valores padrão
            const sensorData = {
              temperatura: data.temperatura || 0,
              umidade: data.umidade || 0,
              lastUpdate: data.lastUpdate || Date.now(),
              status: data.status || 'active',
              leituras: data.leituras || {}
            };
            
            setCurrentSensor(sensorData);
            setConnectionStatus('connected');
            clearTimeout(timeout);
          } else {
            console.log('Nenhum dado encontrado para o usuário');
            // Criar estrutura inicial se não existir
            const initialData = {
              temperatura: 0,
              umidade: 0,
              lastUpdate: Date.now(),
              status: 'active',
              leituras: {}
            };
            
            setCurrentSensor(initialData);
            setConnectionStatus('connected');
            clearTimeout(timeout);
          }
          
          setLoading(false);
        };
        
        const handleError = (error: any) => {
          console.error('Erro no Firebase:', error);
          setConnectionStatus('error');
          setError('Erro ao conectar ao Firebase: ' + error.message);
          setLoading(false);
          clearTimeout(timeout);
        };
        
        // Iniciar listener do Firebase
        const unsubscribe = onValue(userSensorRef, handleValue, handleError);
        
        console.log('Listener do Firebase iniciado');
        
        return () => {
          console.log('Limpar listener do Firebase');
          if (unsubscribe) unsubscribe();
          clearTimeout(timeout);
        };
        
      } catch (err) {
        console.error('Erro ao configurar Firebase:', err);
        setConnectionStatus('error');
        setError('Erro ao configurar conexão com Firebase');
        setLoading(false);
        clearTimeout(timeout);
      }
    };

    const cleanup = connectToFirebase();
    
    return cleanup;
  }, [router]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (err) {
      setError('Erro ao fazer logout');
    }
  };

  // Determinar status dos LEDs baseado nas condições
  const getLedStatus = () => {
    if (!currentSensor) return { verde: false, vermelho: false, status: 'Aguardando dados' };
    
    const temp = currentSensor.temperatura;
    const humidity = currentSensor.umidade;
    
    // Condições padrão: temperatura entre 20-30°C e umidade entre 40-70%
    const tempOk = temp >= 20 && temp <= 30;
    const humidityOk = humidity >= 40 && humidity <= 70;
    
    if (tempOk && humidityOk) {
      return { verde: true, vermelho: false, status: 'Condições Ideais' };
    } else {
      return { verde: false, vermelho: true, status: 'Alerta - Fora das Condições' };
    }
  };

  const ledStatus = getLedStatus();

  if (loading) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-green-800 text-lg">Conectando ao Firebase...</p>
          <p className="text-green-600 text-sm mt-2">Buscando dados dos sensores</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-2 rounded-full">
                <Leaf className="h-6 w-6 text-green-600" />
              </div>
              <h1 className="text-xl font-bold text-green-800">EcoBox</h1>
              {connectionStatus === 'connected' && (
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 hidden sm:block">{user?.email}</span>
              <div className="flex items-center space-x-2">
                <Link href="/dashboard/about">
                  <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
                    <Users className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Sobre Nós</span>
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-700"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Sair</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {connectionStatus === 'error' && (
          <Alert className="mb-6 border-yellow-200 bg-yellow-50">
            <AlertDescription className="text-yellow-800">
              Erro na conexão com Firebase. Verifique suas credenciais.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Temperatura */}
          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-orange-800">
                <Thermometer className="h-5 w-5 mr-2" />
                Temperatura
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">
                {currentSensor?.temperatura !== undefined ? `${currentSensor.temperatura.toFixed(1)}°C` : '--°C'}
              </div>
              <p className="text-sm text-orange-600 mt-2">
                Ideal: 20-30°C
              </p>
            </CardContent>
          </Card>

          {/* Umidade */}
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-blue-800">
                <Droplets className="h-5 w-5 mr-2" />
                Umidade
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                {currentSensor?.umidade !== undefined ? `${currentSensor.umidade.toFixed(1)}%` : '--%'}
              </div>
              <p className="text-sm text-blue-600 mt-2">
                Ideal: 40-70%
              </p>
            </CardContent>
          </Card>

          {/* LED Verde */}
          <Card className={`${ledStatus.verde ? 'bg-gradient-to-br from-green-50 to-green-100 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <Power className={`h-5 w-5 mr-2 ${ledStatus.verde ? 'text-green-600' : 'text-gray-400'}`} />
                LED Verde
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold ${ledStatus.verde ? 'text-green-600' : 'text-gray-400'}`}>
                {ledStatus.verde ? 'LIGADO' : 'DESLIGADO'}
              </div>
              <p className={`text-sm mt-2 ${ledStatus.verde ? 'text-green-600' : 'text-gray-400'}`}>
                {ledStatus.verde ? 'Condições OK' : 'Fora de faixa'}
              </p>
            </CardContent>
          </Card>

          {/* LED Vermelho */}
          <Card className={`${ledStatus.vermelho ? 'bg-gradient-to-br from-red-50 to-red-100 border-red-200' : 'bg-gray-50 border-gray-200'}`}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <PowerOff className={`h-5 w-5 mr-2 ${ledStatus.vermelho ? 'text-red-600' : 'text-gray-400'}`} />
                LED Vermelho
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold ${ledStatus.vermelho ? 'text-red-600' : 'text-gray-400'}`}>
                {ledStatus.vermelho ? 'LIGADO' : 'DESLIGADO'}
              </div>
              <p className={`text-sm mt-2 ${ledStatus.vermelho ? 'text-red-600' : 'text-gray-400'}`}>
                {ledStatus.vermelho ? 'Alerta!' : 'Normal'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Status do Sistema */}
        <Card>
          <CardHeader>
            <CardTitle>Status do Sistema</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className={`text-lg font-semibold ${ledStatus.verde ? 'text-green-600' : ledStatus.vermelho ? 'text-red-600' : 'text-gray-600'}`}>
                  Status: {ledStatus.status}
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-600">
                  Última Atualização: {currentSensor?.lastUpdate ? 
                    new Date(currentSensor.lastUpdate).toLocaleTimeString('pt-BR') : 
                    'N/A'
                  }
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-600">
                  Conexão: {connectionStatus === 'connected' ? 'Ativa' : connectionStatus === 'connecting' ? 'Conectando...' : 'Erro'}
                </div>
              </div>
            </div>
            
          
          </CardContent>
        </Card>
      </main>
    </div>
  );
}