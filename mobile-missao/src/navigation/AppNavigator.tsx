import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeScreen } from "../screens/HomeScreen";
import { SensoresScreen } from "../screens/SensoresScreen";
import { SistemasScreen } from "../screens/SistemasScreen";
import { EventosScreen } from "../screens/EventosScreen";
import { AlertasScreen } from "../screens/AlertasScreen";
import { CadastroSensorScreen } from "../screens/CadastroSensorScreen";

export type RootStackParamList = {
  Home: undefined;
  Sensores: undefined;
  Sistemas: undefined;
  Eventos: undefined;
  Alertas: undefined;
  CadastroSensor: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Controle de Missão" }}
        />
        <Stack.Screen
          name="Sensores"
          component={SensoresScreen}
          options={{ title: "Sensores" }}
        />
        <Stack.Screen
          name="Sistemas"
          component={SistemasScreen}
          options={{ title: "Sistemas Monitorados" }}
        />
        <Stack.Screen
          name="Eventos"
          component={EventosScreen}
          options={{ title: "Eventos Operacionais" }}
        />
        <Stack.Screen
          name="Alertas"
          component={AlertasScreen}
          options={{ title: "Alertas Críticos" }}
        />
        <Stack.Screen
          name="CadastroSensor"
          component={CadastroSensorScreen}
          options={{ title: "Cadastrar Sensor" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}