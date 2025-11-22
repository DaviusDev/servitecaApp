import { Ionicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
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

  const [showOverlay, setShowOverlay] = useState(true); // 👈 nuevo estado

  const router = useRouter();

  // Animaciones de entrada
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    // Permiso de ubicación
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

  useEffect(() => {
    // Animación de entrada
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, translateY]);

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
      Alert.alert("No se pudo abrir la aplicación de mapas.")
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Animated.View
        style={[
          styles.headerContainer,
          { opacity: fadeAnim, transform: [{ translateY }] },
        ]}
      >
        <Text style={styles.appName}>FULL AUTOS SAS</Text>
        <Text style={styles.title}>Encuéntranos</Text>
        <Text style={styles.subtitle}>
          Colombia · Bogotá · Calle 40 #2-15{"\n"}
          Localiza nuestra sede y llega con ruta guiada en tu app de mapas.
        </Text>
      </Animated.View>

      {/* Mapa con tarjeta flotante */}
      <Animated.View
        style={[
          styles.mapWrapper,
          { opacity: fadeAnim, transform: [{ translateY }] },
        ]}
      >
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
            title="Serviteca Full Autos"
            description="Calle 40 #2-15, Bogotá"
          />
        </MapView>

        {/* 🔘 Botón para mostrar/ocultar el mensaje */}
        <TouchableOpacity
          style={styles.locationToggle}
          onPress={() => setShowOverlay((prev) => !prev)}
        >
          <Ionicons
            name={showOverlay ? "location" : "location-outline"}
            size={20}
            color="#FFFFFF"
          />
        </TouchableOpacity>

        {/* 📝 Tarjeta con el mensaje encima del mapa (toggle) */}
        {showOverlay && (
          <View style={styles.mapOverlayCard}>
            <View style={styles.mapOverlayRow}>
              <Text style={styles.mapOverlayTitle}>Sede principal</Text>
              <Text style={styles.mapOverlayText}>
                Calle 40 #2-15, Bogotá, Colombia. Punto de atención para
                revisiones, diagnósticos y asesoría técnica.
              </Text>
            </View>
            <Text style={styles.mapOverlayHint}>
              Usa el botón inferior para abrir la ruta paso a paso en tu
              aplicación de mapas preferida.
            </Text>
          </View>
        )}
      </Animated.View>

      {/* Acciones y botón volver */}
      <Animated.View
        style={[
          styles.actionsContainer,
          { opacity: fadeAnim, transform: [{ translateY }] },
        ]}
      >
        <TouchableOpacity style={styles.buttonPrimary} onPress={openRoute}>
          <Ionicons name="navigate-outline" size={18} color="#FFFFFF" />
          <Text style={styles.buttonPrimaryText}>Ver ruta en Google Maps</Text>
        </TouchableOpacity>

        {hasPerm === false && (
          <View style={styles.permissionBox}>
            <Ionicons name="warning-outline" size={18} color="#F5C35E" />
            <Text style={styles.permissionNote}>
              Para calcular la ruta desde tu ubicación actual, habilita el
              permiso de ubicación de la app en los ajustes del dispositivo.{"\n"}
              Aun sin permiso, podrás ver la ruta tomando la serviteca como
              destino.
            </Text>
          </View>
        )}

        <View style={styles.backContainer}>
          <TouchableOpacity
            onPress={() => router.push("/")}
            style={styles.botonVolver}
          >
            <Ionicons name="arrow-back-outline" size={18} color="#FFFFFF" />
            <Text style={styles.textoVolver}>Volver al menú principal</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050B29",
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerContainer: {
    marginBottom: 20,
  },
  appName: {
    fontSize: 12,
    color: "#8EA4FF",
    letterSpacing: 2,
    textAlign: "center",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  title: {
    fontSize: 26,
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#D0D4FF",
    textAlign: "center",
    marginTop: 8,
    lineHeight: 20,
  },
  mapWrapper: {
    borderRadius: 18,
    overflow: "hidden",
    backgroundColor: "#000000",
    height: 260,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  map: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  // 🔘 Botón flotante de ubicación (toggle)
  locationToggle: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 40,
    height: 40,
    borderRadius: 999,
    backgroundColor: "rgba(32,51,163,0.95)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(142,164,255,0.6)",
  },
  mapOverlayCard: {
    position: "absolute",
    bottom: 14,
    left: 14,
    right: 14,
    backgroundColor: "rgba(5,11,41,0.95)",
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: "rgba(142,164,255,0.4)",
  },
  mapOverlayRow: {
    marginBottom: 8,
  },
  mapOverlayTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 2,
  },
  mapOverlayText: {
    fontSize: 12,
    color: "#C6CEFF",
    lineHeight: 18,
  },
  mapOverlayHint: {
    fontSize: 11,
    color: "#8EA4FF",
    marginTop: 2,
  },
  actionsContainer: {
    marginTop: 4,
  },
  buttonPrimary: {
    backgroundColor: "#2033A3",
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonPrimaryText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
    marginLeft: 8,
  },
  permissionBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "rgba(112,81,21,0.35)",
    borderRadius: 12,
    padding: 10,
    marginTop: 10,
  },
  permissionNote: {
    flex: 1,
    color: "#FFE6A3",
    fontSize: 12,
    marginLeft: 8,
    lineHeight: 18,
  },
  backContainer: {
    alignItems: "center",
    marginTop: 18,
  },
  botonVolver: {
    backgroundColor: "#141F8B",
    paddingVertical: 11,
    paddingHorizontal: 28,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  textoVolver: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
    marginLeft: 8,
  },
});