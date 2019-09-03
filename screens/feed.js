import React, { Component } from 'react';
import { StyleSheet, View, Platform, StatusBar, AsyncStorage, Text } from 'react-native';
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
import FloatingActionButton from '../components/global/floatingAction';

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
var eventsRef = db.collection("events");
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
    this._hydrateEventsFeed();
  }

  isToday = (date) => {
    someDate = new Date(date*1000)
    const today = new Date()
    return someDate.getDate() == today.getDate() &&
      someDate.getMonth() == today.getMonth() &&
      someDate.getFullYear() == today.getFullYear()
  }

  _dataReducer = (doc) => {

    const reduced = {
      key: doc.id,
      ...doc.data()
    }

    return reduced
  }
  
  _hydrateEventsFeed = async () => {
    //get the first 6 announcements in the feed (desc order)
    data = await eventsRef.where("endDate", ">=", firebase.firestore.Timestamp.now()).orderBy("endDate").limit(6).get().catch(err => console.log(err))
    this.setState({
      events: data.docs.map(doc => this._dataReducer(doc)),
    })
  }

    renderFeedCard = (props) => {
      return (
        <FeedCard navigation={this.props.navigation} post={props.item}/>
      )
    }


    render() {
      return (
      <SafeAreaView forceInset={{ bottom: 'never' }}>
      <StatusBar backgroundColor="white" barStyle="dark-content"/>
        <View style={styles.container}>
            <Header headerDescription="Here are today's events"/>
            <Events refresh={this._hydrateEventsFeed} data={this.state.events}/>
            <View style={styles.flatListContainer}>
              <Text style={styles.feedHeader}>
                Announcements
              </Text>
              <FlatList
                showsVerticalScrollIndicator={false}
                onRefresh={() => {this._refreshFeed()}}
                onEndReached={() => {this._getInfinityScrollFeed()}}
                onEndReachedThreshold={0.4}
                extraData={this.state.extraData}
                refreshing={this.state.refreshing}
                style={styles.flatList}
                removeClippedSubviews
                data={this.state.announcements}
                renderItem={this.renderFeedCard}
                keyExtractor={(item, index) => item.title + item.poster + new Date().setTime(item.datePosted.seconds*1000).toString()}
              />
            </View>
            <FloatingActionButton/>
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
    this.setState({
      refreshing: true
    })
    //get the first 10 announcements in the feed (desc order)
    data = await announcementsRef.orderBy("datePosted", "desc").limit(8).get()
    this.setState({
      announcements: data.docs.map(doc => doc.data()),
      refreshing: false
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
      backgroundColor: '#F0F4F8',
    },
    flatListContainer: {
      marginTop: heightPercentageToDP('2%'),
      width: widthPercentageToDP('100%'),
      flex: 1
    },
    flatList: {
      marginBottom: heightPercentageToDP('6%')
    },
    feedHeader: {
      marginLeft: widthPercentageToDP('4.5%'),
      fontFamily: "Poppins-SemiBold",
      fontSize: heightPercentageToDP('2.5%'),
      color: '#102A43',
      marginBottom: heightPercentageToDP('1%')
    }
});
