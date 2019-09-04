//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from '../../constants/Normalize';

// create a component
class TimetableCard extends Component {
    render() {
        return (
            <View style={this.props.course.name==="Lunch" ? StyleSheet.flatten([styles.container, {backgroundColor: 'rgba(40,182,123,0.9)'}]) : styles.container}>
                <View style={styles.contentContainer}>
                    <View style={styles.upperText}>
                        <Text style={this.props.course.name==="Lunch" ? StyleSheet.flatten([styles.courseName, {color: 'rgba(255,255,255,1)'}]) : styles.courseName}>{this.props.course.name}</Text>
                        <Text style={styles.courseLocation}>{this.props.course.location}</Text>
                    </View>
                    <View style={styles.lowerText}>
                        <Text style={styles.courseInstructor}>{this.props.course.instructor}</Text>
                        <Text style={this.props.course.name==="Lunch" ? StyleSheet.flatten([styles.courseTime, {color: 'rgba(255,255,255,1)'}]) : styles.courseTime}>{this.props.course.time}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        height: heightPercentageToDP('11.5%'),
        backgroundColor: '#ffffff',
        flexDirection: 'column',
        borderRadius: 10,
        marginBottom: heightPercentageToDP('3%')
    },
    contentContainer: {
        marginLeft: widthPercentageToDP('3%'),
        marginRight: widthPercentageToDP('3%'),
        marginTop: heightPercentageToDP('1.5%'),
        marginBottom: heightPercentageToDP('1.5%'),
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        height: heightPercentageToDP('8.5%'),
        width: widthPercentageToDP('85%')
    },
    upperText: {
        width: widthPercentageToDP('85%'),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    lowerText: {
        width: widthPercentageToDP('85%'),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'    
    },
    courseName: {
        fontFamily: "Poppins-SemiBold",
        fontSize: heightPercentageToDP('2%'),
        color: '#102A43'
    },
    courseLocation: {
       marginTop: heightPercentageToDP('0.5%'),
       fontFamily: "Poppins-Medium" ,
       fontSize: heightPercentageToDP('1.6%'),
       color: '#102A43'
    },
    courseInstructor: {
        fontFamily: "Poppins-Medium" ,
        fontSize: heightPercentageToDP('1.8%'),
        color: '#102A43'
    },
    courseTime: {
        fontFamily: "Poppins-Medium" ,
        fontSize: heightPercentageToDP('1.6%'),
        color: '#102A43'
    }
});

//make this component available to the app
export default TimetableCard;
