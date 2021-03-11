import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Keyboard,
} from "react-native";
import { useForm } from "react-hook-form";
import InputScrollView from "react-native-input-scroll-view";
import * as UserActions from "../redux/actions/user";

const SignUp = (props) => {
  const refInput = useRef();
  const refInput1 = useRef();
  const refInput2 = useRef();
  const refInput3 = useRef();

  const { register, handleSubmit, setValue, errors } = useForm();
  useEffect(() => {
    register("name", { required: true, maxLength: 80 });
    register("phone", { required: true, maxLength: 11 });
    register("email", { required: true, maxLength: 80 });
    register("password", { required: true, maxLength: 80 });
    register("confirmPassword", { required: true, maxLength: 80 });
  }, [register]);

  handleSignUp = (data) => {
    console.log(data);
    const { actions } = props;
    if (data.password !== data.confirmPassword) {
      console.log("Passwords do not match!");
    } else {
      actions.createUser(data);
    }
  };

  return (
    <View style={styles.container}>
      <InputScrollView>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Name"
          returnKeyType="next"
          onSubmitEditing={() => refInput.current.focus()}
          blurOnSubmit={false}
          onChangeText={(text) => setValue("name", text)}
        />
        <Text style={styles.label}>Phone number</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Phone number"
          keyboardType="phone-pad"
          ref={refInput}
          returnKeyType="next"
          onSubmitEditing={() => refInput1.current.focus()}
          blurOnSubmit={false}
          onChangeText={(text) => setValue("phone", text)}
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          keyboardType="email-address"
          ref={refInput1}
          returnKeyType="next"
          autoCapitalize="none"
          onSubmitEditing={() => refInput2.current.focus()}
          blurOnSubmit={false}
          onChangeText={(text) => setValue("email", text)}
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          secureTextEntry
          ref={refInput2}
          returnKeyType="next"
          onSubmitEditing={() => refInput3.current.focus()}
          blurOnSubmit={false}
          onChangeText={(text) => setValue("password", text)}
        />
        <TextInput
          style={styles.textInput}
          autoCorrect={false}
          placeholder="Confirm password"
          secureTextEntry
          ref={refInput3}
          returnKeyType="done"
          onSubmitEditing={handleSubmit(handleSignUp)}
          blurOnSubmit={false}
          onChangeText={(text) => setValue("confirmPassword", text)}
        />
        <View style={styles.button}>
          <Button
            title="Sign up"
            color="#3da69b"
            onPress={handleSubmit(handleSignUp)}
          />
        </View>
      </InputScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    justifyContent: "center",
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
