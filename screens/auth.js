import React, { Component } from 'react';
import {StyleSheet, View, Button, AsyncStorage, ActivityIndicator} from 'react-native';
import {default as Text} from '../components/Text';
import * as GoogleSignIn from 'expo-google-sign-in';
import { Google } from 'expo';

GoogleSignIn.allowInClient();


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
                isOfflineEnabled: false,
                isPromptEnabled: true,
                clientId: 'com.googleusercontent.apps.683024530611-kt7m86bgs5h9a54fcegdjmco6umbojs7'
            });
        } catch ({error}) {
            console.error('Error: ' + error);
        }
        this._syncUserWithStateAsync();
    }

    _syncUserWithStateAsync = async () => {
        const data = await GoogleSignIn.signInSilentlyAsync()
            if(data) {
                const photoURL = await GoogleSignIn.getPhotoAsync(256);
                const userData = await GoogleSignIn.getCurrentUserAsync();
                await this.setState({
                    user: {
                        ...userData.toJSON(),
                        photoURL: photoURL || userData.photoURL,
                    },
                })
                const userAsyncData = await AsyncStorage.setItem('user', 'true');
                await this._syncUserDataAsync()
                this.props.navigation.navigate('App')
            } else {
                this.setState({user: undefined})
            }
    }

    _syncUserDataAsync = async () => {
        await AsyncStorage.multiSet([["uid", this.state.user["uid"]],
        ["userName", this.state.user["displayName"]],
        ["userFirstName", this.state.user["firstName"]],
        ["userLastName", this.state.user["lastName"]],
        ["userEmail", this.state.user["email"]],
        ["userPhoto", JSON.stringify(this.state.user["photoURL"])]])
        // await AsyncStorage.setItem('userName', this.state.user.displayName )
        // await AsyncStorage.setItem('uid', this.state.user.uid )
        // await AsyncStorage.setItem('userPicture', this.state.user.photoURL )
        // await AsyncStorage.setItem('userFirstName', this.state.user.firstName )
        // await AsyncStorage.setItem('userLastName', this.state.user.lastName )
        // await AsyncStorage.setItem('userEmail', this.state.user.email )
    }

    logInComponents = () => {
    
        return (
            <View style={styles.container}>            
                <Text h2>Login</Text>
                <Button onPress={this._signInAsync} title="Sign In With Google">{this.buttonTitle}</Button>
            </View>
        )
    }

    loginLoading = () => {
        return (
            <View style={styles.container}>
                <ActivityIndicator/>
            </View>
        )
    }

    render() {
        const {user} = this.state;
        return (
            this.state.isLoggingIn ? this.loginLoading() : this.logInComponents()
        )
    }

    _signOutAsync = async() => {
        try {
            await GoogleSignIn.signOutAsync();
            //logout successful
        } catch ({error}) {
            console.error('Error in Logging Out: ' + error)
        } finally {
            this.setState({user: undefined})
        }
    }

    _signInAsync = async() => {
        try {
            this.setState({isLoggingIn: true})
            await GoogleSignIn.askForPlayServicesAsync();
            const { type, user } = await GoogleSignIn.signInAsync();
            if (type === 'success') {
              await this._syncUserWithStateAsync();
            //   this.props.navigation.navigate('App')
            }
          } catch ({ message }) {
            console.error('login: Error:' + message);
          }
        }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center"
    }
  });