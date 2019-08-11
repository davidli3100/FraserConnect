//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from '../../constants/Normalize';
import { Button } from 'react-native-elements';
import * as firebase from 'firebase'
import 'firebase/firestore'

// create a component
class EventCard extends Component {

    convertDate = (date) => {
        var jDate = new Date(date*1000)
        var dateString = jDate.toDateString()
        var hours = jDate.getHours();
        if (hours < 10) {
            hours = "0" + hours
        }
        var minutes = jDate.getMinutes()
        if(hours >= 13) {
            return dateString + ' ' + hours-12+':'+ minutes + ' ' + 'PM' 
        } else {
            return dateString + ' ' + hours + ':' + minutes + ' ' + 'AM'
        }
    }
 
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.textPoster}>{this.props.event.club}</Text>
                    <Button title="Add to Calendar" titleStyle={styles.calendarButtonText} buttonStyle={styles.calendarButton}>
                        Add to Calendar
                    </Button>
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.eventTitle}>
                        {this.props.event.title}
                    </Text>
                    <Text style={styles.eventLocation}>
                        {this.props.event.location}
                    </Text>
                    <Text style={styles.eventDate}>
                        {this.convertDate(this.props.event.date.seconds)}
                    </Text>
                    <View style={styles.socialContainer}>
                        <Text style={styles.numberPeople}>
                            +{this.props.event.numPeopleGoing}
                        </Text>
                        <Text style={styles.numberPeopleText}>
                            people are going
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: widthPercentageToDP('100%'),
        // minHeight: heightPercentageToDP('28%'),
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        display: 'flex',
        backgroundColor: 'rgba(255,255,255,0)',
        paddingLeft: widthPercentageToDP('4.5%'),
        paddingRight: widthPercentageToDP('4.5%')
    },
    textPoster: {
        fontSize: heightPercentageToDP("1.75%"),
        fontFamily: "Poppins-SemiBold",
        color:  "#102A43",
        textTransform: "uppercase",
        lineHeight: heightPercentageToDP("2%"),
        marginTop: heightPercentageToDP('2.8%'),
        marginBottom: heightPercentageToDP("2.2%")
    },
    headerContainer: {
        display: 'flex',
        // height: heightPercentageToDP('7%'),
        width: widthPercentageToDP('91%'),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: '#BCCCDC',
        borderBottomWidth: 0.5
    },
    detailsContainer: {
        width: widthPercentageToDP('91%'),
        flex: 1,
        // height: heightPercentageToDP('23%'),
        justifyContent: "flex-start",
        flexDirection: "column",
        alignItems: "flex-start"
    },
    calendarButton: {
        height: heightPercentageToDP('3.75%'),
        backgroundColor: "#0063E7",
        borderRadius: 10,
        width: widthPercentageToDP('34.5%')
    },
    calendarButtonText: {
        fontSize: heightPercentageToDP("1.6%"),
        fontFamily: "Poppins-SemiBold",
        color: "#ffffff",
    },
    eventTitle: {
        marginTop: heightPercentageToDP('2.3%'),
        fontSize: heightPercentageToDP('2.4%'),
        color: "#102A43",
        fontFamily: "Poppins-SemiBold",
        lineHeight: heightPercentageToDP('2.6%')
    },
    eventLocation: {
        marginTop: heightPercentageToDP('0.8%'),
        color: "#627D98",
        fontFamily: "Poppins-Medium",
        fontSize: heightPercentageToDP("1.7%")
    },
    eventDate: {
        marginTop: heightPercentageToDP('-0.6%'),
        color: "#102A43",
        fontFamily: "Poppins-Medium",
        fontSize: heightPercentageToDP('1.7%')
    },
    socialContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: heightPercentageToDP('1%'),
        marginBottom: heightPercentageToDP('2.3%')
    },
    numberPeople: {
        backgroundColor: "#DCEEFB",
        paddingTop: heightPercentageToDP('0.4%'),
        paddingBottom: heightPercentageToDP('0.1%'),
        paddingLeft: widthPercentageToDP('2%'),
        paddingRight: widthPercentageToDP('2%'),
        color: "#0A558C",
        fontFamily: "Poppins-SemiBold",
        fontSize: heightPercentageToDP('1.7%'),
        borderRadius: 5,
        marginRight: widthPercentageToDP('2.5%')
    },
    numberPeopleText: {
        fontFamily: "Poppins-Medium",
        fontSize: heightPercentageToDP('1.7%'),
        color: '#627D98'
    }
});

//make this component available to the app
export default EventCard;
