//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {FloatingAction} from 'react-native-floating-action'
import { Feather } from "@expo/vector-icons";
import { widthPercentageToDP } from '../../constants/Normalize';


// create a component
class FloatingActionButton extends Component {
    actions = [
        {
          text: "Accessibility",
          icon: <Feather color="white" size={25} name="home"/>,
          name: "bt_accessibility",
          position: 2
        },
        {
          text: "Language",
          icon: <Feather color="white" size={25} name="home"/>,
          name: "bt_language",
          position: 1
        }
      ];

    render() {
        return (
            <FloatingAction
            color="#102A43"
            actions={this.actions}
            distanceToEdge={widthPercentageToDP('5%')}
            onPressItem={name => {
            //   this.props.navigation.navigate(name)
            }}
            shadow={{ shadowOpacity: 0.35, shadowOffset: { width: 0, height: 5 }, shadowColor: "#102A43", shadowRadius: 3, elevation: 2 }}
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
