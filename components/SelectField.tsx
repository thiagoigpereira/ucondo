import { useState } from 'react';
import { View, Text } from 'react-native'
import { Picker } from "@react-native-picker/picker";
const SelectField = ({label, options, ...inputProps}) => {
  const [selectedOptions, setSelectedOptions] = useState('')
  return(
    <View>
      <Text>{label}</Text>
      <Picker
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

export default SelectField;