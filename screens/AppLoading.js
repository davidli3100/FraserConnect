import React from "react";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import MainTabNavigator from "../navigation/MainTabNavigator";
import RootNavigator from "../navigation/RootNavigator";
import { AsyncStorage } from "react-native";

export default class AppLoadingScreen extends React.Component {
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
      return this.state.user ? <MainTabNavigator /> : <RootNavigator />;
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        // ...Icon.Ionicons.font,
        "Rubik-Black": require("../assets/fonts/Rubik-Black.ttf"),
        "Rubik-BlackItalic": require("../assets/fonts/Rubik-BlackItalic.ttf"),
        "Rubik-Bold": require("../assets/fonts/Rubik-Bold.ttf"),
        "Rubik-BoldItalic": require("../assets/fonts/Rubik-BoldItalic.ttf"),
        "Rubik-Italic": require("../assets/fonts/Rubik-Italic.ttf"),
        "Rubik-Light": require("../assets/fonts/Rubik-Light.ttf"),
        "Rubik-LightItalic": require("../assets/fonts/Rubik-LightItalic.ttf"),
        "Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"),
        "Rubik-MediumItalic": require("../assets/fonts/Rubik-MediumItalic.ttf"),
        "Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf")
      }),
      this.setState({ user: await JSON.parse(AsyncStorage.getItem("user")) })
    ]);
  };

  _handleLoadingError = error => {
    //handle error reporting later!
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}
