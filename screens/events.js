//import liraries
import React, { Component } from "react";
import { View, StyleSheet, Platform, StatusBar, Text } from "react-native";
import Header from "../components/global/Header";
import {
  widthPercentageToDP,
  heightPercentageToDP
} from "../constants/Normalize";

// create a component
class Events extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header headerDescription="Here's what's happening at Fraser"/>
        <View style={styles.eventsContainer}>
          <Text style={styles.headingText}>
            Upcoming Events
          </Text>
        </View>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
    backgroundColor: "#ffffff"
  },
  eventsContainer: {
    backgroundColor: "#FAFAFC",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  headingText: {
    marginLeft: widthPercentageToDP('4.5%'),
    fontFamily: "Poppins-SemiBold",
    fontSize: heightPercentageToDP('2.5%'),
    color: '#102A43',
    marginBottom: heightPercentageToDP('1%')
  }
});

//make this component available to the app
export default Events;
