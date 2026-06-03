import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { Alert, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View} from "react-native";

import { RootStackParamList } from "../navigation/AppNavigator";
import { cadastrarSensor } from "../services";

type CadastroSensorScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "CadastroSensor">;
};

export function CadastroSensorScreen({ navigation }: CadastroSensorScreenProps) {
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");
  const [unidadeMedida, setUnidadeMedida] = useState("");
  const [valorAtual, setValorAtual] = useState("");
  const [ativo, setAtivo] = useState(true);
  const [salvando, setSalvando] = useState(false);

  async function salvarSensor() {
    if (!nome || !tipo || !unidadeMedida || !valorAtual) {
      Alert.alert("Atenção", "Preencha todos os campos.");
      return;
    }

    try {
      setSalvando(true);

      await cadastrarSensor({
        nome,
        tipo,
        unidadeMedida,
        valorAtual: Number(valorAtual),
        ativo,
      });

      Alert.alert("Sucesso", "Sensor cadastrado com sucesso.");

      setNome("");
      setTipo("");
      setUnidadeMedida("");
      setValorAtual("");
      setAtivo(true);

      navigation.navigate("Sensores");
    } catch {
      Alert.alert("Erro", "Não foi possível cadastrar o sensor.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastrar Sensor</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do sensor"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Tipo do sensor"
        value={tipo}
        onChangeText={setTipo}
      />

      <TextInput
        style={styles.input}
        placeholder="Unidade de medida"
        value={unidadeMedida}
        onChangeText={setUnidadeMedida}
      />

      <TextInput
        style={styles.input}
        placeholder="Valor atual"
        value={valorAtual}
        onChangeText={setValorAtual}
        keyboardType="numeric"
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Sensor ativo</Text>
        <Switch value={ativo} onValueChange={setAtivo} />
      </View>

      <TouchableOpacity
        style={styles.botao}
        onPress={salvarSensor}
        disabled={salvando}
      >
        <Text style={styles.textoBotao}>
          {salvando ? "Salvando..." : "Salvar Sensor"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#f8fafc",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#0f172a",
  },
  botao: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 8,
  },
  textoBotao: {
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});