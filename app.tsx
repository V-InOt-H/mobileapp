import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TicketPreview from "./TicketPreview";
import TicketView from "./TicketView";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Preview" component={TicketPreview} />
        <Stack.Screen name="TicketView" component={TicketView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
