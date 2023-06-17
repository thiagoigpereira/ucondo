import { useState, useEffect } from 'react';
import { View, Text, Button, FlatList } from "react-native";
import { Bill
 } from "../Interfaces/Bill";
import AsyncStorage from '@react-native-async-storage/async-storage';
const HomeScreen = ({navigation}) => {
  const [bills, setBills] = useState<Bill[]>([])
  useEffect(() => {
    loadBills();
  },[])

  const loadBills = async() => {
    try {
      const storagedBills = await AsyncStorage.getItem('bills');
      if(storagedBills) {
        const parsedBills:Bill[] = JSON.parse(storagedBills);
        setBills(parsedBills);
      } else {
        
      }
    } catch(error) {
      console.log('Error fetching the list', error);
    }
  }

  const renderBills = ({bill}: {bill: Bill}) => {
    <View>
      <Text>{bill.code}</Text>
      <Text>{bill.name}</Text>
    </View>
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <FlatList
        data={bills}
        renderItem={renderBills}
        keyExtractor={(item, index) => index.toString()}
      />
      <Button
        title="TESTE"
        onPress={() => navigation.navigate("Inserir Conta")}
      />
    </View>
  );
}

export default HomeScreen;