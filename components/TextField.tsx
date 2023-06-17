import { View, Text, TextInput, StyleSheet } from 'react-native';

const TextField = ({label, ...inputProps}) => {
  return(
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.textField} {...inputProps} />
    </View>
  ) 
}
const styles = StyleSheet.create({
  label: {
    color: "#666666",
    fontWeight: "bold",
    fontSize: 15
  },
  textField: {
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 5,
    paddingLeft: 10
  },
});
export default TextField;