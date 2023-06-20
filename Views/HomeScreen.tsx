import { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import BillItem from '../components/BillItem';
import { Bill } from "../Interfaces/Bill";

const HomeScreen = ({navigation}) => {
  const [bills, setBills] = useState<Bill[]>([])
  useEffect(() => {
    loadBills();
    navigation.addListener('focus', () => loadBills);
    
  },[])

  const loadBills = async() => {
    try {
      const storagedBills = await AsyncStorage.getItem('bills');
      if(storagedBills) {
        const parsedBills:Bill[] = JSON.parse(storagedBills);
        setBills(parsedBills);
        console.log("BILLS HOME => ", bills);
      } else {
        console.log('Lista está vazia')
      }
    } catch(error) {
      console.log('Error fetching the list', error);
    }
  }

  return (
    <View style={styles.container}>
      <Text>Listagem</Text>
      <View style={styles.taskWrapper}>
        
      </View>
      <Button
        title="INSERIR CONTA"
        onPress={() => navigation.navigate("Inserir Conta")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  taskWrapper: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
});

export default HomeScreen;