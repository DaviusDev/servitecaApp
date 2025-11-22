import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  Alert,
  Animated,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const PHONE = "3215";
const EMAIL = "serviteca@";

export default function Contacto() {
  const router = useRouter();
  const { servicio } = useLocalSearchParams();

  // Animaciones de entrada
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
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
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Todo el contenido dentro de ScrollView */}
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header animado */}
          <Animated.View
            style={[
              styles.headerContainer,
              { opacity: fadeAnim, transform: [{ translateY }] },
            ]}
          >
            <Text style={styles.appName}>FULL AUTOS SAS</Text>
            <Text style={styles.title}>Contacto y Soporte</Text>
            <Text style={styles.subtitle}>
              Estamos listos para acompañarte en la revisión y mantenimiento de
              tu vehículo. Elige cómo quieres comunicarte con nosotros.
            </Text>
          </Animated.View>

          {/* Texto con el servicio solicitado */}
          <View>
            <Text
              style={{
                color: "#FFFFFF",
                textAlign: "center",
                marginVertical: 10,
              }}
            >
              Estás solicitando: {servicio}
            </Text>
          </View>

          {/* Contenido principal animado */}
          <Animated.View
            style={[
              styles.content,
              { opacity: fadeAnim, transform: [{ translateY }] },
            ]}
          >
            {/* Card de llamada */}
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.iconCircle}>
                  <Ionicons name="call" size={22} color="#FFFFFF" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>Llámanos</Text>
                  <Text style={styles.cardSubtitle}>Atención inmediata</Text>
                </View>
                <View style={styles.chip}>
                  <Text style={styles.chipText}>Respuesta rápida</Text>
                </View>
              </View>

              <Text style={styles.value}>{PHONE}</Text>
              <Text style={styles.description}>
                Ideal para agendar revisiones, resolver dudas técnicas o
                solicitar información sobre nuestros servicios y sedes.
              </Text>

              <TouchableOpacity
                style={styles.buttonPrimary}
                onPress={handleCall}
              >
                <Ionicons name="call-outline" size={18} color="#FFFFFF" />
                <Text style={styles.buttonPrimaryText}>Llamar ahora</Text>
              </TouchableOpacity>
            </View>

            {/* Card de correo */}
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.iconCircle}>
                  <Ionicons name="mail" size={22} color="#FFFFFF" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>Escríbenos</Text>
                  <Text style={styles.cardSubtitle}>Atención por correo</Text>
                </View>
                <View style={styles.chipSecondary}>
                  <Text style={styles.chipTextSecondary}>24/7</Text>
                </View>
              </View>

              <Text style={styles.value}>{EMAIL}</Text>
              <Text style={styles.description}>
                Perfecto para solicitudes formales, envío de información
                adicional o seguimiento de casos particulares.
              </Text>

              <TouchableOpacity
                style={styles.buttonSecondary}
                onPress={handleEmail}
              >
                <Ionicons name="mail-outline" size={18} color="#0C1E6F" />
                <Text style={styles.buttonSecondaryText}>Enviar correo</Text>
              </TouchableOpacity>
            </View>

            {/* Info extra */}
            <View style={styles.infoBox}>
              <Ionicons
                name="information-circle-outline"
                size={18}
                color="#8EA4FF"
              />
              <Text style={styles.infoText}>
                Horario de atención: Lunes a sábado, 8:00 a.m. - 6:00 p.m.{"\n"}
                También podemos coordinar revisiones y asesorías personalizadas.
              </Text>
            </View>
          </Animated.View>

          <View style={{ alignItems: "center", marginTop: 10 }}>
            <TouchableOpacity
              onPress={() => router.push("/Servicios")}
              style={styles.botonVolver}
            >
              <Text style={styles.textoVolver}>Volver a Servicios</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/")}
              style={[styles.botonVolver, { marginTop: 10 }]}
            >
              <Text style={styles.textoVolver}>Volver al menú principal</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#050B29",
  },
  container: {
    flex: 1,
    backgroundColor: "#050B29",
    paddingHorizontal: 20,
    paddingTop: 50,
  },

  /* Scroll */
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },

  headerContainer: {
    marginBottom: 24,
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

  content: {},

  card: {
    backgroundColor: "rgba(9,15,52,0.98)",
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(142,164,255,0.25)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 999,
    backgroundColor: "#2033A3",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  cardSubtitle: {
    fontSize: 12,
    color: "#A7B3FF",
    marginTop: 2,
  },
  chip: {
    backgroundColor: "rgba(142,164,255,0.25)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  chipText: {
    fontSize: 11,
    color: "#D0D4FF",
    fontWeight: "500",
  },
  chipSecondary: {
    backgroundColor: "rgba(80,220,160,0.18)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  chipTextSecondary: {
    fontSize: 11,
    color: "#50DCA0",
    fontWeight: "500",
  },
  value: {
    fontSize: 18,
    marginTop: 4,
    marginBottom: 8,
    color: "#8EA4FF",
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 13,
    color: "#D0D4FF",
    lineHeight: 19,
    marginBottom: 14,
  },
  buttonPrimary: {
    backgroundColor: "#2033A3",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonPrimaryText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
    marginLeft: 6,
  },
  buttonSecondary: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonSecondaryText: {
    color: "#0C1E6F",
    fontWeight: "700",
    fontSize: 14,
    marginLeft: 6,
  },
  infoBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 12,
    borderRadius: 14,
    backgroundColor: "rgba(16,32,112,0.8)",
    marginTop: 12,
  },
  infoText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 12,
    color: "#C6CEFF",
    lineHeight: 18,
  },

  botonVolver: {
    backgroundColor: "#2033A3",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginTop: 10,
  },
  textoVolver: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },
});
