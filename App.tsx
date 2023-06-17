import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./Views/HomeScreen";
import InsertBillScreen from "./Views/InsertBillScreen";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Plano de Contas" component={HomeScreen} />
        <Stack.Screen name="Inserir Conta" component={InsertBillScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
