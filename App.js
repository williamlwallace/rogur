import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import Searchbar from './Searchbar';
import Map from './Map';
import Geolocation from '@react-native-community/geolocation';

export default function App() {

  // const retrieveLocation = () => {
  //   Geolocation.getCurrentPosition(info => console.log(info));
  // }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>rogur.</Text>
      <Searchbar />
      {/* <Button title="Get Location" style={styles.button} onPress={() => retrieveLocation()} /> */}
      <Map />
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
  },

  button: {
    flex: 1,
    margin: 10,
    padding: 10,
  }
});
