//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP, heightPercentageToDP } from '../../constants/Normalize';

_colourHandler = (key) => {
    var indexNum = key
    if(indexNum % 3 === 0 && indexNum !== 0) {
        return "#10294C"
    } else if (indexNum % 2 === 0 && indexNum !== 0) {
        return "rgba(57,195,174, 0.9)"
    } else if (indexNum % 5 === 0 && indexNum !== 0 || indexNum === 1  ) {
        return "rgba(51,82,201,0.9)"
    } else if(indexNum % 4 === 0) {
        return "rgba(254,153,87,0.9)"
    }
}

class EventCard extends Component {

    render() {
        return (
            <View style={StyleSheet.flatten([styles.container, {backgroundColor: _colourHandler(this.props.data.index)}])}>
                <Text style={styles.clubText}>
                    {this.props.data.club}
                </Text> 
                <Text style={styles.titleText}>
                    {this.props.data.title}
                </Text>
                <View style={styles.detailsView}>
                    <Text style={styles.dateText}>
                        at {this.props.data.eventDate} in{"\u0020"}
                        <Text style={styles.locationText}>
                            {this.props.data.eventLocation}
                        </Text>
                    </Text>

                </View>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        paddingLeft: widthPercentageToDP('5%'),
        paddingRight: widthPercentageToDP('5%'),
        paddingTop: heightPercentageToDP('1.5%'),
        paddingBottom: heightPercentageToDP('1.5%'),
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: widthPercentageToDP('49%'),
        maxWidth: widthPercentageToDP('49%'),
        minHeight: heightPercentageToDP('18%'),
        borderRadius: 14,
    },
    clubText: {
        flex: 1,
        alignSelf: 'flex-start',
        fontSize: heightPercentageToDP('1.5%'),
        fontFamily: "Poppins-SemiBold",
        color: "rgba(255,255,255,0.8)",
        // paddingBottom: heightPercentageToDP('1.5%')
    },
    titleText: {
        flex: 1,
        lineHeight: heightPercentageToDP('2.3%'),
        fontFamily: "Poppins-SemiBold",
        color: "#ffffff",
        fontSize: heightPercentageToDP('2.2%'),
        paddingBottom: heightPercentageToDP('2%')
    },
    dateText: {
        flex: 1,
        alignSelf: 'flex-end',
        fontFamily: "Poppins-SemiBold",
        color: "rgba(255,255,255,0.8)",
        fontSize: heightPercentageToDP('1.8%'),
        lineHeight: heightPercentageToDP('1.9%')
    },
    locationText: {
        // fontSize: heightPercentageToDP('1.8%'),
        color: "#fff",
    },
    detailsView: {
        maxWidth: widthPercentageToDP('38%'),
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'row'
    }
});

//make this component available to the app
export default EventCard;
