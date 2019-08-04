import React, { Component } from 'react';
import { StyleSheet, View, Platform, StatusBar, AsyncStorage } from 'react-native';
import FeedCard from '../components/feed/CustomCard';
import {FlatList, SafeAreaView} from 'react-navigation'
import Header from '../components/global/Header';
import {widthPercentageToDP, heightPercentageToDP} from '../constants/Normalize';
import * as firebase from 'firebase'
import 'firebase/firestore'
import {
  apiKey,
  appId,
  messagingSenderId,
  storageBucket,
  authDomain,
  databaseURL,
  projectId
} from "../constants/firebaseConfig";
import Events from '../components/feed/Events';

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
  var db = firebase.firestore();
}
var announcementsRef = db.collection("announcements");
var statisticsRef = db.collection("statistics");

export default class FeedScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      refreshing: false,
      extraData: false,
    };
  }

  componentDidMount() {
    this._hydrateUserState();
    this._hydrateInitialFeed();
  }


    renderFeedCard = (props) => {
      return (
        <FeedCard post={props.item}/>
      )
    }

    render() {
      return (
      <SafeAreaView forceInset={{ bottom: 'never' }}>
        <View style={styles.container}>
            <Header headerDescription="Here are today's events"/>
            <Events/>
            {/* <View style={styles.flatListContainer}>
              <FlatList
                onRefresh={() => {this._refreshFeed()}}
                onEndReached={() => {this._getInfinityScrollFeed()}}
                onEndReachedThreshold={0.45}
                extraData={this.state.extraData}
                refreshing={this.state.refreshing}
                style={styles.flatList}
                removeClippedSubviews
                data={this.state.announcements}
                renderItem={this.renderFeedCard}
                keyExtractor={(item, index) => item.title + item.poster + new Date().setTime(item.datePosted.seconds*1000).toString()}
              />
            </View> */}
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
    return true
  };

  _hydrateInitialFeed = async () => {
    //get the first 10 announcements in the feed (desc order)
    data = await announcementsRef.orderBy("datePosted", "desc").limit(8).get()
    this.setState({
      announcements: data.docs.map(doc => doc.data()),
    })
    return true
  }

  _refreshFeed = async () => {
    this.setState({refreshing: true})
    numPosts = await this._getNumPosts()
    if(this.state.announcements.length === numPosts || this.state.announcements.length > numPosts) {
      this.setState({
        refreshing: false
      })
      return true
    } 
    else if (this.state.announcements.length < numPosts) {
      data = await announcementsRef.orderBy("datePosted", "desc").limit(8).get()
      this.setState({
        announcements: data.docs.map(doc => doc.data()),
        refreshing: false,
        extraData: true
      })
      return true
    }
  }

  _getNumPosts = async () => {
    data = await statisticsRef.doc("feed").get()
    return data.data().numPosts
  }


  _getInfinityScrollFeed = async () => {
      announcementsRef.orderBy("datePosted", "desc").startAfter(this.state.announcements[this.state.announcements.length-1].datePosted).limit(5).get().then((data) => {
        parsedData = data.docs.map(doc => doc.data())
        this.setState(previousState => ({
          announcements: [...previousState.announcements, ...parsedData],
        }));
      })
    }
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
      marginBottom: heightPercentageToDP('6%')
    }
});
