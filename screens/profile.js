//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, StatusBar, ScrollView } from 'react-native';
import TopProfileTabs from '../navigation/profileTopTab';
import Header from '../components/profile/header';
import TimetableCard from '../components/profile/timetableCard';
import { widthPercentageToDP, heightPercentageToDP } from '../constants/Normalize';

// create a component
class Profile extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Header/>
                <ScrollView style={styles.coursesList}>
                    <TimetableCard course={{name: 'ENG3U0-A: University English', location: 'Room 104', time: 'Period 1 | 8:25-9:40', instructor: 'Gale, R'}}/>
                    <TimetableCard course={{name: 'CLU3M0-A: Law', location: 'Room 217', time: 'Period 2 | 9:43-10:58', instructor: 'Scopis, A'}}/>
                    <TimetableCard course={{name: 'Lunch', time: '10:58-12:13'}}/>
                    <TimetableCard course={{name: 'SBI3U9-A: AP Biology', location: 'Room 241', time: 'Period 3 | 12:13-1:28', instructor: 'Zamora, T'}}/>
                    <TimetableCard course={{name: 'SCH3U9-A: AP Chemistry', location: 'Room 243', time: 'Period 4 | 1:31-2:46', instructor: 'McNally, D'}}/>

                </ScrollView>
            </View>
        ); 
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#F0F4F8',
    },
    coursesList: {
        marginTop: heightPercentageToDP('3%'),
        width: widthPercentageToDP('100%'),
        paddingLeft: widthPercentageToDP('4.5%'),
        paddingRight: widthPercentageToDP('4.5%')
    }
});

//make this component available to the app
export default Profile;
