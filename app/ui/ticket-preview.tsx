import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useLocalSearchParams } from "expo-router";

import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

/* ================= CONSTANTS ================= */
const VALIDITY_HOURS = 6;

/* ================= SCREEN ================= */
export default function TicketPreview() {
  /* -------- STATIC / PASSED VALUES -------- */

  const {
    routeNo,
    source,
    destination,
    fare,
    busCode,
  } = useLocalSearchParams();

  const passengers = 1;

  const router = useRouter();

  /* -------- TIME SETUP (REAL TIME) -------- */
  const bookingTime = new Date();

  const expiryTime = new Date(
    bookingTime.getTime() + VALIDITY_HOURS * 60 * 60 * 1000
  );

  const nextArrival = new Date(
    bookingTime.getTime() + (5 + Math.floor(Math.random() * 15)) * 60000
  );

  /* -------- COUNTDOWN -------- */
  const [remaining, setRemaining] = useState(
    Math.max(
      Math.floor((expiryTime.getTime() - Date.now()) / 1000),
      0
    )
  );

  useEffect(() => {
    const timer = setInterval(() => {
      const diff = Math.floor(
        (expiryTime.getTime() - Date.now()) / 1000
      );
      setRemaining(diff > 0 ? diff : 0);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  /* -------- FORMAT FUNCTIONS -------- */
  const formatTime = (sec: number) => {
    const h = String(Math.floor(sec / 3600)).padStart(2, "0");
    const m = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const timeOnly = (date: Date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  /* ================= UI ================= */
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.header}>Active Ticket</Text>

      {/* ===== CARD 1 ===== */}
      <View style={styles.card}>
        <Text style={styles.depot}>மா. போ. க. (சென்னை)</Text>

        <View style={styles.topRow}>
          <Text style={styles.smallText}>
            {bookingTime.toLocaleDateString("en-GB")}
          </Text>
          <Text style={styles.smallText}>👤 x{passengers}</Text>
          <Text style={styles.smallText}>ID: 3837..</Text>
        </View>

        <View style={styles.timerBox}>
          <Text style={styles.timerLabel}>Ticket is valid for</Text>
          <Text style={styles.timer}>{formatTime(remaining)}</Text>
        </View>

        <View style={styles.routeRow}>
          <View>
            <Text style={styles.routeText}>{routeNo}</Text>
            <Text style={styles.fare}>₹ {fare}</Text>
          </View>

          <Image
            source={require("../../assets/images/bus.jpeg")}
            style={styles.busImage}
          />
        </View>

        <View style={styles.ticketCodeCard}>
          <Text style={styles.activatedText}>✓ Activated Ticket</Text>
          <Text style={styles.ticketCode}>{busCode}</Text>

        <View style={styles.sideBadge}>
          <Text style={styles.sideBadgeText}>1</Text>
        </View>
        </View>

        <Text style={styles.label}>Source</Text>
        <Text style={styles.value}>{source}</Text>

        <Text style={styles.label}>Destination</Text>
        <Text style={styles.value}>{destination}</Text>
      </View>

      {/* ===== CARD 2 ===== */}
      <View style={styles.card}>
        <Text style={styles.boardTitle}>Board Bus from {source}</Text>

        <View style={styles.infoRow}>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>NEXT ARRIVAL</Text>
            <Text style={styles.infoValue}>{timeOnly(nextArrival)}</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>VALIDITY</Text>
            <Text style={styles.infoValue}>{timeOnly(expiryTime)}</Text>
          </View>
        </View>

        <View style={styles.passengerRow}>
          <Text>Adult</Text>
          <Text>1</Text>
        </View>

        <View style={styles.passengerRow}>
          <Text>Child</Text>
          <Text>0</Text>
        </View>

        {/* ===== QR IMAGE ===== */}
        <View style={styles.qrBox}>
          <Image
            source={require("../../assets/images/qr.jpeg")}
            style={styles.qrImage}
            resizeMode="contain"
          />
        </View>

        <TouchableOpacity
            style={styles.showBtn}
        onPress={() => router.push({ pathname: "/ui/ticket-view" })}
        >
    <Text style={styles.showBtnText}>🎟 Show Bus Ticket</Text>
  </TouchableOpacity>
        {/* ===== FOOTER TEXTS ===== */}
        <Text style={styles.footerText}>
          THANK YOU FOR USING PUBLIC TRANSPORT
        </Text>

        <Text style={styles.footerTamil}>
          பயணம் செய்தமைக்கு நன்றி
        </Text>
      </View>
    </ScrollView>
  );
}

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F6FA", padding: 14 },
  header: { fontSize: 20, fontWeight: "700", marginBottom: 10 },

  card: {
    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 20,
    marginBottom: 22,
  },

  depot: { textAlign: "center", fontWeight: "600", marginBottom: 6 },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  smallText: { fontSize: 12, color: "#555" },

  timerBox: {
    backgroundColor: "#E8F7F0",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 14,
  },

  timerLabel: { fontSize: 14, marginBottom: 4 },
  timer: { fontSize: 32, letterSpacing: 2, fontWeight: "600" },

  routeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  routeText: { fontSize: 16, fontWeight: "600" },
  fare: { fontSize: 22, fontWeight: "700" },

  busImage: { width: 80, height: 60 },

  ticketCodeCard: {
    backgroundColor: "#2447F9",
    borderRadius: 20,
    padding: 22,
    marginBottom: 15,
    position: "relative",
    overflow: "hidden",
  },

  activatedText: { color: "#E6ECFF", fontSize: 14 },
  ticketCode: { color: "#fff", fontSize: 34, letterSpacing: 4, fontWeight: "600" },

  sideBadge: {
    position: "absolute",
    right: -28,
    top: 0,
    bottom: 0,
    width: 90,
    backgroundColor: "#F7C600",
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
    borderTopLeftRadius: 60,
    borderBottomLeftRadius:60,
    alignItems: "center",
    justifyContent: "center",
  },
  sideBadgeText: {
    fontSize: 40,
    fontWeight: "800",
    color: "#2447F9",
    marginLeft: -8,
  },

  label: { color: "#888", marginTop: 6 },
  value: { fontSize: 16, fontWeight: "600" },

  boardTitle: { fontWeight: "700", marginBottom: 10 },

  infoRow: { flexDirection: "row", justifyContent: "space-between" },

  infoBox: {
    backgroundColor: "#F1F3F6",
    padding: 12,
    borderRadius: 12,
    width: "48%",
  },

  infoLabel: { fontSize: 12, color: "#777" },
  infoValue: { fontSize: 18, fontWeight: "700" },

  passengerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  qrBox: {
    alignItems: "center",
    marginTop: 26,
    marginBottom: 36,
  },

  qrImage: { width: 220, height: 220 },

  showBtn: {
    backgroundColor: "#2447F9",
    padding: 17,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 26,
  },

  showBtnText: { color: "#fff", fontSize: 16, fontWeight: "600" },

  footerText: {
    textAlign: "center",
    color: "#777",
    fontSize: 12,
    letterSpacing: 1,
    marginBottom: 6,
  },

  footerTamil: {
    textAlign: "center",
    color: "#777",
    fontSize: 13,
    marginBottom: 8,
  },
});
