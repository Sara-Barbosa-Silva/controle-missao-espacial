import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import { Sensor } from "../interfaces";
import { RootStackParamList } from "../navigation/AppNavigator";
import { atualizarSensor, cadastrarAlerta, listarSensores } from "../services";

type SensoresScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Sensores">;
};

type ClassificacaoLeitura = "normal" | "atencao" | "critica" | "sem_limite";

export function SensoresScreen({ navigation }: SensoresScreenProps) {
  const [sensores, setSensores] = useState<Sensor[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [leiturasEditadas, setLeiturasEditadas] = useState<Record<number, string>>({});

  async function carregarSensores() {
    try {
      setCarregando(true);
      setErro("");

      const dados = await listarSensores();
      setSensores(dados);
    } catch {
      setErro("Não foi possível carregar os sensores.");
    } finally {
      setCarregando(false);
    }
  }

  function possuiLimites(sensor: Sensor) {
    return (
      sensor.limiteAtencao !== null &&
      sensor.limiteAtencao !== undefined &&
      sensor.limiteCritico !== null &&
      sensor.limiteCritico !== undefined
    );
  }

  function classificarLeitura(sensor: Sensor, valor: number): ClassificacaoLeitura {
    if (!possuiLimites(sensor)) {
      return "sem_limite";
    }

    if (valor >= sensor.limiteCritico) {
      return "critica";
    }

    if (valor >= sensor.limiteAtencao) {
      return "atencao";
    }

    return "normal";
  }

  function textoClassificacao(sensor: Sensor) {
    const classificacao = classificarLeitura(sensor, sensor.valorAtual);

    if (classificacao === "critica") {
      return " Crítica";
    }

    if (classificacao === "atencao") {
      return " Atenção";
    }

    if (classificacao === "sem_limite") {
      return "sensor sem limites cadastrados";
    }

    return " Normal";
  }

  function estiloClassificacao(sensor: Sensor) {
    const classificacao = classificarLeitura(sensor, sensor.valorAtual);

    if (classificacao === "critica") {
      return styles.classificacaoCritica;
    }

    if (classificacao === "atencao") {
      return styles.classificacaoAtencao;
    }

    if (classificacao === "sem_limite") {
      return styles.classificacaoSemLimite;
    }

    return styles.classificacaoNormal;
  }

  function estiloClassificacaoInline(sensor: Sensor) {
    const classificacao = classificarLeitura(sensor, sensor.valorAtual);

    if (classificacao === "critica") {
      return styles.classificacaoCriticaInline;
    }

    if (classificacao === "atencao") {
      return styles.classificacaoAtencaoInline;
    }

    if (classificacao === "sem_limite") {
      return styles.classificacaoSemLimiteInline;
    }

    return styles.classificacaoNormalInline;
  }

  async function atualizarLeitura(sensor: Sensor) {
    const valorDigitado = leiturasEditadas[sensor.id];

    if (!valorDigitado) {
      Alert.alert("Atenção", "Digite a nova leitura do sensor.");
      return;
    }

    const novoValor = Number(valorDigitado.replace(",", "."));

    if (Number.isNaN(novoValor)) {
      Alert.alert("Atenção", "Digite um valor numérico válido.");
      return;
    }

    if (!possuiLimites(sensor)) {
      Alert.alert(
        "Atenção",
        "Este sensor não possui limites cadastrados."
      );
      return;
    }

    try {
      await atualizarSensor(sensor.id, {
        nome: sensor.nome,
        tipo: sensor.tipo,
        unidadeMedida: sensor.unidadeMedida,
        valorAtual: novoValor,
        limiteAtencao: sensor.limiteAtencao,
        limiteCritico: sensor.limiteCritico,
        ativo: sensor.ativo,
      });

      const classificacao = classificarLeitura(sensor, novoValor);

      if (classificacao === "atencao") {
        await cadastrarAlerta({
          titulo: `${sensor.tipo}`,
          descricao: `O ${sensor.nome} registrou ${novoValor} ${sensor.unidadeMedida}. O valor ultrapassou o limite de atenção (${sensor.limiteAtencao} ${sensor.unidadeMedida}).`,
          nivel: "alto",
          status: "aberto",
          dataHora: new Date().toISOString(),
        });

        Alert.alert(
          "Leitura atualizada",
          "Leitura em atenção. Um alerta foi gerado."
        );
      } else if (classificacao === "critica") {
        await cadastrarAlerta({
          titulo: `${sensor.tipo}`,
          descricao: `O ${sensor.nome} registrou ${novoValor} ${sensor.unidadeMedida}. O valor ultrapassou o limite crítico (${sensor.limiteCritico} ${sensor.unidadeMedida}).`,
          nivel: "critico",
          status: "aberto",
          dataHora: new Date().toISOString(),
        });

        Alert.alert( "Situação crítica");
      } else {
        Alert.alert("Leitura atualizada", "Leitura dentro do nível normal.");
      }

      setLeiturasEditadas((valorAtual) => ({
        ...valorAtual,
        [sensor.id]: "",
      }));

      await carregarSensores();
    } catch {
      Alert.alert("Erro", "Não foi possível atualizar a leitura do sensor.");
    }
  }

  useFocusEffect(
    useCallback(() => {
      carregarSensores();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Sensores da Missão</Text>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate("CadastroSensor")}
      >
        <Text style={styles.textoBotao}>Cadastrar novo sensor</Text>
      </TouchableOpacity>

      {carregando && <ActivityIndicator size="large" color="#2563eb" />}

      {erro !== "" && <Text style={styles.erro}>{erro}</Text>}

      {!carregando && sensores.length === 0 && erro === "" && (
        <Text style={styles.texto}>Nenhum sensor cadastrado.</Text>
      )}

      <FlatList
        data={sensores}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nome}>{item.nome}</Text>
            
            <Text style={styles.info}>
              Leitura: {item.ativo ? `${item.valorAtual} ${item.unidadeMedida}` : "N/A"}
            </Text>
            <Text style={styles.info}>
              Status:
              <Text style={item.ativo ? styles.ativoInline : styles.inativoInline}>
                {item.ativo ? " Ativo" : " Inativo"}
              </Text>
            </Text>

            <Text style={styles.info}>
              Situação:
              <Text style={estiloClassificacaoInline(item)}>
                {textoClassificacao(item)}
              </Text>
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Nova leitura"
              value={leiturasEditadas[item.id] || ""}
              onChangeText={(texto) =>
                setLeiturasEditadas((valorAtual) => ({
                  ...valorAtual,
                  [item.id]: texto,
                }))
              }
              keyboardType="numeric"
            />

            <TouchableOpacity
              style={styles.botaoAtualizar}
              onPress={() => atualizarLeitura(item)}
            >
              <Text style={styles.textoBotao}>Atualizar leitura</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.botaoEditar}
              onPress={() => navigation.navigate("EditarSensor", { sensor: item })}
            >
              <Text style={styles.textoBotao}>Editar sensor</Text>
            </TouchableOpacity>            
        </View>
        )}
      />
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
    marginBottom: 16,
  },
  texto: {
    fontSize: 18,
    color: "#475569",
    marginTop: 16,
  },
  botao: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 8,
    marginBottom: 16,
  },
  textoBotao: {
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  nome: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 6,
  },
  info: {
    fontSize: 18,
    color: "#475569",
    marginBottom: 4,
  },
  ativo: {
    marginTop: 8,
    color: "#16a34a",
    fontWeight: "bold",
  },
  inativo: {
    marginTop: 8,
    color: "#dc2626",
    fontWeight: "bold",
  },
  erro: {
    color: "#dc2626",
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 8,
    padding: 10,
    marginTop: 12,
    marginBottom: 10,
    fontSize: 18,
  },
  botaoAtualizar: {
    backgroundColor: "#2563eb",
    padding: 10,
    borderRadius: 8,
    marginTop: 4,
  },
  classificacaoNormal: {
    fontSize: 14,
    color: "#16a34a",
    fontWeight: "bold",
    marginTop: 8,
  },
  classificacaoAtencao: {
    fontSize: 14,
    color: "#ca8a04",
    fontWeight: "bold",
    marginTop: 8,
  },
  classificacaoCritica: {
    fontSize: 14,
    color: "#dc2626",
    fontWeight: "bold",
    marginTop: 8,
  },
  classificacaoSemLimite: {
    fontSize: 14,
    color: "#64748b",
    fontWeight: "bold",
    marginTop: 8,
  },
  botaoEditar: {
    backgroundColor: "#475569",
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
  },
  ativoInline: {
    color: "#16a34a",
    fontWeight: "bold",
  },

  inativoInline: {
    color: "#dc2626",
    fontWeight: "bold",
  },

  classificacaoNormalInline: {
    color: "#16a34a",
    fontWeight: "bold",
  },

  classificacaoAtencaoInline: {
    color: "#ca8a04",
    fontWeight: "bold",
  },

  classificacaoCriticaInline: {
    color: "#dc2626",
    fontWeight: "bold",
  },

  classificacaoSemLimiteInline: {
    color: "#64748b",
    fontWeight: "bold",
  },  
});