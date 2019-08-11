//import liraries
import React, { Component } from "react";
import { View, StyleSheet, Platform, StatusBar, Text } from "react-native";
import Header from "../components/global/Header";
import {
  widthPercentageToDP,
  heightPercentageToDP
} from "../constants/Normalize";
import EventCard from "../components/events/eventCard";
import { FlatList } from "react-native-gesture-handler";
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

var db = firebase.firestore();
var eventsRef = db.collection("events");
var statisticsRef = db.collection("statistics");

// create a component
class Events extends Component {

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      extraData: false,
    };
  }

  componentDidMount() {
    this._hydrateEvents()
  }

  _hydrateEvents = async () => {
    this.setState({
      refreshing: true
    })
    //get the first 10 announcements in the feed (desc order)
    data = await eventsRef.where("date", ">=", firebase.firestore.Timestamp.now()).orderBy("date").limit(8).get().catch(err => console.log(err))
    this.setState({
      events: data.docs.map(doc => doc.data()),
      refreshing: false
    })

    console.log(this.state.events)
  }

  renderEventCard = (props) => {
    return (
      <EventCard event={props.item}/>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Header headerDescription="Here's what's happening at Fraser"/>
        <View style={styles.eventsContainer}>
          <Text style={styles.headingText}>
            Upcoming Events
          </Text>
          <FlatList
          style={styles.flatList}
          renderItem={this.renderEventCard}
          data={this.state.events}
          refreshing={this.state.refreshing}
          keyExtractor={(item, index) => item.title + item.poster + new Date().setTime(item.date.seconds*1000).toString()}
          />
        </View>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
    backgroundColor: "#ffffff",
    height: heightPercentageToDP('100%'),
    display: 'flex',
    flexDirection: 'column'
  },
  eventsContainer: {
    flex: 1,
    backgroundColor: "#FAFAFC",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: heightPercentageToDP('1.5%'),
    elevation: 2,
    shadowRadius: 1.5,
    shadowColor: "#000000",
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  headingText: {
    marginTop: heightPercentageToDP('1.25%'),
    marginLeft: widthPercentageToDP('4.5%'),
    fontFamily: "Poppins-SemiBold",
    fontSize: heightPercentageToDP('3%'),
    color: '#102A43',
    marginBottom: heightPercentageToDP('0.9%')
  }
});

//make this component available to the app
export default Events;
