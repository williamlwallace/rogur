import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './redux/reducers';
import Home from './scenes/Home';

const store = createStore(reducer);

export default function App() {

  return (
    <Provider store={store}>
      <Home />
    </Provider>
    
  );
}

