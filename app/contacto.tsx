import { useRouter } from "expo-router";
import React from "react";
import {
  Alert,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const PHONE = "3215"; // <-- reemplaza si es necesario
const EMAIL = "serviteca@"; // <-- pon el correo real (ej: "serviteca@empresa.com")

export default function Contacto() {
  const router = useRouter(); // 👈 inicializa el router

  const handleCall = async () => {
    const url = `tel:${PHONE}`;
    const can = await Linking.canOpenURL(url);
    if (can) Linking.openURL(url);
    else Alert.alert("No se pudo iniciar una llamada en este dispositivo.");
  };

  const handleEmail = async () => {
    const url = `mailto:${EMAIL}`;
    const can = await Linking.canOpenURL(url);
    if (can) Linking.openURL(url);
    else Alert.alert("No se pudo abrir el cliente de correo.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contacto</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Llámanos</Text>
        <Text style={styles.value}>{PHONE}</Text>
        <TouchableOpacity style={styles.button} onPress={handleCall}>
          <Text style={styles.buttonText}>Llamar ahora</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Escríbenos</Text>
        <Text style={styles.value}>{EMAIL}</Text>
        <TouchableOpacity style={styles.button} onPress={handleEmail}>
          <Text style={styles.buttonText}>Enviar correo</Text>
        </TouchableOpacity>
      </View>

      {/* 🔙 Botón para volver al menú principal */}
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <TouchableOpacity
          onPress={() => router.push("/")}
          style={styles.botonVolver}
        >
          <Text style={styles.textoVolver}>Volver al menú principal</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0000A0",
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 26,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  label: { fontSize: 16, fontWeight: "600", color: "#111" },
  value: {
    fontSize: 18,
    marginTop: 8,
    marginBottom: 12,
    color: "#0000A0",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#0000A0",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  botonVolver: {
    backgroundColor: "#1a1a9e",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 10,
  },
  textoVolver: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
