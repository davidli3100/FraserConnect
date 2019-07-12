import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Button,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import { default as Text } from "../components/Text";
import * as GoogleSignIn from "expo-google-sign-in";
import * as firebase from "firebase";
import {
  apiKey,
  appId,
  messagingSenderId,
  storageBucket,
  authDomain,
  databaseURL,
  projectId
} from "../constants/firebaseConfig";

GoogleSignIn.allowInClient();

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  databaseURL: databaseURL,
  storageBucket: storageBucket,
  appId: appId,
  messagingSenderId: messagingSenderId,
  projectId: projectId
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggingIn: false
    };
  }

  componentDidMount() {
    this._configureAsync();
  }

  _configureAsync = async () => {
    try {
      await GoogleSignIn.initAsync({
        scopes: ["profile", "openid"],
        isOfflineEnabled: false,
        isPromptEnabled: false,
        clientId:
          "com.googleusercontent.apps.855800292598-okhc8gk405slk750gukupgf12u82o5qi"
      });
    } catch ({ error }) {
      console.error("Error: " + error);
    }
    this._syncUserWithStateAsync();
  };

  _syncUserWithStateAsync = async () => {
    const data = await GoogleSignIn.signInSilentlyAsync();
    if (data) {
      this.setState({ isLoggingIn: true });
      const photoURL = await GoogleSignIn.getPhotoAsync(256);
      const userData = await GoogleSignIn.getCurrentUserAsync();
      await this.setState({
        user: {
          ...userData.toJSON(),
          photoURL: photoURL || userData.photoURL
        }
      });
      const userAsyncData = await AsyncStorage.setItem("user", "true");
      // console.log(userData)
      await this._syncUserDataAsync();
      this.props.navigation.navigate("App");
    } else {
      this.setState({ user: undefined });
    }
  };

  _syncUserDataAsync = async () => {
    await AsyncStorage.multiSet([
      ["uid", this.state.user["uid"]],
      ["userName", this.state.user["displayName"]],
      ["userFirstName", this.state.user["firstName"]],
      ["userLastName", this.state.user["lastName"]],
      ["userEmail", this.state.user["email"]],
      ["userPhoto", JSON.stringify(this.state.user["photoURL"])]
    ]);
  };

  logInComponents = () => {
    return (
      <View style={styles.container}>
        <Text h2>Login</Text>
        <Button onPress={this._signInAsync} title="Sign In With Google">
          {this.buttonTitle}
        </Button>
      </View>
    );
  };

  loginLoading = () => {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  };

  render() {
    const { user } = this.state;
    return this.state.isLoggingIn
      ? this.loginLoading()
      : this.logInComponents();
  }

  _signOutAsync = async () => {
    try {
      await GoogleSignIn.signOutAsync();
      //logout successful
    } catch ({ error }) {
      console.error("Error in Logging Out: " + error);
    } finally {
      this.setState({ user: undefined });
    }
  };

  _signInAsync = async () => {
    try {
      this.setState({ isLoggingIn: true });
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      if (type === "success") {
        console.log(user.auth);
        //build firebase auth
        credential = firebase.auth.GoogleAuthProvider.credential(
          user.auth["idToken"],
          user.auth["accessToken"]
        );
        //build user
        firebase
          .auth()
          .signInWithCredential(credential)
          .then(user => {
            console.log(user);
          })
          .catch(error => {
            console.log(error);
          });

        await this._syncUserWithStateAsync();
      } else {
        this.setState({ isLoggingIn: false })
      }
    } catch ({ message }) {
      this.setState({ isLoggingIn: false })
      console.error("login: Error:" + message);
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
