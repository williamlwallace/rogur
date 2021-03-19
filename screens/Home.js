import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator
} from "react-native";
import { StatusBar } from "expo-status-bar";
import * as Location from "expo-location";
import Geocoder from "react-native-geocoding";
import Searchbar from "../components/Searchbar";
import Map from "../components/Map";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import * as RideActions from "../redux/actions/ride";

const Home = (props) => {
  const [location, setLocation] = useState(null);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      console.log("---Location request---");
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
        .then((response) => {
          let address = response.results[0].formatted_address;
          console.log("---Geocoder request---");
          setDestAddress(address);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [destination]);

  const [rideMetrics, setRideMetrics] = useState(null);

  handleRequestRide = () => {
    const { actions, user } = props;
    const values = {
      origin: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
      destination: destination,
      userId: user.user._id,
    };
    actions.createRide(values);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <StatusBar style="light" />
        {location ? (
          <>
            <Searchbar
              destAddress={destAddress}
              setDestination={setDestination}
            />
            <Map
              location={location}
              destination={destination}
              setDestination={setDestination}
              setRideMetrics={setRideMetrics}
            />
            {rideMetrics ? (
              <View style={styles.rideView}>
                <Text style={styles.rideViewText}>
                  Distance: {rideMetrics.distance.toFixed(2)} km Duration:{" "}
                  {Math.round(rideMetrics.duration)} mins
                </Text>
                <View style={styles.button}>
                  <Button
                    title="Request ride"
                    color="#3da69b"
                    onPress={() => handleRequestRide()}
                  />
                </View>
                
              </View>
            ) : null}
          </>
        ) : (
          <ActivityIndicator />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
  },

  loading: {
    alignSelf: "center",
  },

  rideView: {
    flex: 0.15,
    padding: 10,
    backgroundColor: "#44c4a1",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,  
    elevation: 5
  },

  rideViewText: {
    fontSize: 17,
    color: "white",
    textAlign: "center",
  },

  button: {
    margin: 5,
  },
});

function mapStateToProps(state) {
  return {
    origin: state.origin,
    destination: state.destination,
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...RideActions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
