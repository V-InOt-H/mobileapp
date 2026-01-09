import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* MAP PLACEHOLDER */}
      <View style={styles.map}>
        <Text style={styles.mapText}>Map View</Text>
      </View>

      {/* PLAN JOURNEY CARD */}
      <View style={styles.card}>
        <View style={styles.planRow}>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
          <Text style={styles.planText}>Plan your journey</Text>
        </View>
        <Text style={styles.questionText}>
          Where would you like to go?
        </Text>
      </View>

      {/* TRANSPORT OPTIONS */}
      <View style={styles.optionsRow}>
        <Option icon="bus" label="Bus" color="#F3C623" />
        <Option icon="train" label="Train" color="#6BC4B5" />
        <Option icon="subway" label="Metro" color="#4FA3F7" />
        <Option icon="ticket-alt" label="Passes" color="#4C63FF" />
      </View>

      {/* BUS TICKET BUTTON */}
      <TouchableOpacity style={styles.busTicket}>
        <FontAwesome5 name="bus" size={20} color="#fff" />
        <Text style={styles.busTicketText}>BUS TICKET</Text>
      </TouchableOpacity>

      {/* BOTTOM NAV */}
      <View style={styles.bottomNav}>
        <NavItem icon="home" label="Home" active />
        <NavItem icon="card" label="Passes" />
        <NavItem icon="radio-button-on" label="Live" />
        <NavItem icon="ticket" label="Ticket" />
        <NavItem icon="person" label="Profile" />
      </View>
    </View>
  );
}

/* ---------- SMALL COMPONENTS ---------- */

function Option({ icon, label, color }) {
  return (
    <View style={styles.optionItem}>
      <View style={[styles.optionCircle, { backgroundColor: color }]}>
        <FontAwesome5 name={icon} size={18} color="#333" />
      </View>
      <Text style={styles.optionText}>{label}</Text>
    </View>
  );
}

function NavItem({ icon, label, active }) {
  return (
    <View style={styles.navItem}>
      <MaterialIcons
        name={icon}
        size={24}
        color={active ? "#E53935" : "#999"}
      />
      <Text style={[styles.navText, active && { color: "#E53935" }]}>
        {label}
      </Text>
    </View>
  );
}

/* ---------- STYLES ---------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6FA",
  },

  map: {
    height: 280,
    backgroundColor: "#CFE4F5",
    justifyContent: "center",
    alignItems: "center",
  },
  mapText: {
    color: "#555",
    fontSize: 16,
  },

  card: {
    marginHorizontal: 16,
    marginTop: -30,
    padding: 20,
    borderRadius: 14,
    backgroundColor: "#E53935",
  },
  planRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  planText: {
    color: "#fff",
    marginLeft: 8,
    fontSize: 14,
  },
  questionText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },

  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 24,
  },
  optionItem: {
    alignItems: "center",
  },
  optionCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  optionText: {
    fontSize: 12,
    color: "#333",
  },

  busTicket: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 20,
    paddingHorizontal: 26,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: "#1E40FF",
  },
  busTicketText: {
    color: "#fff",
    marginLeft: 10,
    fontWeight: "600",
  },

  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    width,
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 10,
    color: "#999",
    marginTop: 2,
  },
});
