import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const Searchbar = () => {
  const [dropOff, setDropOff] = useState();
  return (
    <View style={styles.search}>
      <TextInput
        style={styles.textInput}
        placeholder="Where would you like to go?..."
        onChangeText={text => setDropOff(text)} />
    </View>
  )
}

const styles = StyleSheet.create({
  search: {
    flex: 1,
    margin: 10,
    marginBottom: 0,
  },

  textInput: {
    padding: 10,
    fontSize: 20,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 10,
  },
})

export default Searchbar