import { Image } from "expo-image";
import React from "react";
import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

const EMAIL = "serviteca@";

const handleEmail = async (cargo: string) => {
  const subject = `hoja de vida - cargo ${cargo}`;

  const url = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}`;

  const can = await Linking.canOpenURL(url);
  if (can) Linking.openURL(url);
  else Alert.alert("No se pudo abrir el cliente de correo.");
};

const teamMembers = [
  {
    name: "Técnico Mecánico Automotriz",
    image: require("../assets/images/tecnico_automotriz-min.jpg"),
    description:
      " * Diagnóstico y reparación de sistemas mecánicos (motor, frenos, suspensión, dirección, transmisión). \n * Realizar mantenimiento preventivo y correctivo. \n * Uso de herramientas manuales y equipos de diagnóstico.",
  },
  {
    name: "Auxiliar de Montallantas / Lubricador",

    image: require("../assets/images/tecnico_montallantas-min.jpg"),
    description:
      " * Cambio, balanceo y rotación de llantas. \n * Revisión y cambio de aceite, filtros y fluidos. \n * Limpieza y organización del área de trabajo.",
  },
  {
    name: "Asesor de Servicio / Atención al Cliente",
    image: require("../assets/images/callcenter-min.jpg"),
    description:
      "* Recibir vehículos y elaborar órdenes de servicio. \n * Asesorar al cliente sobre mantenimientos o reparaciones necesarias. \n * Coordinar con el taller los tiempos de entrega. \n * Manejo de software de gestión automotriz. \n * Gestionar cobros y facturación.",
  },
];

export default function TrabajaConNosotros() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Trabaja con nosotros</Text>
        <Text style={styles.subtitle}>
          {" "}
          Conviérte en parte de nuestros excelentes técnicos{" "}
        </Text>
        <Text style={styles.subtitle}>Vacantes disponibles:</Text>

        {teamMembers.map((member, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.card}
            onPress={() => {
              handleEmail(member.name);
            }}
            activeOpacity={0.7}
          >
            <Image source={member.image} style={styles.image} />
            <Text style={styles.name}>{member.name}</Text>
            <Text style={styles.role}> Funciones: </Text>

            <Text style={styles.description}>{member.description}</Text>
          </TouchableOpacity>
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
  subtitle: {
    fontSize: 18,
    marginBottom: 12,
    color: "#34495e",
    fontWeight: "bold",
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
