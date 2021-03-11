import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const Map = props => {

  const { location, destination, setDestination, setRideMetrics } = props;
  const latitude = location.coords.latitude;
  const longitude = location.coords.longitude;

  const mapView = React.createRef();
  const animateMap = (destination) => {
    mapView.current.fitToCoordinates(
      [location.coords, destination],
      {
        edgePadding: {
          top: 150,
          right: 50,
          bottom: 150,
          left: 50
        }
      }
    )
  }

  const handleMapPress = (event) => {
    setDestination(event.nativeEvent.coordinate);
    animateMap(event.nativeEvent.coordinate);
  }

  return (
    <MapView
      provider='google'
      ref={mapView}
      style={styles.map}
      initialRegion={{
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0200,
        longitudeDelta: 0.0100,
      }}
      showsUserLocation={true}
      onPress={e => handleMapPress(e)}>
      {destination ? <>
        <Marker coordinate={destination} />
        <MapViewDirections
          origin={location.coords}
          destination={destination}
          apikey={process.env.GOOGLE_MAPS_API_KEY}
          strokeWidth={5}
          strokeColor='#3da69b'
          onReady={(distance, duration) => setRideMetrics(distance, duration)}
          onError={error => console.log(error)} />
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
//   }
// }

// function mapDispatchToProps(dispatch) {
//   return {
//   }
// }

export default Map;