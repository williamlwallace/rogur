import React from 'react';
import { Provider } from 'react-redux';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import store from './redux/store'
import Home from './scenes/Home';
import Profile from './scenes/Profile';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

library.add(faSpinner);


const HomeRoute = () => <Home />;
const ProfileRoute = () => <Profile />;

const initialLayout = { width: Dimensions.get('window').width };

export default function App() {

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home' },
    { key: 'profile', title: 'Profile' },
  ]);

  const renderScene = SceneMap({
    home: HomeRoute,
    profile: ProfileRoute,
  });

  return (
    <Provider store={store}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        tabBarPosition='bottom'
      />
    </Provider>
    
  );
}

