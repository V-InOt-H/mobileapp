import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TicketTab() {
  const [ticket, setTicket] = useState<any>(null);

  useEffect(() => {
    const loadTicket = async () => {
      const data = await AsyncStorage.getItem("ACTIVE_TICKET");
      if (data) setTicket(JSON.parse(data));
    };
    loadTicket();
  }, []);

  if (!ticket) {
    return (
      <View style={styles.center}>
        <Text>No Active Ticket</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Active Ticket</Text>

      <Text>Route: {ticket.routeNo}</Text>
      <Text>From: {ticket.source}</Text>
      <Text>To: {ticket.destination}</Text>
      <Text>Fare: ₹{ticket.fare}</Text>
      <Text>Code: {ticket.busCode}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 12 },
});
