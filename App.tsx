
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListView from "./src/screens/ListView";
import InsertBills from "./src/screens/InsertBills";

const Stack =  createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Plano de contas"
          component={ListView}
          options={{
            headerStyle: {
              backgroundColor: "#622490",
            },
            headerTintColor: "#FFF",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="Inserir Conta"
          component={InsertBills}
          options={{
         
            headerStyle: {
              backgroundColor: "#622490",
            },
            headerTintColor: "#FFF",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}