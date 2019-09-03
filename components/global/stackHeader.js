//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { widthPercentageToDP, heightPercentageToDP } from '../../constants/Normalize';

// create a component
class StackHeader extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.contentContainer}>
                    <TouchableOpacity onPress={() => {this.props.navigation.goBack()}} style={styles.backButton}>
                        <Feather name="arrow-left" color="white" size={heightPercentageToDP('3%')}/>
                    </TouchableOpacity>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{this.props.title}</Text>
                        <Text style={styles.poster}>{this.props.poster}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        paddingLeft: widthPercentageToDP('4.5%'),
        paddingRight: widthPercentageToDP('4.5%'),
        // flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: 'rgba(0,99,231,0.9)',
        flexDirection: 'row',
        borderBottomLeftRadius: 40,
        width: widthPercentageToDP('100%'),
        height: heightPercentageToDP('16%')
    },
    textContainer: {
        marginLeft: widthPercentageToDP('5.2%'),
        width: widthPercentageToDP('70%'),
        // marginBottom: heightPercentageToDP('2%')
    },
    backButton: {
    },
    title: {
        fontFamily: "Poppins-SemiBold",
        fontSize: heightPercentageToDP('2.5%'),
        color: "#fff",
        lineHeight: heightPercentageToDP('2.9%'),
        marginTop: heightPercentageToDP('0.4%'),
        maxHeight: heightPercentageToDP('7%')
    },
    poster: {
        fontFamily: "Poppins-SemiBold",
        fontSize: heightPercentageToDP('1.7%'),
        color: 'rgba(255,255,255,0.9)'
    },
    contentContainer: {
        marginTop: heightPercentageToDP('2.75%'),
        flexDirection: 'row'
    }
});

//make this component available to the app
export default StackHeader;
