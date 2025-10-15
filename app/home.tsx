import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function home() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Full Autos SAS</Text>

      <Image
        source={require("../assets/images/car.png")}
        style={styles.carImage}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push({ pathname: "/Servicios" } as any)}
      >
        <Text style={styles.buttonText}>Servicios</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push({ pathname: "/ourTeam" } as any)}
      >
        <Text style={styles.buttonText}>Técnicos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push({ pathname: "/trabajos" } as any)}
      >
        <Text style={styles.buttonText}>Trabajos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push({ pathname: "/contacto" } as any)}
      >
        <Text style={styles.buttonText}>Contacto</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push({ pathname: "/encuentranos" } as any)}
      >
        <Text style={styles.buttonText}>Encuéntranos</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0000A0",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 20,
  },
  carImage: {
    width: 120,
    height: 80,
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginVertical: 8,
    width: 180,
    alignItems: "center",
  },
  buttonText: {
    color: "#0000A0",
    fontWeight: "bold",
  },
});
