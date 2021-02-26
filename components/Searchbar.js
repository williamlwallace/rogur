import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators as actions } from '../redux/actions';
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
        style={styles.input}
        placeholder="Where would you like to go?..."
        fetchDetails={true}
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
    backgroundColor: 'rgba(0,0,0,0)',
    top: 80,
    zIndex: 1000,
    left: 10,
    right: 10,
  },
})

// function mapStateToProps(state) {
//   return {
//     origin: state.origin,
//     destination: state.destination
//   }
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     setDestination: bindActionCreators(actions.setDestination, dispatch)
//   }
// }

export default Searchbar