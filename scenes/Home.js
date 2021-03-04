import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TextInput, Button, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Location from 'expo-location';
import Geocoder from 'react-native-geocoding';
import Searchbar from '../components/Searchbar';
import Map from '../components/Map';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const Home = props => {

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
  Geocoder.init(process.env.GOOGLE_MAPS_API_KEY);

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
        {location ?
          <>
            <Text style={styles.title}>rogur.</Text>
            <Searchbar style={styles.search} destAddress={destAddress} setDestination={setDestination} />
            <Map location={location} destination={destination} setDestination={setDestination} />
          </> :
          <FontAwesomeIcon style={styles.loading} icon="spinner" size={32} />
        }

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
    flex: 0.07,
    margin: 10,
    padding: 10,
    textAlign: 'center',
    fontSize: 36,
  },

  loading: {
    alignSelf: 'center',
  }
});

function mapStateToProps(state) {
  return {
    origin: state.origin,
    destination: state.destination,
    user: state.user,
  }
}

export default connect(mapStateToProps)(Home);
