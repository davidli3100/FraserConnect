//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, AsyncStorage } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from '../../constants/Normalize';
import { Button } from 'react-native-elements';
import * as Calendar from 'expo-calendar'
import * as Permissions from 'expo-permissions'

// create a component
class EventCard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            calendars: [],
            haveCalendarPermissions: false,
            activeCalendar: null,
            eventAdded: false,
            addedEvents: null,
            addedEventID: null,
            numPeopleGoing: this.props.event.numPeopleGoing
        }
    }

    componentDidMount() { 
        console.log('remount')
        //uncomment for master reset :/
        // AsyncStorage.removeItem('addedEvents')
        // Calendar.deleteCalendarAsync('34')
        AsyncStorage.getItem('addedEvents').then(res => {
            console.log(res)
            this.setState({
                addedEvents: JSON.parse(res),
                addedEventID: this.customIDCheck(JSON.parse(res)),
                eventAdded: this.customEventCheck(JSON.parse(res))
            })
        })
    }

    customEventCheck = (events) => {
        for (var i =0; i < events.length; i++) {
            splitEvent = events[i].split(" ")
            if(splitEvent[0] === this.props.event.title && splitEvent[1] === String(this.props.event.startDate.seconds)) {
                this.setState({eventIndex: i})
                return true
            }
        }
    }

    customIDCheck = (events) => {
        for (var i =0; i < events.length; i++) {
            splitEvent = events[i].split(" ")
            if(splitEvent[0] === this.props.event.title && splitEvent[1] === String(this.props.event.startDate.seconds)) {
                return splitEvent[2].toString()
            }
        }
    }


    askForCalendarPermissions = async () => {
        const response = await Permissions.askAsync(Permissions.CALENDAR);
        const granted = response.status === 'granted';
        this.setState({
          haveCalendarPermissions: granted,
        });
        return granted;
    }

    _findCalendars = async () => {
        const calendarGranted = await this.askForCalendarPermissions();
        if (calendarGranted) {
          const eventCalendars = (await Calendar.getCalendarsAsync('event'));
          this.setState({ calendars: [...eventCalendars] });
        }
      }

    addEventToCalendar = async () => {
        console.log(this.state)
        event = this.props.event
        // console.log(this.state)
        if(this.state.eventAdded === false) {
            await this._findCalendars()
            for(var i = 0; i < this.state.calendars.length; i++) {
                // console.log(this.state.calendars[i].ownerAccount)
                if(this.state.calendars[i].title === "John Fraser SS Events") {
                    eventDetails = {
                        title: event.title,
                        startDate: new Date(event.startDate.seconds*1000),
                        endDate: new Date(event.endDate.seconds*1000),
                        location: event.location,
                        id: event.title + ' ' + event.startDate.seconds,
                        // alarms: [{relativeOffset: -30, method: "alert"}]
                    }
                    this.setState({activeCalendar: this.state.calendars[i].title})
                    var calendarID = this.state.calendars[i].id.toString();
                    await Calendar.createEventAsync(String(calendarID), eventDetails)
                    .then((id) => {this.props.incrementSocialCount(this.props.event.key); this.setState({numPeopleGoing: this.state.numPeopleGoing++}); AsyncStorage.getItem('addedEvents')
                    .then(arr => {if(arr !== null) {addedEvents = JSON.stringify(JSON.parse(arr).push(this.props.event.title + ' ' + this.props.event.startDate.seconds + ' ' + id)); AsyncStorage.setItem('addedEvents', addedEvents).then(this.setState({eventAdded: true}))} else {AsyncStorage.setItem('addedEvents', JSON.stringify([`${this.props.event.title} ${this.props.event.startDate.seconds} ${id}`])).then(this.setState({eventAdded: true}))}})})
                    .catch(err => console.log(err))
                    // ExpoCalendar.createEventAsync(calendar, details)
                    // console.log(details)
                } 
            }
        } else if (this.state.eventAdded) {
            // Calendar.deleteEventAsync(String(this.state.addedEventID))
            // AsyncStorage.getItem('addedEvents').then(events => {
            //     console.log(events)
            //     AsyncStorage.setItem('addedEvents', JSON.stringify(JSON.parse(events).splice(this.state.eventIndex, 1))).then(this.setState({eventAdded: false}));
            // })
        }
        if(this.state.activeCalendar !== "John Fraser SS Events" && this.state.eventAdded === false) {
            calendarDetails = {
                id: "John Fraser SS Events",
                title: "John Fraser SS Events",
                entityType: "Calendar.EntityTypes.EVENT",
                color: "#0063e7",
                allowsModifications: true,
                sourceId: 
                Platform.OS === 'ios'
                  ? this.state.calendars.find(cal => cal.source && cal.source.name === 'Default').source.id
                  : undefined,
                source:
                    Platform.OS === 'android'
                    ? {
                        name: this.state.calendars.find(
                            cal => cal.accessLevel === Calendar.CalendarAccessLevel.OWNER
                        ).source.name,
                        isLocalAccount: true,
                    }
                    : undefined,
                name: "John Fraser SS Events",
                ownerAccount: "Fraser Connect",
                accessLevel: "Calendar.CalendarAccessLevel.ROOT"
            }
            await Calendar.createCalendarAsync(calendarDetails)
            await this.addEventToCalendar()
        }
    }

    convertDate = (startDate, endDate) => {
        var jDate = new Date(startDate*1000)
        var dateString = jDate.toDateString()
        var hours = jDate.getHours();
        var minutes = jDate.getMinutes()
        var sameDay = false
        if(minutes < 10) {
            minutes = "0" + minutes
        }

        var jDate2 = new Date(endDate*1000)  
        var dateString2 = jDate2.toDateString()
        var hours2 = jDate2.getHours();
        var minutes2 = jDate2.getMinutes()
        if(minutes2 < 10) {
            minutes2 = "0" + minutes2
        }  

        if(hours >= 13 && hours !== 12) {
            var finalStartDate = dateString + ' ' + hours-12+':'+ minutes + ' ' + 'p.m.' 
        } else if (hours === 12) {
            var finalStartDate = dateString + ' ' + hours + ':' + minutes + ' ' + 'p.m.'
        } else {
            var finalStartDate = dateString + ' ' + hours + ':' + minutes + ' ' + 'a.m.'
        }

        if(hours2 >= 13 && hours2 !== 12) {
            var finalStartDate2 = dateString2 + ' ' + hours2-12+':'+ minutes2 + ' ' + 'p.m.' 
        } else if (dateString2 === dateString && hours2 === 12) {
            var finalStartDate2 = hours2 + ':' + minutes2 + ' ' + 'p.m.'
            sameDay = true
        } else if(hours2 >= 13 && hours2 !== 12 && dateString === dateString2) {
            var finalStartDate2 = hours2-12+':'+ minutes2 + ' ' + 'p.m.' 
            sameDay = true
        } else if(hours2 < 13 && dateString === dateString2) {
            var finalStartDate2 = hours2 +':'+ minutes2 + ' ' + 'a.m.' 
            sameDay = true
        } else if (hours2 === 12) {
            var finalStartDate2 = dateString2 + ' ' + hours2 + ':' + minutes2 + ' ' + 'p.m.'
        } else {
            var finalStartDate2 = dateString2 + ' ' + hours2 + ':' + minutes2 + ' ' + 'a.m.'
        }
        
        if(sameDay) {
            return finalStartDate + ' - '+ finalStartDate2
        } else {
            return finalStartDate + " to" + '\n' + finalStartDate2
        }
    }
 
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.textPoster}>{this.props.event.club}</Text>
                    <Button title={this.state.eventAdded ? "Event Added" : "Add to Calendar"} disabled={this.state.eventAdded}
                            onPress={this.addEventToCalendar} titleStyle={styles.calendarButtonText} buttonStyle={styles.calendarButton}>
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
                        {this.convertDate(this.props.event.startDate.seconds, this.props.event.endDate.seconds)}
                    </Text>
                    <View style={styles.socialContainer}>
                        <Text style={styles.numberPeople}>
                            +{this.state.numPeopleGoing}
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
        marginTop: heightPercentageToDP('2.2%'),
        marginBottom: heightPercentageToDP("2%")
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
        height: heightPercentageToDP('4%'),
        backgroundColor: "#0063E7",
        borderRadius: 10,
        width: widthPercentageToDP('32%')
    },
    calendarButtonText: {
        fontSize: heightPercentageToDP("1.6%"),
        fontFamily: "Poppins-SemiBold",
        color: "#ffffff",
    },
    eventTitle: {
        marginTop: heightPercentageToDP('2.6%'),
        fontSize: heightPercentageToDP('2.4%'),
        color: "#102A43",
        fontFamily: "Poppins-SemiBold",
        lineHeight: heightPercentageToDP('2.6%')
    },
    eventLocation: {
        marginTop: heightPercentageToDP('1%'),
        color: "#627D98",
        fontFamily: "Poppins-Medium",
        fontSize: heightPercentageToDP("1.7%")
    },
    eventDate: {
        marginTop: heightPercentageToDP('-0.3%'),
        color: "#102A43",
        fontFamily: "Poppins-Medium",
        fontSize: heightPercentageToDP('1.7%'),
        lineHeight: heightPercentageToDP('2%')
    },
    socialContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: heightPercentageToDP('1.2%'),
        marginBottom: heightPercentageToDP('1.5%')
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
