import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ref, onValue } from "firebase/database";
import { database } from "../lib/firebaseMobile";
import { useAuth } from "../contexts/AuthContextJII";
import { router } from "expo-router";

export default function Dashboard() {
  const { user, logout } = useAuth();

  const [sensor, setSensor] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const sensorRef = ref(database, `users/${user.uid}/sensores`);

    const unsub = onValue(sensorRef, (snap) => {
      if (snap.exists()) {
        setSensor(snap.val());
      } else {
        setSensor({
          temperatura: 0,
          umidade: 0,
          lastUpdate: Date.now(),
          status: "active",
        });
      }
      setLoading(false);
    });

    return () => unsub();
  }, [user]);

  const getLed = () => {
    if (!sensor) return { verde: false, vermelho: false, status: "Aguardando…" };

    const t = sensor.temperatura;
    const h = sensor.umidade;

    const tempOk = t >= 20 && t <= 30;
    const humOk = h >= 40 && h <= 70;

    if (tempOk && humOk)
      return { verde: true, vermelho: false, status: "Condições Ideais" };

    return { verde: false, vermelho: true, status: "Fora das Condições" };
  };

  const led = getLed();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#10b981" />
        <Text style={styles.loadingText}>Conectando ao Firebase…</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>JII ECOBOX</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={() => router.push("/About")} activeOpacity={0.6}>
            <Text style={styles.headerActionText}>Sobre Nós</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={async () => { await logout(); router.replace("/login"); }} activeOpacity={0.6}>
            <Text style={styles.headerActionText}>Sair</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Cards Principais */}
      <View style={styles.mainCardsContainer}>
        {/* Card de Temperatura */}
        <View style={[styles.card, styles.cardTemp]}>
          <Text style={styles.cardLabel}>Temperatura</Text>
          <Text style={styles.cardValueTemp}>{sensor.temperatura.toFixed(1)}°C</Text>
          <Text style={styles.cardInfo}>Ideal: 20–30°C</Text>
        </View>

        {/* Card de Umidade */}
        <View style={[styles.card, styles.cardHum]}>
          <Text style={styles.cardLabel}>Umidade</Text>
          <Text style={styles.cardValueHum}>{sensor.umidade.toFixed(1)}%</Text>
          <Text style={styles.cardInfo}>Ideal: 40–70%</Text>
        </View>
      </View>

      {/* Cards de LED */}
      <View style={styles.ledContainer}>
        {/* LED Verde */}
        <View style={[styles.card, styles.ledCard, { backgroundColor: led.verde ? '#f0fdf4' : '#ffffff' }]}>
          <Text style={styles.cardLabel}>LED Verde</Text>
          <Text style={[styles.ledState, led.verde ? styles.ledStateOnGreen : styles.ledStateOff]}>
            {led.verde ? "LIGADO" : "DESLIGADO"}
          </Text>
        </View>

        {/* LED Vermelho */}
        <View style={[styles.card, styles.ledCard, { backgroundColor: led.vermelho ? '#fef2f2' : '#ffffff' }]}>
          <Text style={styles.cardLabel}>LED Vermelho</Text>
          <Text style={[styles.ledState, led.vermelho ? styles.ledStateOnRed : styles.ledStateOff]}>
            {led.vermelho ? "LIGADO" : "DESLIGADO"}
          </Text>
        </View>
      </View>

      {/* Card de Status */}
      <View style={styles.statusCard}>
        <Text style={styles.statusTitle}>Status do Sistema</Text>
        <View style={styles.statusRow}>
          <Text style={styles.statusLabel}>Status:</Text>
          <Text style={styles.statusValue}>{led.status}</Text>
        </View>
        <View style={styles.statusRow}>
          <Text style={styles.statusLabel}>Última atualização:</Text>
          <Text style={styles.statusTime}>
            {new Date(sensor.lastUpdate).toLocaleTimeString("pt-BR")}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

// ====================
// ESTILOS PROFISSIONAIS (CORRIGIDO)
// ====================

// 1. Estilo base do card definido FORA do objeto para evitar o erro de tipo
const baseCardStyle = {
  backgroundColor: '#ffffff',
  borderRadius: 16,
  padding: 24,
  // Sombra padrão do login
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 4,
};

const styles = StyleSheet.create({
  // --- Layout Geral ---
  container: {
    flex: 1,
    backgroundColor: '#f0fdf4', // Mesmo fundo da tela de login
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#f0fdf4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 16,
    color: '#065f46',
    fontSize: 16,
    fontWeight: '500',
  },

  // --- Cabeçalho ---
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#064e3b', // Mesmo título do login
  },
  headerActions: {
    flexDirection: 'row',
    gap: 16,
  },
  headerActionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#10b981', // Verde primário para links
  },

  // --- Cards ---
  card: {
    ...baseCardStyle, // Agora usamos a variável externa
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#065f46', // Cor dos labels do login
    marginBottom: 8,
  },
  cardInfo: {
    fontSize: 13,
    color: '#6b7280', // Cinza para info secundária
    marginTop: 4,
  },

  // --- Cards Principais (Temp e Umidade) ---
  mainCardsContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  cardTemp: {
    borderLeftWidth: 5,
    borderLeftColor: '#ef4444', // Vermelho do ícone do login
    marginBottom: 16,
  },
  cardHum: {
    borderLeftWidth: 5,
    borderLeftColor: '#3b82f6', // Azul do ícone do login
  },
  cardValueTemp: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ef4444',
  },
  cardValueHum: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#3b82f6',
  },

  // --- Cards de LED ---
  ledContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  ledCard: {
    width: '48%',
    alignItems: 'center',
    paddingVertical: 32,
  },
  ledState: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 8,
  },
  ledStateOnGreen: {
    color: '#10b981',
    textShadowColor: '#10b981',
    textShadowRadius: 10, // Efeito de brilho
  },
  ledStateOnRed: {
    color: '#ef4444',
    textShadowColor: '#ef4444',
    textShadowRadius: 10, // Efeito de brilho
  },
  ledStateOff: {
    color: '#d1d5db', // Cinza bem claro para "desligado"
  },

  // --- Card de Status ---
  statusCard: {
    ...baseCardStyle, // Usamos a variável externa aqui também
    marginHorizontal: 20,
    marginBottom: 40,
  },
  statusTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#064e3b',
    marginBottom: 16,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  statusLabel: {
    fontSize: 16,
    color: '#4b5563',
  },
  statusValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#065f46',
  },
  statusTime: {
    fontSize: 14,
    color: '#6b7280',
  },
});