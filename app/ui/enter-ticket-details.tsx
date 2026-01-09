import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";

export default function EnterTicketDetails() {
  const router = useRouter();

  const [routeNo, setRouteNo] = useState("");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [fare, setFare] = useState("");
  const [busCode, setBusCode] = useState("");

  const onGenerateTicket = () => {
    router.push({
      pathname: "/ticket-preview",
      params: {
        routeNo,
        source,
        destination,
        fare,
        busCode,
      },
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Enter Ticket Details</Text>

      <TextInput
        style={styles.input}
        placeholder="Route Number (eg: 153P)"
        value={routeNo}
        onChangeText={setRouteNo}
      />

      <TextInput
        style={styles.input}
        placeholder="Source (eg: NAZARATHPET)"
        value={source}
        onChangeText={setSource}
      />

      <TextInput
        style={styles.input}
        placeholder="Destination (eg: M.G.R KOYAMBEDU)"
        value={destination}
        onChangeText={setDestination}
      />

      <TextInput
        style={styles.input}
        placeholder="Fare (eg: 25)"
        keyboardType="numeric"
        value={fare}
        onChangeText={setFare}
      />

      <TextInput
        style={styles.input}
        placeholder="Bus Code (eg: K0189)"
        value={busCode}
        onChangeText={setBusCode}
      />

      <TouchableOpacity style={styles.button} onPress={onGenerateTicket}>
        <Text style={styles.buttonText}>Generate Ticket</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6FA",
    padding: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
  },

  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    fontSize: 16,
  },

  button: {
    backgroundColor: "#1E40FF",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 20,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
