import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TextInput, Button, Keyboard, TouchableWithoutFeedback} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Location from 'expo-location';
import Searchbar from '../components/Searchbar';
import Map from '../components/Map';
import Geocoder from 'react-native-geocoding';

Geocoder.init(process.env.GOOGLE_MAPS_API_KEY);

const Home = () => {

  const [location, setLocation] = useState(null);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      console.log('---Location request---')
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const [destination, setDestination] = useState(null);
  const [destAddress, setDestAddress] = useState(null);
  useEffect(() => {
    if (destination) {
      Geocoder.from(destination)
        .then(response => {
          let address = response.results[0].formatted_address;
          console.log('---Geocoder request---')
          setDestAddress(address);
        }).catch(error => {
          console.log(error);
        })
    }
  }, [destination])

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>rogur.</Text>
      {/* <Text style={styles.label}>From:</Text> */}
      {/* <Text style={styles.label}>To:</Text> */}
      <Searchbar style={styles.search} destAddress={destAddress} setDestination={setDestination} />
      
      {location ? <Map location={location} destination={destination} setDestination={setDestination} /> : null}
    </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },

  title: {
    flex: 0.1,
    margin: 10,
    padding: 10,
    textAlign: 'center',
    fontSize: 36,
  },

  // label: {
  //   flex: 1,
  //   margin: 10,
  //   padding: 10,
  //   color: 'grey'
  // },

});

function mapStateToProps(state) {
  return {
    origin: state.origin,
    destination: state.destination
  }
}

export default connect(mapStateToProps)(Home);
