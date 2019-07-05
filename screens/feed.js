import React, { Component } from 'react';
import { StyleSheet, View, Platform, StatusBar, AsyncStorage } from 'react-native';
import FeedCard from '../components/feed/CustomCard';
import { default as Text } from '../components/Text'
import * as GoogleSignIn from 'expo-google-sign-in';
import {FlatList, SafeAreaView} from 'react-navigation'
import Header from '../components/global/Header';
import {widthPercentageToDP, heightPercentageToDP} from '../constants/Normalize';

export default class FeedScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    this._hydrateUserState();
  }

    posts = [
      {
      datePosted: 'June 24',
      title: 'Hello World',
      content: 'First ever text post on the Fraser Connect Prototype!',
      poster: '3D Printing Club'
      },
      {
        datePosted: 'June 24',
        title: 'Hello World',
        content: 'First ever text post on the Fraser Connect Prototype!',
        poster: '3D Printing Club'
      },
      {
        datePosted: 'June 24',
        title: 'Hello World',
        content: 'First ever text post on the Fraser Connect Prototype!',
        poster: '3D Printing Club'
      },
      {
        datePosted: 'June 24',
        title: 'Hello World',
        content: 'First ever text post on the Fraser Connect Prototype!',
        poster: '3D Printing Club'
      },
      {
        datePosted: 'June 24',
        title: 'Hello World',
        content: 'First ever text post on the Fraser Connect Prototype!',
        poster: '3D Printing Club'
      }
  ];

    renderFeedCard = (props) => {
      return (
        <FeedCard post={props.item}/>
      )
    }

    render() {
      return (
      <SafeAreaView forceInset={{ bottom: 'never' }}>
        <View style={styles.container}>
            <Header screenName="Announcements"/>
            <View style={styles.flatListContainer}>
              <FlatList
                style={styles.flatList}
                removeClippedSubviews
                data={this.posts}
                renderItem={this.renderFeedCard}
                keyExtractor={(item, index) => item.poster + item.datePosted + item.title}
              />
            </View>
        </View>
      </SafeAreaView>
      );
    };

  _hydrateUserState = async () => {
    AsyncStorage.getItem("userName").then(res => {
      this.setState((prevState, props) => ({
        user: {
          ...prevState.user,
          userName: res
        }
      }));
    });
    AsyncStorage.getItem("userFirstName").then(res => {
      this.setState((prevState, props) => ({
        user: {
          ...prevState.user,
          userFirstName: res
        }
      }));
    });
    AsyncStorage.getItem("userLastName").then(res => {
      this.setState((prevState, props) => ({
        user: {
          ...prevState.user,
          userLastName: res
        }
      }));
    });
    AsyncStorage.getItem("uid").then(res => {
      this.setState((prevState, props) => ({
        user: {
          ...prevState.user,
          uid: res
        }
      }));
    });
    AsyncStorage.getItem("userPicture").then(res => {
      this.setState((prevState, props) => ({
        user: {
          ...prevState.user,
          userPicture: res
        }
      }));
    });
    AsyncStorage.getItem("userEmail").then(res => {
      this.setState((prevState, props) => ({
        user: {
          ...prevState.user,
          userEmail: res
        }
      }));
    });
  };
}

  const styles = StyleSheet.create({
    container: {
      paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
      height: heightPercentageToDP('100%'),
      backgroundColor: 'rgba(254,254,254,1)',
    },
    flatListContainer: {
      width: widthPercentageToDP('100%'),
      flex: 1
    },
    flatList: {
      marginBottom: heightPercentageToDP('5%')
    }
});
