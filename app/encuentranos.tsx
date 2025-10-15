import * as Linking from "expo-linking";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

// Dirección objetivo
const DEST_QUERY = "Serviteca, Calle 40 #2-15, Bogotá, Colombia";

// Coordenadas aproximadas de Bogotá
const DEST_LAT = 4.711;
const DEST_LNG = -74.0721;

export default function Encuentranos() {
  const [hasPerm, setHasPerm] = useState<boolean | null>(null);
  const [userCoords, setUserCoords] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const router = useRouter(); // 👈 inicializa el router

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setHasPerm(status === "granted");
      if (status !== "granted") return;

      const loc = await Location.getCurrentPositionAsync({});
      setUserCoords({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
    })();
  }, []);

  const openRoute = () => {
    const dest = encodeURIComponent(DEST_QUERY);
    let url = "";

    if (Platform.OS === "ios") {
      url = `http://maps.apple.com/?daddr=${dest}&dirflg=d`;
      if (userCoords) {
        url += `&saddr=${userCoords.latitude},${userCoords.longitude}`;
      }
    } else {
      if (userCoords) {
        url = `https://www.google.com/maps/dir/?api=1&origin=${userCoords.latitude},${userCoords.longitude}&destination=${dest}&travelmode=driving`;
      } else {
        url = `https://www.google.com/maps/dir/?api=1&destination=${dest}&travelmode=driving`;
      }
    }

    Linking.openURL(url).catch(() =>
      Alert.alert("No se pudo abrir Google Maps.")
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Encuéntranos</Text>
      <Text style={styles.subtitle}>Colombia · Bogotá · Calle 40 #2-15</Text>

      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: DEST_LAT,
          longitude: DEST_LNG,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        showsUserLocation={hasPerm === true}
      >
        <Marker
          coordinate={{ latitude: DEST_LAT, longitude: DEST_LNG }}
          title="Serviteca"
          description="Calle 40 #2-15, Bogotá"
        />
      </MapView>

      <TouchableOpacity style={styles.button} onPress={openRoute}>
        <Text style={styles.buttonText}>Ver ruta en Google Maps</Text>
      </TouchableOpacity>

      {/* 🔙 Botón para volver al menú principal */}
      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <TouchableOpacity
          onPress={() => router.push("/")}
          style={styles.botonVolver}
        >
          <Text style={styles.textoVolver}>Volver al menú principal</Text>
        </TouchableOpacity>
      </View>

      {hasPerm === false && (
        <Text style={styles.permissionNote}>
          Para mostrar tu ubicación y calcular la ruta, otorga el permiso de
          ubicación desde los ajustes del dispositivo.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0000A0", paddingTop: 50 },
  title: {
    fontSize: 26,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#fff",
    opacity: 0.9,
    textAlign: "center",
    marginBottom: 10,
  },
  map: { flex: 1, margin: 16, borderRadius: 12, overflow: "hidden" },
  button: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 10,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: "#0000A0", fontWeight: "bold" },
  permissionNote: {
    color: "#fff",
    textAlign: "center",
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  botonVolver: {
    backgroundColor: "#1a1a9e",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  textoVolver: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
