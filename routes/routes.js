import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableHighlight } from "react-native-gesture-handler";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { createDrawerNavigator } from '@react-navigation/drawer';

import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import Home from "../screens/Home";
import Profile from "../screens/Profile";

//auth stack, if user is not authenticated
const authStack = createStackNavigator();

//main stack, if user is authenticated
const mainStack = createStackNavigator();

const Routes = (props) => {
  const logged = props.user.isLoggedIn;

  return !logged ? (
    <authStack.Navigator
      screenOptions={{
        title: "rogur.",
        headerStyle: {
          backgroundColor: "#44c4a1",
        },
        headerTintColor: "white",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 25,
          textShadowColor: "#3da69b",
          textShadowOffset: { width: 0, height: 1 },
          textShadowRadius: 1,
        },
      }}
    >
      <authStack.Screen name="SignIn" component={SignIn} />
      <authStack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerBackTitle: "Back" }}
      />
    </authStack.Navigator>
  ) : (
    <mainStack.Navigator
      screenOptions={{
        title: "rogur.",
        headerStyle: {
          backgroundColor: "#44c4a1",
        },
        headerTintColor: "white",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 25,
          textShadowColor: "#3da69b",
          textShadowOffset: { width: 0, height: 1 },
          textShadowRadius: 1,
        },
      }}
    >
      <mainStack.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => ({
          headerRight: () => (
            <TouchableHighlight
              onPress={() => navigation.navigate("Profile")} //TODO: replace this ugly thing
              style={{ padding: 10 }}
            >
              <FontAwesomeIcon icon="user-circle" color="white" size={24} />
            </TouchableHighlight>
          ),
        })}
      />
      <mainStack.Screen
        name="Profile"
        component={Profile}
        options={{ headerBackTitle: "Back" }}
      />
    </mainStack.Navigator>
  );
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps, null)(Routes);
