import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store'
import Home from './screens/Home';
import Profile from './screens/Profile';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
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
const isLoggedIn = false;

export default function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home"
          screenOptions={{
            title: "rogur.",
            headerStyle: {
              backgroundColor: '#44c4a1',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 25,
              textShadowColor: '#3da69b',
              textShadowOffset: { width: 0, height: 1 },
              textShadowRadius: 1
            },
          }}>
          {isLoggedIn ? (
            <>
              <Stack.Screen
                name="Home"
                component={Home}
                options={({ navigation }) => ({
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
              <Stack.Screen name="Profile" component={Profile} options={{ headerBackTitle: 'Back' }} />
            </>
          ) : (
            <>
              <Stack.Screen name="SignIn" component={SignIn} />
              <Stack.Screen name="SignUp" component={SignUp} options={{ headerBackTitle: 'Back' }} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>

  );
}

