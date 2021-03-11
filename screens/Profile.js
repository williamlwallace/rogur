import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { StyleSheet, View, Text, TextInput, Button, Alert } from "react-native";
import { useForm } from "react-hook-form";
import InputScrollView from "react-native-input-scroll-view";
import { bindActionCreators } from "redux";
import * as UserActions from "../redux/actions/user";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const Profile = (props) => {
  const [editable, setEditable] = useState(false);
  const [buttonText, setButtonText] = useState("Edit");

  const { user } = props;
  const { register, handleSubmit, setValue, errors } = useForm({
    defaultValues: {
      name: user.user.name,
      phone: user.user.phone,
    }
  });

  const onSubmit = (data) => {
    const { actions } = props;
    data.email = user.user.email; // TODO: change this to be /user/:id
    actions.updateUser(data)
      .then(response => {
        handleEdit()
      })
      .catch(error => console.log(error))
  };

  const handleEdit = () => {
    editable ? setButtonText("Edit") : setButtonText("Cancel");
    setEditable(!editable);
  };

  const handleLogout = () => {
    const { actions } = props;
    Alert.alert(
      "",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Log out", onPress: () => actions.logoutUser() },
      ],
      { cancelable: true }
    );
  };

  useEffect(() => {
    register("name", { required: true, maxLength: 80 });
    register("phone", { required: true, maxLength: 11 });
  }, [register]);

  return (
    <View style={styles.container}>
      <InputScrollView
      // contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <View style={styles.image}>
          <FontAwesomeIcon icon="user-circle" color="gray" size={100} />
        </View>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.textInput}
          defaultValue={user.user.name}
          editable={editable}
          onChangeText={(text) => {
            setValue("name", text);
          }}
        />
        {errors.name?.type === "required" && (
          <Text>Your input is required</Text>
        )}

        <Text style={styles.label}>Phone</Text>
        <TextInput
          style={styles.textInput}
          defaultValue={user.user.phone}
          editable={editable}
          keyboardType="phone-pad"
          onChangeText={(text) => {
            setValue("phone", text);
          }}
        />
        <View style={styles.buttons}>
          <Button
            title={buttonText}
            color="#3da69b"
            onPress={() => handleEdit()}
          />
          {editable && (
            <Button
              title="Save"
              color="#3da69b"
              onPress={handleSubmit(onSubmit)}
            />
          )}
        </View>

        <View style={styles.button}>
          <Button
            title="Log out"
            color="gray"
            onPress={() => handleLogout()}
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

  image: {
    alignItems: "center",
    margin: 10,
    padding: 10,
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

  buttons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 10,
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
