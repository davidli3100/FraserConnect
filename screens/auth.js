import React, { Component } from "react";
import {
  StyleSheet,
  View,
  AsyncStorage,
  ActivityIndicator,
  Image,
  Platform,
  StatusBar
} from "react-native";
import {Button} from 'react-native-elements'
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
import { heightPercentageToDP, widthPercentageToDP } from "../constants/Normalize";

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

  static navigationOptions = {
    header: null
  }

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
      this.setState({isLoggingIn: false})
      console.error("Error: " + error);
    }
    this._syncUserWithStateAsync();
  };

  _syncUserWithStateAsync = async (user) => {
    const data = await GoogleSignIn.signInSilentlyAsync();
    if (data) {
      try {
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
            console.log("Firebase error: " + error);
          });        
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
        await this._syncUserDataAsync();
        this.props.navigation.navigate("App");
    } catch(err) {
      this.setState({isLoggingIn: false})
    }
    } else {
      this.setState({isLoggingIn: false})
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
      ["userPicture", this.state.user["photoURL"]]
    ]);
  };

  logInComponents = () => {
    return (
      <View style={styles.container}>
        <Text  style={styles.loginHeader}>Welcome,</Text>
        <Text style={styles.loginSubtitle}>sign in to continue</Text>
        <Image
          style={styles.loginImage}
          resizeMode="contain"
          source={require('../assets/Images/login.png')}
        />
        <Button onPress={this._signInAsync} title="Sign In With Google" titleStyle={styles.loginButtonText} buttonStyle={styles.loginButton}>
            {this.buttonTitle}
        </Button>
        <Text style={styles.creditText}>Made with <Text style={styles.emoji}>{'\u2615'}</Text> by David Li and Jason Huang</Text>
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
        await this._syncUserWithStateAsync(user);
      } else {
        this.setState({ isLoggingIn: false })
      }
    } catch ({ message }) {
      this.setState({ isLoggingIn: false })
      console.error("login: Error: " + message);
    }
  };
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight + heightPercentageToDP('13.5%'),
    flex: 1,
    flexDirection: 'column',
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  loginHeader: {
    width: widthPercentageToDP('75%'),
    lineHeight: heightPercentageToDP('4%'),
    textAlign: "left",
    fontFamily: "Poppins-Medium",
    fontSize: heightPercentageToDP('3.75%')
  },
  loginSubtitle: {
    width: widthPercentageToDP('75%'),
    lineHeight: heightPercentageToDP('4%'),
    textAlign: "left",
    fontFamily: "Poppins-Medium",
    color: '#9aa5b1',
    fontSize: heightPercentageToDP('3.75%')
  },
  loginImage: {
    width: widthPercentageToDP('65%'),
    height: heightPercentageToDP('47.44%')
  },
  loginButton: {
    borderRadius: 7,
    paddingLeft: widthPercentageToDP('8.5%'),
    paddingRight: widthPercentageToDP('8.5%'), 
    paddingTop: heightPercentageToDP('1.5%'),
    paddingBottom: heightPercentageToDP('1.5%'),
    backgroundColor: '#10294c',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#40000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4

  },
  loginButtonText: {
    color: "#e5e5e5",
    fontFamily: "Poppins-SemiBold",
    fontSize: heightPercentageToDP('2.4%')
  },
  creditText: {
    marginTop: 'auto',
    color: "rgba(0, 0, 0, 0.5)",
    fontSize: heightPercentageToDP('1.5%'),
    fontFamily: "Poppins-Regular",
    marginBottom: heightPercentageToDP('0.75%')
  }
});
