import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function BusTicketScreen() {
  const router = useRouter();
  const [code, setCode] = useState("");

  const MAX_LEN = 5;

  const onKeyPress = (val: string) => {
    if (code.length < MAX_LEN) {
      setCode(code + val);
    }
  };

  const onDelete = () => {
    setCode(code.slice(0, -1));
  };

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <View style={styles.scanBtn}>
          <Ionicons name="qr-code-outline" size={18} color="#1E40FF" />
          <Text style={styles.scanText}>Scan QR</Text>
        </View>
      </View>

      {/* CARD STRIP */}
      <View style={styles.cardStrip}>
        <View style={styles.cardLeft} />
        <View style={styles.cardRight}>
          <Text style={styles.cardText}>
            தெய்வத்தின் அருள் துணை புரியட்டும்
          </Text>
        </View>
      </View>

      {/* CODE INPUT */}
      <View style={styles.dashRow}>
        {Array.from({ length: MAX_LEN }).map((_, i) => (
          <View key={i} style={styles.dashBox}>
            <Text style={styles.dashText}>{code[i] || ""}</Text>
          </View>
        ))}
      </View>

      {/* BUTTON */}
      <TouchableOpacity
        style={styles.bookBtn}
        onPress={() => router.push("/enter-ticket-details")}
      >
        <Text style={styles.bookText}>Book Bus Ticket →</Text>
      </TouchableOpacity>

      {/* KEYPAD */}
      <View style={styles.keypad}>
        {["J", "K", "I", "1", "2", "3", "4", "5", "6", "7", "8", "9", "S", "0"].map(
          (key) => (
            <TouchableOpacity
              key={key}
              style={styles.key}
              onPress={() => onKeyPress(key)}
            >
              <Text style={styles.keyText}>{key}</Text>
            </TouchableOpacity>
          )
        )}

        <TouchableOpacity style={styles.key} onPress={onDelete}>
          <Ionicons name="backspace-outline" size={22} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F6FA" },

  header: {
    height: 160,
    backgroundColor: "#000",
    paddingTop: 50,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },

  scanBtn: {
    marginLeft: 16,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
  },

  scanText: {
    color: "#1E40FF",
    marginLeft: 6,
    fontWeight: "600",
  },

  cardStrip: {
    margin: 16,
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    alignItems: "center",
  },

  cardLeft: {
    width: 60,
    height: 36,
    borderRadius: 6,
    backgroundColor: "#1E40FF",
  },

  cardRight: { marginLeft: 10, flex: 1 },

  cardText: { fontSize: 12 },

  dashRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },

  dashBox: {
    width: 40,
    height: 40,
    borderBottomWidth: 2,
    borderColor: "#bbb",
    marginHorizontal: 6,
    alignItems: "center",
    justifyContent: "center",
  },

  dashText: {
    fontSize: 18,
    fontWeight: "600",
  },

  bookBtn: {
    marginHorizontal: 30,
    marginTop: 20,
    backgroundColor: "#1E40FF",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  bookText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },

  keypad: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 20,
  },

  key: {
    width: "30%",
    height: 50,
    margin: 6,
    justifyContent: "center",
    alignItems: "center",
  },

  keyText: {
    fontSize: 20,
    fontWeight: "600",
  },
});
