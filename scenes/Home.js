import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Location from 'expo-location';
import Searchbar from '../components/Searchbar';
import Map from '../components/Map';
import Geocoder from 'react-native-geocoding';

Geocoder.init(process.env.GOOGLE_MAPS_API_KEY);

const Home = (props) => {

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, [location]);

  const [destination, setDestination] = useState(null);
  useEffect(() => {
    Geocoder.from(props.destination)
      .then(response => {
        console.log('request');
        let address = response.results[0].formatted_address;
        setDestination(address);
      })
  })

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>rogur.</Text>
      <Searchbar dest={destination} />
      {/* <Text style={styles.destinationText}>Destination: {destination}</Text> */}
      {location ? <Map location={location} /> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },

  title: {
    flex: 0.2,
    margin: 10,
    padding: 10,
    textAlign: 'center',
    fontSize: 36,
  },

  destinationText: {
    flex: 0.5,
    margin: 10,
    margin: 10,
  }
});

function mapStateToProps(state) {
  return {
    origin: state.origin,
    destination: state.destination
  }
}

export default connect(mapStateToProps)(Home);
