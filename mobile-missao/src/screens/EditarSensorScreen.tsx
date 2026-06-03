import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Alert, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View} from "react-native";

import { RootStackParamList } from "../navigation/AppNavigator";
import { atualizarSensor } from "../services";

type EditarSensorScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "EditarSensor"
>;

export function EditarSensorScreen({ route, navigation }: EditarSensorScreenProps) {
  const { sensor } = route.params;

  const [nome, setNome] = useState(sensor.nome);
  const [tipo, setTipo] = useState(sensor.tipo);
  const [unidadeMedida, setUnidadeMedida] = useState(sensor.unidadeMedida);
  const [valorAtual, setValorAtual] = useState(String(sensor.valorAtual));
  const [limiteAtencao, setLimiteAtencao] = useState(
    String(sensor.limiteAtencao)
  );
  const [limiteCritico, setLimiteCritico] = useState(
    String(sensor.limiteCritico)
  );
  const [ativo, setAtivo] = useState(sensor.ativo);
  const [salvando, setSalvando] = useState(false);

    async function salvarAlteracoes() {
    if (
        !nome ||
        !tipo ||
        !unidadeMedida ||
        !valorAtual ||
        !limiteAtencao ||
        !limiteCritico
    ) {
        Alert.alert("Atenção", "Preencha todos os campos.");
        return;
    }

    const valorAtualNumerico = Number(valorAtual.replace(",", "."));
    const limiteAtencaoNumerico = Number(limiteAtencao.replace(",", "."));
    const limiteCriticoNumerico = Number(limiteCritico.replace(",", "."));

    if (
        Number.isNaN(valorAtualNumerico) ||
        Number.isNaN(limiteAtencaoNumerico) ||
        Number.isNaN(limiteCriticoNumerico)
    ) {
        Alert.alert("Atenção", "Os campos numéricos precisam ser válidos.");
        return;
    }

    if (limiteAtencaoNumerico >= limiteCriticoNumerico) {
        Alert.alert(
        "Atenção",
        "O limite de atenção deve ser menor que o limite crítico."
        );
        return;
    }

    try {
        setSalvando(true);

        const sensorAtualizado = await atualizarSensor(sensor.id, {
        nome,
        tipo,
        unidadeMedida,
        valorAtual: valorAtualNumerico,
        limiteAtencao: limiteAtencaoNumerico,
        limiteCritico: limiteCriticoNumerico,
        ativo,
        });

        console.log("Sensor atualizado:", sensorAtualizado);

        Alert.alert("Sucesso", "Sensor atualizado com sucesso.", [
        {
            text: "OK",
            onPress: () => navigation.goBack(),
        },
        ]);
    } catch (error) {
        console.log("Erro ao atualizar sensor:", error);
        Alert.alert("Erro", "Não foi possível atualizar o sensor.");
    } finally {
        setSalvando(false);
    }
    }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Editar Sensor</Text>
      <Text style={styles.subtitulo}>
        Atualize os dados do sensor, como se o equipamento tivesse sido trocado,
        recalibrado ou reconfigurado.
      </Text>

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

      <TextInput
        style={styles.input}
        placeholder="Limite de atenção"
        value={limiteAtencao}
        onChangeText={setLimiteAtencao}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Limite crítico"
        value={limiteCritico}
        onChangeText={setLimiteCritico}
        keyboardType="numeric"
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Sensor ativo</Text>
        <Switch value={ativo} onValueChange={setAtivo} />
      </View>

      <TouchableOpacity
        style={styles.botao}
        onPress={salvarAlteracoes}
        disabled={salvando}
      >
        <Text style={styles.textoBotao}>
          {salvando ? "Salvando..." : "Salvar alterações"}
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
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 15,
    color: "#475569",
    marginBottom: 20,
    lineHeight: 21,
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