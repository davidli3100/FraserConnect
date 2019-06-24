import React, { Component } from 'react';
import { StyleSheet, View, ListRenderItemInfo, FlatList, Button, AsyncStorage } from 'react-native';
import FeedCard from '../components/feed/CustomCard';
import { default as Text } from '../components/Text'
import * as GoogleSignIn from 'expo-google-sign-in';

export default class FeedScreen extends Component {
    constructor(props) {
      super(props)
      this.state={}
    }

    componentDidMount() {
      AsyncStorage.getItem('user').then((res)=> {
        data = JSON.parse(res)
        this.setState({
          user: data
        }, console.log(this.state.user[0]))
      })
    }

    render() {
      return (
        <View style={styles.container}>
            <Text h1>Feed</Text>
            <Button onPress={this._signOutAsync} title="Sign Out">
              Sign Out
            </Button>
            <Text>
                {JSON.stringify(this.state.user)}
            </Text>
        </View>
      );
    }

    _signOutAsync = async() => {
      try {
          await GoogleSignIn.signOutAsync();
          await AsyncStorage.removeItem('user');
          console.log('sign out successful')
      } catch ({error}) {
          console.error('Error in Logging Out: ' + error)
      } finally {
          this.setState({user: undefined})
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
  