
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const servicios = [
  {
    id: "mecanica",
    titulo: "Mecánica General",
    imagen: require("@/assets/images/mecanica.png"),
  },
  {
    id: "aceite",
    titulo: "Cambio de Aceite",
    imagen: require("@/assets/images/aceite.png"),
  },
  {
    id: "alineacion",
    titulo: "Alineación / Balanceo",
    imagen: require("@/assets/images/alineacion.png"),
  },
];

export default function ServiciosScreen() {
  const router = useRouter();

  const volverAlMenu = () => {
    router.push("/");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Nuestros Servicios</Text>
      <Text style={styles.subtitulo}>
        Solicita el servicio que tu vehículo necesita con un clic
      </Text>

      {servicios.map((item) => (
        <View key={item.id} style={styles.card}>
          <Image source={item.imagen} style={styles.icono} />

          <View style={styles.textContainer}>
            <Text style={styles.nombre}>{item.titulo}</Text>

          <TouchableOpacity
           style={styles.boton}
           onPress={() => router.push(`/contacto?servicio=${item.titulo}`)}
          > 
           <Text style={styles.textoBoton}>Solicitar Servicio</Text>
          </TouchableOpacity>

          </View>
        </View>
      ))}

      <View style={{ alignItems: "center", marginTop: 30 }}>
        <TouchableOpacity onPress={volverAlMenu} style={styles.botonVolver}>
          <Text style={styles.textoVolver}>Volver al menú principal</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f4f4f4",
    alignItems: "center",
    paddingVertical: 40,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1a1a9e",
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 15,
    width: "90%",
    alignItems: "center",
    marginBottom: 20,
    padding: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  icono: {
    width: 70,
    height: 70,
    resizeMode: "contain",
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  nombre: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  boton: {
    backgroundColor: "#007AFF",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  textoBoton: {
    color: "#fff",
    fontWeight: "bold",
  },
  botonVolver: {
    backgroundColor: "#1a1a9e",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 30,
  },
  textoVolver: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});