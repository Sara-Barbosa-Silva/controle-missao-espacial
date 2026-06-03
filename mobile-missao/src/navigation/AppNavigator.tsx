import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeScreen } from "../screens/HomeScreen";
import { SensoresScreen } from "../screens/SensoresScreen";
import { SistemasScreen } from "../screens/SistemasScreen";
import { AlertasScreen } from "../screens/AlertasScreen";
import { CadastroSensorScreen } from "../screens/CadastroSensorScreen";
import { GerenciamentoMissaoScreen } from "../screens/GerenciamentoMissaoScreen";
import { EditarSensorScreen } from "../screens/EditarSensorScreen";
import { Sensor } from "../interfaces";
import { CadastroSistemaScreen } from "../screens/CadastroSistemaScreen";

export type RootStackParamList = {
  Home: undefined;
  Sensores: undefined;
  Sistemas: undefined;
  Alertas: undefined;
  CadastroSensor: undefined;
  GerenciamentoMissao: undefined;
  EditarSensor: { sensor: Sensor };
  CadastroSistema: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="GerenciamentoMissao"
          component={GerenciamentoMissaoScreen}
          options={{ title: "" }}
          
        />

        <Stack.Screen
          name="Sensores"
          component={SensoresScreen}
          options={{ title: "" }}
        />

        <Stack.Screen
          name="Sistemas"
          component={SistemasScreen}
          options={{ title: "" }}
        />

        <Stack.Screen
          name="Alertas"
          component={AlertasScreen}
          options={{ title: "" }}
        />

        <Stack.Screen
          name="CadastroSensor"
          component={CadastroSensorScreen}
          options={{ title: "" }}
        />

        <Stack.Screen
          name="EditarSensor"
          component={EditarSensorScreen}
          options={{ title: "" }}
        />
        <Stack.Screen
          name="CadastroSistema"
          component={CadastroSistemaScreen}
          options={{ title: "" }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}