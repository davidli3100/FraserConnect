//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {FloatingAction} from 'react-native-floating-action'
import { Feather } from "@expo/vector-icons";
import { widthPercentageToDP, heightPercentageToDP } from '../../constants/Normalize';

function SubmitData(type) {
  switch (type) {
    case "announcement":
      // Do announcement things
      return;
    case "event":
      // Do event things
      return;
    case "election":
      // Do election things
      return;
  }
}

// create a component
class FloatingActionButton extends Component {
    actions = [
        {
          text: "Announcement",
          icon: <Feather color="rgba(255,255,255,0.9)" size={20} name="message-square"/>,
          name: "createAnnouncement",
          position: 1,
          color:"#102A43",
          textColor: "#102A43",
        },
        {
          text: "Event",
          icon: <Feather color="rgba(255,255,255,0.9)" size={20} name="calendar"/>,
          name: "createEvent",
          position: 2,
          color:"#102A43",
          textColor: "#102A43",
        },
        {
          text: "Election",
          icon: <Feather color="rgba(255,255,255,0.9)" size={20} name="send"/>,
          name: "createElection",
          position: 3,
          color:"#102A43",
          textColor: "#102A43",
        }
      ];

    render() {
        return (
            <FloatingAction
            color="#102A43"
            actions={this.actions}
            distanceToEdge={widthPercentageToDP('4.5%')}
            onPressItem={name => {
            //   this.props.navigation.navigate(name)
            }}
            shadow={{ shadowOpacity: 0.35, shadowOffset: { width: 0, height: 5 }, shadowColor: "#102A43", shadowRadius: 3, elevation: 5 }}
          />
        );
    }
}

// define your styles
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#2c3e50',
//     },
// });

//make this component available to the app
export default FloatingActionButton;
