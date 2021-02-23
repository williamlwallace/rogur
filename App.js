import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput} from 'react-native';
import Searchbar from './Searchbar';
import Map from './Map';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>rogur.</Text>
      <Searchbar/>
      <Map/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },

  title: {
    flex: 0.5,
    margin: 10,
    padding: 10,
    textAlign: 'center',
    fontSize: 40,
  }
});
