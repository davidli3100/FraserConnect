//import liraries
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import {default as Text} from '../components/Text';
import Header from '../components/global/Header';
import {widthPercentageToDP, heightPercentageToDP} from '../constants/Normalize'

// create a component
class Events extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Header screenName="Events"/>
                <Text h1>Events</Text>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
      marginLeft: widthPercentageToDP('4%'),
      marginRight: widthPercentageToDP('4%'),
      marginTop: heightPercentageToDP('5.5%'),
    },
});

//make this component available to the app
export default Events;
