import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators as actions } from '../redux/actions';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const Map = (props) => {

  const { location, destination, setDestination } = props;
  const latitude = location.coords.latitude;
  const longitude = location.coords.longitude;

  return (
    <MapView
      provider="google"
      style={styles.map}
      initialRegion={{
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      showsUserLocation={true}
      onPress={e => setDestination(e.nativeEvent.coordinate)}>
      {destination ? <>
        <Marker coordinate={destination} />
        <MapViewDirections
          origin={location.coords}
          destination={destination}
          apikey={process.env.GOOGLE_MAPS_API_KEY}
          strokeWidth={3}
          strokeColor="#34d8eb"
          onError={(errorMessage) => console.log(errorMessage)} />
      </> : null
      }
    </MapView>
  )
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
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

export default Map;