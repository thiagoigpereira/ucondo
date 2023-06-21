import { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";


const ListView =({navigation})=> {
  const [bills, setBills] = useState([])
  const [searchText, setSearchText] = useState("");

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
      <TouchableOpacity onPress={() => navigation.navigate('Inserir Conta')}>
        <Icon name="plus" size={20} color="white" />
      </TouchableOpacity>
      <TextInput
        style={styles.textInput}
        placeholder="Pesquisar conta"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />
      <ScrollView style={styles.listView}>
        <Text style={styles.pageTitle}>Listagem</Text>
        {bills.map((item, index) => (
          <View key={index} style={styles.itemList}>
            <Text>
              {item.code} - {item.name}
            </Text>
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
  pageTitle: {
    fontSize: 20
  },
  listView: {
    backgroundColor: "#F0EDF5",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20
  },
  itemList: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    marginBotton: 10,
  },
  textInput: {
    marginVertical: 10,
    backgroundColor: "#fff",
    color: "#777",
    margin: 10,
    borderRadius: 40,
    padding: 10,
  },
});

export default ListView;