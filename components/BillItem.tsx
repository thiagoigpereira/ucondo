import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const BillItem = (bill: any) => {
  return(
    <View style={styles.item}>
      <Text>Item List</Text>
      <View style={styles.delete}>
        <TouchableOpacity style={styles.square}></TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  delete: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  square: {
    backgroundColor: "blue",
    width: 20,
    height: 20,
  },
});

export default BillItem;