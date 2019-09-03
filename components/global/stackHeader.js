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
                <TouchableOpacity onPress={() => {this.props.navigation.goBack()}} style={styles.backButton}>
                    <Feather name="arrow-left" color="white" size={30}/>
                </TouchableOpacity>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{this.props.title}</Text>
                    <Text style={styles.poster}>{this.props.poster}</Text>
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
        alignItems: 'center',
        backgroundColor: '#0063e7',
        flexDirection: 'row',
        borderBottomLeftRadius: 40,
        width: widthPercentageToDP('100%'),
        height: heightPercentageToDP('18%')
    },
    textContainer: {
        marginLeft: widthPercentageToDP('5.2%'),
        width: widthPercentageToDP('70%'),
        // marginBottom: heightPercentageToDP('2%')
    },
    backButton: {
        marginBottom: heightPercentageToDP('2.8%')
    },
    title: {
        fontFamily: "Poppins-SemiBold",
        fontSize: heightPercentageToDP('3%'),
        color: "#fff",
        lineHeight: heightPercentageToDP('3.2%')
    },
    poster: {
        fontFamily: "Poppins-SemiBold",
        fontSize: heightPercentageToDP('1.7%'),
        color: 'rgba(255,255,255,0.9)'
    }
});

//make this component available to the app
export default StackHeader;
