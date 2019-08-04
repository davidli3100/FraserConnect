//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import EventCard from './EventCard';
import { heightPercentageToDP, widthPercentageToDP } from '../../constants/Normalize';

// create a component
class Events extends Component {
    render() {
        return (
            <View style={styles.container}>
                <EventCard data={{index: 0, club: "Student Activity Council", title: "Summer Carnival", eventDate: "July 13", eventLocation: "the courtyard"}}/>
                <EventCard data={{index: 1, club: "Student Activity Council", title: "Summer Carnival", eventDate: "July 13", eventLocation: "the courtyard"}}/>
                <EventCard data={{index: 2, club: "Student Activity Council", title: "Summer Carnival", eventDate: "July 13", eventLocation: "the courtyard"}}/>
                <EventCard data={{index: 3, club: "Student Activity Council", title: "Summer Carnival", eventDate: "July 13", eventLocation: "the courtyard"}}/>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        paddingTop: heightPercentageToDP('2%'),
        paddingBottom: heightPercentageToDP('2%'),
        marginLeft: widthPercentageToDP("4.5%"),
        flex: 1,
        justifyContent: 'flex-start',
        flexDirection: "row",
        alignItems: 'flex-start',
        backgroundColor: '#fff',
        maxHeight: heightPercentageToDP('22%'),
        width: widthPercentageToDP('95.5%'),
        overflow: 'scroll'
    },
});

//make this component available to the app
export default Events;
