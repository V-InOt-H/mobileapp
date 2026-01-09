import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  PanResponder,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const { width, height: SCREEN_HEIGHT } = Dimensions.get("window");

const COLLAPSED_HEIGHT = 260;
const EXPANDED_HEIGHT = SCREEN_HEIGHT * 0.65;

export default function HomeScreen() {
  const router = useRouter();

  const translateY = useRef(
    new Animated.Value(SCREEN_HEIGHT - COLLAPSED_HEIGHT)
  ).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dy) > 10,

      onPanResponderMove: (_, g) => {
        const newY = SCREEN_HEIGHT - COLLAPSED_HEIGHT + g.dy;
        if (
          newY >= SCREEN_HEIGHT - EXPANDED_HEIGHT &&
          newY <= SCREEN_HEIGHT - COLLAPSED_HEIGHT
        ) {
          translateY.setValue(newY);
        }
      },

      onPanResponderRelease: (_, g) => {
        Animated.spring(translateY, {
          toValue:
            g.dy < 0
              ? SCREEN_HEIGHT - EXPANDED_HEIGHT
              : SCREEN_HEIGHT - COLLAPSED_HEIGHT,
          useNativeDriver: true,
        }).start();
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      {/* MAP */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 13.0827,
          longitude: 80.2707,
          latitudeDelta: 0.08,
          longitudeDelta: 0.08,
        }}
      >
        <Marker coordinate={{ latitude: 13.0827, longitude: 80.2707 }} />
      </MapView>

      {/* BOTTOM SHEET */}
      <Animated.View
        style={[styles.bottomSheet, { transform: [{ translateY }] }]}
        {...panResponder.panHandlers}
      >
        <View style={styles.dragHandle} />

        <View style={styles.card}>
          <View style={styles.planRow}>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
            <Text style={styles.planText}>Plan your journey</Text>
          </View>
          <Text style={styles.questionText}>
            Where would you like to go?
          </Text>
        </View>

        <View style={styles.optionsRow}>
          <Option icon="bus" label="Bus" color="#F3C623" />
          <Option icon="train" label="Train" color="#6BC4B5" />
          <Option icon="subway" label="Metro" color="#4FA3F7" />
          <Option icon="ticket-alt" label="Passes" color="#4C63FF" />
        </View>

        <TouchableOpacity
          style={styles.busTicket}
          onPress={() => router.push("/bus-ticket")}
        >
          <FontAwesome5 name="bus" size={20} color="#fff" />
          <Text style={styles.busTicketText}>BUS TICKET</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F6FA" },

  map: { ...StyleSheet.absoluteFillObject },

  bottomSheet: {
    position: "absolute",
    left: 0,
    right: 0,
    height: SCREEN_HEIGHT,
    backgroundColor: "#F5F6FA",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 10,
  },

  dragHandle: {
    width: 50,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#CCC",
    alignSelf: "center",
    marginBottom: 10,
  },

  card: {
    marginHorizontal: 16,
    padding: 20,
    borderRadius: 14,
    backgroundColor: "#E53935",
  },

  planRow: { flexDirection: "row", alignItems: "center" },
  planText: { color: "#fff", marginLeft: 8 },

  questionText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    marginTop: 6,
  },

  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 24,
  },

  optionItem: { alignItems: "center" },

  optionCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    justifyContent: "center",
    alignItems: "center",
  },

  optionText: { marginTop: 6 },

  busTicket: {
    backgroundColor: "#1E40FF",
    marginHorizontal: 40,
    marginTop: 20,
    paddingVertical: 14,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  busTicketText: {
    color: "#fff",
    fontWeight: "600",
    marginLeft: 8,
  },
});

/* ---------- COMPONENTS ---------- */

function Option({ icon, label, color }: any) {
  return (
    <View style={styles.optionItem}>
      <View style={[styles.optionCircle, { backgroundColor: color }]}>
        <FontAwesome5 name={icon} size={18} color="#333" />
      </View>
      <Text style={styles.optionText}>{label}</Text>
    </View>
  );
}
