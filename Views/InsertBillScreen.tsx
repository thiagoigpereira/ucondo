import { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Bill } from '../Interfaces/Bill';
import TextField from '../components/TextField';
import SelectField from '../components/SelectField';

const InsertBillScreen = ({ navigation }) => {
  const recive = ['Sim','Não'];
  const typeOptions = ['Receita', 'Despesas'];

  const [bill, setBill] = useState<Bill[]>([])

  const insertBill = async() => {
    try {
      await AsyncStorage.setItem("bills", JSON.stringify(bill));
      navigation.navigate("Plano de Contas");
      console.log("Form data saved:", bill);
      
    } catch (error) {
      console.log("Error saving form data:", error);
    }
  };

  return (
    <View style={styles.screen}>
      <TextField
        label={"Código"}
        placeholder={"1.1"}
        onChangeText={(text) => setBill({ ...bill, code: text })}
      />
      <TextField
        label={"Nome"}
        onChangeText={(text) => setBill({ ...bill, name: text })}
      />
      <SelectField
        label={"Tipo"}
        options={typeOptions}
        onValueChange={(value) => setBill({ ...bill, type: value })}
      />
      <SelectField
        label={"Aceita Lançamentos?"}
        options={recive}
        onValueChange={(value) =>
          setBill({ ...bill, acceptLancamentos: value })
        }
      />
      <Button title="Salvar Conta" onPress={insertBill} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    borderRadius: 20,
    backgroundColor: "#E5E5E5",
  },
});

export default InsertBillScreen;