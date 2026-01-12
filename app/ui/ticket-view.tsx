import { useLocalSearchParams } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import Svg, { Path, Rect } from "react-native-svg";

/* ================= TEAR EDGE ================= */

// Generate a small localized tear pattern
const generateLocalTearPattern = () => {
  const WIDTH = 120; // Smaller width for localized tear
  const HEIGHT = 13;
  const depths = [];
  
  // Create irregular wave-like pattern
  let x = 0;
  while (x <= WIDTH) {
    const chunkWidth = 8 + Math.random() * 15;
    
    const rand = Math.random();
    let depth;
    if (rand < 0.3) {
      depth = HEIGHT * 0.2;
    } else if (rand < 0.6) {
      depth = HEIGHT * 0.4;
    } else {
      depth = HEIGHT * (0.6 + Math.random() * 0.4);
    }
    
    depths.push({ x, depth });
    x += chunkWidth;
  }
  
  depths.push({ x: WIDTH, depth: depths[depths.length - 1].depth });
  
  return depths;
};

const tearDepths = generateLocalTearPattern();

function TearEdge({
  position = "top",
  backgroundColor = "#1F57D6",
}: {
  position?: "top" | "bottom";
  backgroundColor?: string;
}) {
  const WIDTH = 120;
  const HEIGHT = 15;
  
  const points = [];
  
  for (let i = 0; i < tearDepths.length; i++) {
    const { x, depth } = tearDepths[i];
    const y = position === "top" 
      ? depth  // Ridges go down from top
      : HEIGHT - depth;  // Ridges go up from bottom
    points.push(`${x},${y}`);
  }
  
  if (position === "top") {
    points.push(`${WIDTH},${HEIGHT}`);
    points.push(`0,${HEIGHT}`);
  } else {
    points.push(`${WIDTH},0`);
    points.push(`0,0`);
  }
  
  const pathData = `M ${points.join(" L ")} Z`;

  return (
    <Svg
      width={WIDTH}
      height={HEIGHT}
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      style={{ 
        position: 'absolute', 
        [position]: position === "top" ? -HEIGHT : -1, // Adjust bottom position
        left: 40,
        zIndex: 100 
      }}
    >
      <Path
        d={pathData}
        fill="#fff"
      />
    </Svg>
  );
}

/* ================= MAIN SCREEN ================= */

export default function TicketView() {
  const { route, from, to, fare, ticketNo, validity } =
    useLocalSearchParams();

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.container}>

        {/* HEADER */}
        <Text style={styles.headerTitle}>Your bus ticket is ready!</Text>
        <Text style={styles.subText}>
          You can view your ticket details below.
        </Text>

        {/* TICKET */}
        <View style={styles.ticketWrapper}>

          {/* BODY */}
          <View style={styles.ticketBody}>

            {/* TOP TEAR - positioned at exact top */}
            <TearEdge position="top" />

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

            {/* BOTTOM TEAR - positioned at exact bottom */}
            <TearEdge position="bottom" />
          </View>

        </View>
      </View>
    </ScrollView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#1F57D6",
  },

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
    borderRadius: 0,
    overflow: "visible",
  },

  ticketBody: {
    padding: 40,
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
