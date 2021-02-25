import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const Searchbar = (props) => {

  const ref = useRef();

  useEffect(() => {
    ref.current?.setAddressText(props.dest)
  })
  return (
    <View style={styles.inputView}>
      <GooglePlacesAutocomplete
        ref={ref}
        style={styles.input}
        placeholder="Where would you like to go?..."
        onPress={(data, details = null) => {
          console.log(data, details);
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
    // bottom: 10,
    zIndex: 1000,
    left: 10,
    right: 10,
  },
})

function mapStateToProps(state) {
  return {
    origin: state.origin,
    destination: state.destination
  }
}

export default connect(mapStateToProps)(Searchbar);