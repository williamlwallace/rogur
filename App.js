import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import Routes from "./routes/routes";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSpinner, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { NavigationContainer } from "@react-navigation/native";

library.add(faSpinner, faUserCircle);

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </Provider>
  );
}
