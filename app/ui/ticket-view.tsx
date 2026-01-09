import { useLocalSearchParams } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Path, Svg } from "react-native-svg";

export default function TicketView() {
  const { route, from, to, fare, ticketNo, validity } =
    useLocalSearchParams();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#1F57D6" }}>
      <View style={styles.container}>

        {/* HEADER */}
        <Text style={styles.headerTitle}>Your bus ticket is ready!</Text>
        <Text style={styles.subText}>
          You can view your ticket details below.
        </Text>

        {/* TICKET */}
        <View style={styles.ticketWrapper}>

          {/* TOP TORN */}
          <Svg height="22" width="100%" viewBox="0 0 400 20">
            <Path
              d="M0 20 Q20 0 40 20 T80 20 T120 20 T160 20 T200 20 T240 20 T280 20 T320 20 T360 20 T400 20"
              fill="#fff"
            />
          </Svg>

          {/* BODY */}
          <View style={styles.ticketBody}>

            {/* WATERMARK */}
            <View style={styles.watermarkContainer}>
              {Array.from({ length: 6 }).map((_, i) => (
                <Text
                  key={`L${i}`}
                  style={[
                    styles.watermarkText,
                    {
                      top: 40 + i * 90,
                      left: -30,
                      transform: [{ rotate: "-90deg" }],
                    },
                  ]}
                >
                  MTC, CHENNAI
                </Text>
              ))}

              {Array.from({ length: 6 }).map((_, i) => (
                <Text
                  key={`R${i}`}
                  style={[
                    styles.watermarkText,
                    {
                      top: 40 + i * 90,
                      right: -30,
                      transform: [{ rotate: "90deg" }],
                    },
                  ]}
                >
                  MTC, CHENNAI
                </Text>
              ))}
            </View>

            {/* LOGO */}
            <Image
              source={require("../../assets/images/mtc.jpeg")}
              style={styles.logo}
            />

            <Text style={styles.title}>CHENNAI CITY BUS</Text>
            <Text style={styles.route}>{route}</Text>

            <View style={styles.row}>
              <Text>From</Text>
              <Text style={styles.bold}>{from}</Text>
            </View>

            <View style={styles.row}>
              <Text>To</Text>
              <Text style={styles.bold}>{to}</Text>
            </View>

            <View style={styles.row}>
              <Text>Fare</Text>
              <Text style={styles.bold}>₹{fare}</Text>
            </View>

            <View style={styles.row}>
              <Text>Ticket No</Text>
              <Text style={styles.bold}>{ticketNo}</Text>
            </View>

            <View style={styles.row}>
              <Text>Validity</Text>
              <Text style={styles.bold}>{validity}</Text>
            </View>

            <Text style={styles.thanks}>
              THANK YOU FOR USING PUBLIC TRANSPORT
            </Text>
            <Text style={styles.tamil}>
              பயணம் செய்தமைக்கு நன்றி
            </Text>
          </View>

          {/* BOTTOM TORN */}
          <Svg height="22" width="100%" viewBox="0 0 400 20">
            <Path
              d="M0 0 Q20 20 40 0 T80 0 T120 0 T160 0 T200 0 T240 0 T280 0 T320 0 T360 0 T400 0"
              fill="#fff"
            />
          </Svg>

        </View>
      </View>
    </ScrollView>
  );
}
/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 10,
  },

  subText: {
    color: "#cfe2ff",
    textAlign: "center",
    marginBottom: 20,
  },

  ticketWrapper: {
    backgroundColor: "#fff",
    borderRadius: 22,
    overflow: "hidden",
  },

  ticketBody: {
    padding: 40,
    backgroundColor: "#fff",
    position: "relative",
  },

  watermarkContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  watermarkText: {
    position: "absolute",
    fontSize: 12,
    color: "#000",
    opacity: 0.05,
    fontWeight: "600",
  },

  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 40,
    opacity: 0.05,
  },

  title: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
  },

  route: {
    textAlign: "center",
    marginBottom: 16,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },

  bold: {
    fontWeight: "700",
  },

  thanks: {
    textAlign: "center",
    fontSize: 12,
    marginTop: 12,
  },

  tamil: {
    textAlign: "center",
    fontSize: 13,
    marginBottom: 10,
  },
});

