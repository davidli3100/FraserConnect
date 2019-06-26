//import liraries
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import {default as Text} from '../Text'
import {widthPercentageToDP, heightPercentageToDP} from '../../constants/Normalize'

// create a component
class PinnedAnnouncements extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>PinnedAnnouncements</Text>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default PinnedAnnouncements;
