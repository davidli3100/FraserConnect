import React, { Component } from 'react';
import { StyleSheet, View, ListRenderItemInfo, FlatList, Button, AsyncStorage } from 'react-native';
import FeedCard from '../components/feed/CustomCard';
import { default as Text } from '../components/Text'
import * as GoogleSignIn from 'expo-google-sign-in';

export default class FeedScreen extends Component {
    constructor(props) {
      super(props)
      this.state = {
        user: {

        }
      };
    }

    componentDidMount() {
      this._hydrateUserState()
      console.log(this.state)
    }

    render() {
      return (
        <View style={styles.container}>
            <Text h1>Feed</Text>
            <Button onPress={this._asyncLogOut} title="Sign Out">
              Sign Out
            </Button>
            <Text>
                {this.state.user["userName"]}
            </Text>
        </View>
      );
    }

    _hydrateUserState = async () => {
      AsyncStorage.getItem('userName').then((res) => {
        this.setState((prevState, props) => ({
          user: {
            ...prevState.user,
            userName: res
          }
        }))
      })
      AsyncStorage.getItem('userFirstName').then((res) => {
        this.setState((prevState, props) => ({
          user: {
            ...prevState.user,
            userFirstName: res
          }
        }))
      })
      AsyncStorage.getItem('userLastName').then((res) => {
        this.setState((prevState, props) => ({
          user: {
            ...prevState.user,
            userLastName: res
          }
        }))
      })
      AsyncStorage.getItem('uid').then((res) => {
        this.setState((prevState, props) => ({
          user: {
            ...prevState.user,
            uid: res
          }
        }))
      })
      AsyncStorage.getItem('userPicture').then((res) => {
        this.setState((prevState, props) => ({
          user: {
            ...prevState.user,
            userPicture: res
          }
        }))
      })
      AsyncStorage.getItem('userEmail').then((res) => {
        this.setState((prevState, props) => ({
          user: {
            ...prevState.user,
            userEmail: res
          }
        }))
      })                              
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
