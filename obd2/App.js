//https://reactnative.dev/docs/environment-setup
// npx expo start

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

const obd2 = require('react-native-obd2');
var list = obd2.getBluetoothDeviceNameList()
    .then((nameList) => console.log('Bluetooth device list : ' + JSON.stringify(nameList)))
    .catch((e) => console.log('Get device name error : ' + e));

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!
        {list}
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

