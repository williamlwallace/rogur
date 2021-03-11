import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useForm } from "react-hook-form";
import { useNavigation } from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Keyboard,
  Image,
} from "react-native";
import InputScrollView from "react-native-input-scroll-view";
import * as UserActions from "../redux/actions/user";

const SignIn = (props) => {
  const navigation = useNavigation();
  const refInput = useRef();

  const { register, handleSubmit, setValue, errors } = useForm();
  useEffect(() => {
    register("email", { required: true, maxLength: 80 });
    register("password", { required: true, maxLength: 80 });
  }, [register]);

  handleSignIn = (data) => {
    const { actions } = props;
    actions.loginUser(data);
  };

  return (
    <View style={styles.view}>
      <InputScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <Image style={styles.image} source={require("../assets/car.png")} />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          returnKeyType="next"
          onSubmitEditing={() => refInput.current.focus()}
          blurOnSubmit={false}
          onChangeText={(text) => {
            setValue("email", text);
          }}
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          returnKeyType="done"
          secureTextEntry
          onSubmitEditing={handleSubmit(handleSignIn)}
          ref={refInput}
          onChangeText={(text) => {
            setValue("password", text);
          }}
        />
        <View style={styles.button}>
          <Button
            title="Sign in"
            color="#3da69b"
            onPress={handleSubmit(handleSignIn)}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Don't have an account? </Text>
          <Text
            style={styles.textLink}
            onPress={() => navigation.navigate("SignUp")}
          >
            Sign up here.{" "}
          </Text>
        </View>
      </InputScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    margin: 10,
    justifyContent: "center",
  },

  image: {
    position: "absolute",
    alignSelf: "center",
    top: -16,
    right: 40,
  },

  label: {
    marginLeft: 10,
    marginTop: 10,
    color: "gray",
  },

  textInput: {
    padding: 10,
    margin: 10,
    fontSize: 18,
    borderRadius: 5,
    backgroundColor: "white",
  },

  row: {
    flex: 1,
    flexDirection: "row",
    margin: 10,
    alignSelf: "center",
  },

  text: {
    color: "gray",
  },

  textLink: {
    color: "#3da69b",
  },

  button: {
    margin: 10,
  },
});

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...UserActions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
