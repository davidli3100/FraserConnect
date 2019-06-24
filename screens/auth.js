import React, { Component } from 'react';
import {StyleSheet, View, Button, AsyncStorage} from 'react-native';
import {default as Text} from '../components/Text';
import * as GoogleSignIn from 'expo-google-sign-in';
import { Google } from 'expo';

GoogleSignIn.allowInClient();


export default class LoginScreen extends Component {

    
    static navigationOptions = {
        title: 'Log In With Google'
    }

    constructor(props) {
        super(props);
        this.state = {};

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
        if (await GoogleSignIn.signInSilentlyAsync()) {
            const photoURL = await GoogleSignIn.getPhotoAsync(256);
            const userData = await GoogleSignIn.getCurrentUserAsync();
            if (userData) {
                const userAsyncData = await AsyncStorage.setItem('user', JSON.stringify(userData));
                this.props.navigation.navigate('App')
            }
        } else {
            this.setState({user: undefined})
        }
    }

    render() {
        const {user} = this.state;
        return (
        <View>
            <Text h2>Login</Text>
            <Button onPress={this._signInAsync} title="Sign In With Google">{this.buttonTitle}</Button>
            <Text h5>Signed In</Text>
        </View>
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
            await GoogleSignIn.askForPlayServicesAsync();
            const { type, user } = await GoogleSignIn.signInAsync();
            // console.log(user)
            // const userAsyncData = await AsyncStorage.setItem('user', JSON.stringify(user));
            // console.log(await AsyncStorage.getItem('user'))
            if (type === 'success') {
              this._syncUserWithStateAsync();
            //   this.props.navigation.navigate('App')
            }
          } catch ({ message }) {
            console.error('login: Error:' + message);
          }
        }

}