import { useState, useEffect } from 'react';
import { Button, View, Text, ScrollView, StyleSheet  } from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";
import FlatListItem from '../components/FlatListItem';

const ListView =({navigation})=> {
  const [bills, setBills] = useState([])
  useEffect(() => {
    navigation.addListener("focus", () => loadBills());
  }, []);

  const loadBills = async () => {
    try {
      const storagedBills = await AsyncStorage.getItem('bills');
      if(storagedBills !== null) {
        const parsedBills = JSON.parse(storagedBills);
        setBills(parsedBills)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      <Button
        title="INSERIR CONTA"
        onPress={() => navigation.navigate("Inserir Conta")}
      />
      <ScrollView style={styles.itemList}>
        {bills.map((item, index) => (
          <View key={index}>
            <Text>{item.code} - {item.name}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#622490",
  },
  itemList: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    margin: 10,
  },
});

export default ListView;