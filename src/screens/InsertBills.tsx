import { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from "@react-native-async-storage/async-storage";

import Bill from '../types/Bills';

const InsertBills = ({ navigation }) => {
  const [bills, setBills] = useState([]);
  const [bill, setBill] = useState({});

  useEffect(() => {
    navigation.addListener("focus", () => updateBills());
  }, []);

  const insertBill = async () => {
    try {
      const updatedBillData = [...bills, bill];
      await AsyncStorage.setItem("bills", JSON.stringify(updatedBillData));
      console.log('BILLS => ', bills)
    } catch (error) {
      console.log("Error saving data: ", error);
    }
  };

  const generateChildAccountCode = (parentCode: string): string => {
    const maxChildCode = bills
      .filter((code) => code.startsWith(parentCode + "."))
      .reduce((max, code) => {
        const childCode = code.substring(parentCode.length + 1);
        const childNumber = parseInt(childCode, 10);
        return childNumber > max ? childNumber : max;
      }, 0);

    return `${parentCode}.${maxChildCode + 1}`;
  };

  const updateBills = async () => {
    try {
      const data = await AsyncStorage.getItem("bills");
      if (data !== null) {
        setBills(JSON.parse(generateChildAccountCode(data)));
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
          placeholder="Código"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.textInput}
          onChangeText={(nameText) => setBill({ ...bill, name: nameText })}
          placeholder="Nome"
        />
        <Picker selectedValue={bill.type} onValueChange={(type) => setBill({...bill, type: type})}>
          <Picker.Item label="Receitas" value="receitas" />
          <Picker.Item label="Despesas" value="despesas" />
        </Picker>
        <Picker selectedValue={bill.accept} onValueChange={(accept) => setBill({...bill, accept: accept})}>
          <Picker.Item label="Sim" value="sim" />
          <Picker.Item label="Não" value="nao" />
        </Picker>
        <Button title="Salvar" onPress={() => insertBill()} />
      </View>
    </View>
  );
}

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


export default InsertBills;