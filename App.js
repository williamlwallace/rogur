import React from 'react';
import { Provider } from 'react-redux';
import { Dimensions, Button } from 'react-native';
import store from './redux/store'
import Home from './scenes/Home';
import Profile from './scenes/Profile';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSpinner, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableHighlight } from 'react-native-gesture-handler';

library.add(
  faSpinner,
  faUserCircle);

const Stack = createStackNavigator();

export default function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={({ navigation }) => ({
              title: "rogur.",
              headerStyle: {
                backgroundColor: '#72e8a1',
              },
              headerTintColor: 'white',
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 25,
                textShadowColor: 'black',
                textShadowOffset: { width: 0, height: 1 },
                textShadowRadius: 1
              },
              headerRight: () => (
                <TouchableHighlight
                  onPress={() => navigation.navigate('Profile')}    //TODO: replace this ugly thing
                  style={{ padding: 10 }}
                ><FontAwesomeIcon
                    icon='user-circle'
                    color='white'
                    size={24} />
                </TouchableHighlight>
              ),
            })} />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{
              headerBackTitle: 'Back'
            }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>

  );
}

