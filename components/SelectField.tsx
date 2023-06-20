import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native'
import { Picker } from "@react-native-picker/picker";
const SelectField = ({label, options, ...inputProps}) => {
  const [selectedOptions, setSelectedOptions] = useState('')
  return(
    <View>
      <Text style={styles.label}>{label}</Text>
      <Picker
        style={styles.field}
        selectedValue={selectedOptions}
        onValueChange={(itemValue) => setSelectedOptions(itemValue)}
      >
        {options.map((option: string, index: number) => (
          <Picker.Item key={index} label={option} value={option.toLowerCase()} />
        ))}
      </Picker>
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    color: "#666666",
    fontWeight: "bold",
    fontSize: 15,
  },
  field: {
    backgroundColor: "white",
    borderRadius: 10,
    marginVertical: 10,
    paddingLeft: 10,
  },
});

export default SelectField;