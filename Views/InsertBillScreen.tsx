import { useState, useEffect } from "react";
import { View, Button, StyleSheet, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Bill } from "../Interfaces/Bill";
import TextField from "../components/TextField";
import SelectField from "../components/SelectField";

const InsertBillScreen = ({ navigation }) => {
  const recive = ["Sim", "Não"];
  const typeOptions = ["Receita", "Despesas"];

  const [bills, setBills] = useState([]);
  const [bill, setBill] = useState({});

  useEffect(() => {
    updateBills();
  }, []);

  const insertBill = async () => {
    try {
      const updatedBillData = [...bills, bill];
      await AsyncStorage.setItem("bills", JSON.stringify(updatedBillData));
      console.log("TESTE DE LOG", bills);
    } catch (error) {
      console.log("Error saving data: ", error);
    }
  };

  const updateBills = async () => {
    try {
      const data = await AsyncStorage.getItem("bills");
      if (data !== null) {
        setBills(JSON.parse(data));
      }
    } catch (error) {
      console.log("Error upadating data: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          style={styles.textInput}
          onChangeText={(codeText) => setBill({ ...bill, code: codeText })}
          placeholder="CÃ³digo"
        />
        <TextInput
          style={styles.textInput}
          onChangeText={(nameText) => setBill({ ...bill, name: nameText })}
          placeholder="Nome"
        />
        <Button title="Salvar" onPress={() => insertBill()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 50,
  },
  textInput: {
    marginVertical: 10,
    backgroundColor: "#333",
    color: "white",
  },
});

export default InsertBillScreen;
