import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { useForm } from 'react-hook-form';
import InputScrollView from 'react-native-input-scroll-view';
import { bindActionCreators } from 'redux';
import * as UserActions from '../redux/actions/user'

const Profile = ({ navigation }, props) => {

  const [editable, setEditable] = useState(true);
  const [buttonText, setButtonText] = useState('Save');

  const { user } = props;
  const { register, handleSubmit, setValue, errors } = useForm();
  const onSubmit = data => {
    const { actions } = props;
    actions.createUser(data);
    setEditable(false);
    setButtonText('Edit')
  }

  useEffect(() => {
    register('firstName', { required: true, maxLength: 80 });
    register('lastName', { required: true, maxLength: 80 });
    register('phone', { required: true, maxLength: 11 });
  }, [register]);

  return (
    <View style={styles.container}>
      <InputScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        <Text style={styles.label}>First name</Text>
        <TextInput style={styles.input} editable={editable} onChangeText={text => {
          setValue('firstName', text)
        }} />
        {errors.firstName?.type === "required" && <Text>Your input is required</Text>}
        <Text style={styles.label}>Last name</Text>
        <TextInput style={styles.input} editable={editable} onChangeText={text => {
          setValue('lastName', text)
        }} />

        <Text style={styles.label}>Phone</Text>
        <TextInput style={styles.input} editable={editable} keyboardType="phone-pad" onChangeText={text => {
          setValue('phone', text)
        }} />
        <View style={styles.button}>
          <Button
            title={buttonText}
            style={styles.buttonText}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </InputScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },

  label: {
    fontSize: 15,
    padding: 10,
    margin: 10,
    color: 'grey'
  },

  input: {
    padding: 10,
    margin: 10,
    borderRadius: 10,
    backgroundColor: 'lightgrey',
  },

  button: {
    padding: 10,
    margin: 10,
  },

})

function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...UserActions }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)