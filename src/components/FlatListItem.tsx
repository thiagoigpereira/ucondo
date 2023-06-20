import { View, Text } from 'react-native';

const FlatListItem = (data: any) => {
  return (
    <View>
      <Text>{data.code}</Text>
      <Text>{data.name}</Text>
    </View>
  );
}

export default FlatListItem;