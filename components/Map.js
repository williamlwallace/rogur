import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet } from 'react-native';
import MapView, { Marker }  from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { actionCreators as actions } from '../redux/actions';

const Map = (props) => {

  let latitude = props.location.coords.latitude;
  let longitude = props.location.coords.longitude;
  const { destination, setDestination } = props;

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
          <Marker coordinate={destination}/>
          <MapViewDirections
            origin={props.location.coords}
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
    flex: 5,
    margin: 10,
    marginTop: 0,
    padding: 10,
  },
})

function mapStateToProps(state) {
  return {
    origin: state.origin,
    destination: state.destination
  }
}
function mapDispatchToProps(dispatch) {
  return {
    setDestination: bindActionCreators(actions.setDestination, dispatch) 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);