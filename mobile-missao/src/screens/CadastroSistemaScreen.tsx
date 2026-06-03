import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { RootStackParamList } from "../navigation/AppNavigator";
import { cadastrarSistema } from "../services";
import { StatusSistema } from "../types";

type CadastroSistemaScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "CadastroSistema"
>;

export function CadastroSistemaScreen({
  navigation,
}: CadastroSistemaScreenProps) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [status, setStatus] = useState<StatusSistema>("operacional");
  const [ativo, setAtivo] = useState(true);
  const [salvando, setSalvando] = useState(false);

  async function salvarSistema() {
    if (!nome || !descricao) {
      Alert.alert("Atenção", "Preencha todos os campos.");
      return;
    }

    try {
      setSalvando(true);

      await cadastrarSistema({
        nome,
        descricao,
        status,
        ativo,
      });

      Alert.alert("Sucesso", "Sistema cadastrado com sucesso.");

      setNome("");
      setDescricao("");
      setStatus("operacional");
      setAtivo(true);

      navigation.navigate("Sistemas");
    } catch {
      Alert.alert("Erro", "Não foi possível cadastrar o sistema.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastrar Sistema</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do sistema"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
      />

      <Text style={styles.label}>Status inicial</Text>

      <View style={styles.statusContainer}>
        <TouchableOpacity
          style={
            status === "operacional"
              ? styles.statusSelecionado
              : styles.statusBotao
          }
          onPress={() => {
            setStatus("operacional");
            setAtivo(true);
          }}
        >
          <Text style={styles.statusTexto}>Operacional</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={
            status === "atencao"
              ? styles.statusSelecionado
              : styles.statusBotao
          }
          onPress={() => {
            setStatus("atencao");
            setAtivo(true);
          }}
        >
          <Text style={styles.statusTexto}>Atenção</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={
            status === "critico"
              ? styles.statusSelecionado
              : styles.statusBotao
          }
          onPress={() => {
            setStatus("critico");
            setAtivo(true);
          }}
        >
          <Text style={styles.statusTexto}>Crítico</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={
            status === "inativo"
              ? styles.statusSelecionado
              : styles.statusBotao
          }
          onPress={() => {
            setStatus("inativo");
            setAtivo(false);
          }}
        >
          <Text style={styles.statusTexto}>Inativo</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Sistema ativo</Text>
        <Switch value={ativo} onValueChange={setAtivo} />
      </View>

      <TouchableOpacity
        style={styles.botao}
        onPress={salvarSistema}
        disabled={salvando}
      >
        <Text style={styles.textoBotao}>
          {salvando ? "Salvando..." : "Salvar Sistema"}
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
  label: {
    fontSize: 16,
    color: "#0f172a",
    fontWeight: "bold",
    marginBottom: 8,
  },
  statusContainer: {
    gap: 8,
    marginBottom: 20,
  },
  statusBotao: {
    backgroundColor: "#64748b",
    padding: 12,
    borderRadius: 8,
  },
  statusSelecionado: {
    backgroundColor: "#2563eb",
    padding: 12,
    borderRadius: 8,
  },
  statusTexto: {
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
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