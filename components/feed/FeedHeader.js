//import liraries
import React, { Component, Fragment } from 'react';
import { View, StyleSheet } from 'react-native';
import {default as Text} from '../Text';
import UserAvatar from 'react-native-user-avatar';
import {widthPercentageToDP, heightPercentageToDP} from '../../constants/Normalize'
import * as theme from '../../constants/theme'
// create a component
class FeedHeader extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
        <View style={styles.container}>
            <View style={styles.containerLeft}>
                <Text style={styles.textUpper}>FRASER CONNECT</Text>
                <Text style={styles.textLower}>Announcements</Text>
            </View>
            <View>
                <UserAvatar size={widthPercentageToDP('10%')} name={this.props.avatarName ? this.props.avatarName : "John Doe"} src={this.props.avatarSrc}/>
            </View>
        </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        marginBottom: heightPercentageToDP('2%'),
        flex: -1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    containerLeft: {
        flexDirection: 'column'
    },
    textLower: {
        fontFamily: 'Rubik-Bold',
        fontSize: 18
    },
    textUpper: {
        color: theme.colors.gray,
        fontSize: 12
    }
});

//make this component available to the app
export default FeedHeader;
