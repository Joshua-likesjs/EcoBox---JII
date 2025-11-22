import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function About() {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>

      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.title}>Sobre Nós</Text>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>Voltar</Text>
        </TouchableOpacity>
      </View>

      {/* Caixa principal */}
      <View style={styles.box}>
        <Text style={styles.boxTitle}>EcoBox – JII</Text>

        <Text style={styles.boxText}>
          Um projeto de estufa inteligente desenvolvido para monitorar as condições ideais de cultivo. Esta aplicação se conecta a um circuito eletrônico equipado com sensores para fornecer dados em tempo real sobre temperatura e umidade.
        </Text>

        <Text style={styles.boxText}>
          O sistema foi construído com a colaboração e especialização de cada membro da equipe, integrando hardware e software em uma solução coesa e funcional.
        </Text>
      </View>

      {/* Créditos Detalhados */}
      <View style={styles.footerBox}>
        <Text style={styles.footerTitle}>Nossa Equipe e Contribuições</Text>

        <Text style={styles.footerText}>
          <Text style={{ fontWeight: 'bold' }}>João</Text> - Desenvolvimento Web e Mobile
        </Text>
        <Text style={styles.footerText}>
          Responsável pela criação da aplicação web e mobile, utilizando tecnologias como React, React Native e Firebase para construir uma interface intuitiva e responsiva.
        </Text>

        <Text style={[styles.footerText, { marginTop: 12 }]}>
          <Text style={{ fontWeight: 'bold' }}>Ismael</Text> - Hardware e Integração
        </Text>
        <Text style={styles.footerText}>
          Ficou encarregado da montagem do circuito eletrônico, que inclui uma ESP32, um sensor DHT de temperatura e umidade, e LEDs de sinalização (verde e vermelho). Também foi responsável pela programação do microcontrolador e pela sua integração com o Firebase.
        </Text>

        <Text style={[styles.footerText, { marginTop: 12 }]}>
          <Text style={{ fontWeight: 'bold' }}>Isaque</Text> - Design e Estilo (CSS)
        </Text>
        <Text style={styles.footerText}>
          Responsável por toda a parte visual do aplicativo, definindo cores, fontes, layouts e animações para garantir uma experiência de usuário agradável e profissional.
        </Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0fdf4",
    paddingHorizontal: 20,
    paddingTop: 40,
  },

  /* Header */
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#14532d",
  },
  backButton: {
    fontSize: 18,
    color: "#15803d",
  },

  /* Caixa principal */
  box: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
    elevation: 3,
    marginBottom: 30,
  },
  boxTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#166534",
    marginBottom: 10,
  },
  boxText: {
    fontSize: 17,
    color: "#374151",
    marginTop: 10,
    lineHeight: 24,
  },

  /* Créditos */
  footerBox: {
    backgroundColor: "#dcfce7",
    padding: 20,
    borderRadius: 20,
    marginBottom: 60,
  },
  footerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#166534",
    marginBottom: 10,
  },
  footerText: {
    fontSize: 17,
    color: "#14532d",
    marginTop: 4,
  },
});