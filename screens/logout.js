import * as GoogleSignIn from 'expo-google-sign-in';
import React, { Component } from 'react';
import {AsyncStorage, StyleSheet, View} from 'react-native'
import { default as Text } from '../components/Text'


export default class logoutScreen extends Component {

    componentDidMount() {
        this._asyncLogOut()
    }
    
    render() {
        return (
            <View style={styles.container}>
            <Text h3>Logging Out</Text>
            </View>
        )
    }

    syncDeletes = ["uid", "userName", "userFirstName", "userLastName", "userEmail", "userPhoto"];

_asyncLogOut = async() => {
    try {
        await GoogleSignIn.signOutAsync();
        await AsyncStorage.removeItem('user');
        this.props.navigation.navigate('Auth')
        // console.log('sign out successful')
    } catch ({error}) {
        console.error('Error in Logging Out: ' + error)
    } finally {
        await AsyncStorage.multiRemove(this.syncDeletes)
    }
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });