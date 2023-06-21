import { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View, TextInput, Button } from "react-native";
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";

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
      navigation.navigate('Plano de contas')
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
        setBills(JSON.parse(data));
      }
    } catch (error) {
      console.log("Error upadating data: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => insertBill()}>
        <Icon name="check" size={20} color="white" />
      </TouchableOpacity>
      <View style={styles.form}>
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
        <Picker
          style={styles.textInput}
          selectedValue={bill.type}
          onValueChange={(type) => setBill({ ...bill, type: type })}
        >
          <Picker.Item label="Receitas" value="receitas" />
          <Picker.Item label="Despesas" value="despesas" />
        </Picker>
        <Picker
          style={styles.textInput}
          selectedValue={bill.accept}
          onValueChange={(accept) => setBill({ ...bill, accept: accept })}
        >
          <Picker.Item label="Sim" value="sim" />
          <Picker.Item label="Não" value="nao" />
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 50,
    backgroundColor: "#622490",
  },
  form: {
    backgroundColor: "#F0EDF5",
    borderRadius: 10,
  },
  textInput: {
    marginVertical: 10,
    backgroundColor: "#fff",
    color: "#777",
    margin: 10,
    borderRadius: 10,
    padding: 10,
  },
});


export default InsertBills;