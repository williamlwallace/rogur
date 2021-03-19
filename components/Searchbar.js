import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const Searchbar = (props) => {

  const { destAddress, setDestination } = props;
  const ref = useRef();

  useEffect(() => {
    destAddress ? ref.current?.setAddressText(destAddress) : null
  }, [destAddress])

  return (
    <View style={styles.inputView}>
      <GooglePlacesAutocomplete
        ref={ref}
        placeholder="Where would you like to go?..."
        fetchDetails={true}
        returnKeyType={"go"}
        onPress={(data, details = null) => {
          const coords = {
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng
          }
          setDestination(coords);
        }}
        query={{
          key: process.env.GOOGLE_MAPS_API_KEY,
          language: 'en',
          components: 'country:nz',
        }} />
    </View>
  )
}

const styles = StyleSheet.create({
  inputView: {
    position: 'absolute',
    backgroundColor: 'white',
    zIndex: 1000,
    top: 20,
    left: 10,
    right: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 5,
    borderRadius: 5
  },
  
})

// function mapStateToProps(state) {
//   return {
//   }
// }

// function mapDispatchToProps(dispatch) {
//   return {
//   }
// }

export default Searchbar