import React from "react";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import AppNavigator from "./navigation/AppNavigator";
import { YellowBox } from 'react-native';
import _ from 'lodash';
import { SafeAreaView } from "react-navigation";

//we don't like warnings for useless stuff
YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

export default class App extends React.Component {
  state = {
    isLoadingComplete: false
  };

  render() {
    if (!this.state.isLoadingComplete) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return <AppNavigator />;
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        // ...Icon.Ionicons.font,
        "Poppins-Black": require("./assets/fonts/Poppins-Black.ttf"),
        "Poppins-BlackItalic": require("./assets/fonts/Poppins-BlackItalic.ttf"),
        "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
        "Poppins-BoldItalic": require("./assets/fonts/Poppins-BoldItalic.ttf"),
        "Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
        "Poppins-LightItalic": require("./assets/fonts/Poppins-LightItalic.ttf"),
        "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
        "Poppins-MediumItalic": require("./assets/fonts/Poppins-MediumItalic.ttf"),
        "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
        "Poppins-RegularItalic": require("./assets/fonts/Poppins-RegularItalic.ttf"),
        "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
        "Poppins-SemiBoldItalic": require("./assets/fonts/Poppins-SemiBoldItalic.ttf"),
      })
    ]);
  };

  _handleLoadingError = error => {
    //handle error reporting later!
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}
