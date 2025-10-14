import { Image } from "expo-image";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

const teamMembers = [
  {
    name: "Juan Pérez",
    role: "Mecánico Principal",
    image: require("../../assets/images/juan.jpg"),
    description: "Especialista en reparación de motores y sistemas eléctricos.",
  },
  {
    name: "María Gómez",
    role: "Gerente de Servicio",
    image: require("../../assets/images/maria.jpg"),
    description: "Encargada de la atención al cliente y gestión de servicios.",
  },
  {
    name: "Carlos Ramírez",
    role: "Técnico en Diagnóstico",
    image: require("../../assets/images/carlos.png"),
    description: "Experto en diagnóstico computarizado de vehículos.",
  },
  {
    name: "Ana Torres",
    role: "Especialista en Neumáticos",
    image: require("../../assets/images/ana.jpg"),
    description: "Responsable del mantenimiento y cambio de llantas.",
  },
];

export default function OurTeam() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Nuestro Equipo</Text>
        {teamMembers.map((member, idx) => (
          <View key={idx} style={styles.card}>
            <Image source={member.image} style={styles.image} />
            <Text style={styles.name}>{member.name}</Text>
            <Text style={styles.role}>{member.role}</Text>
            <Text style={styles.description}>{member.description}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#2c3e50",
  },
  card: {
    width: "90%",
    backgroundColor: "#f4f4f4",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    alignItems: "center",
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
    backgroundColor: "#ddd",
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
    color: "#34495e",
  },
  role: {
    fontSize: 16,
    color: "#7f8c8d",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#636e72",
    textAlign: "center",
  },
});
