//import liraries
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import {default as Text} from '../components/Text';

// create a component
class Events extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text h1>Events</Text>
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
        backgroundColor: '#ffffff',
    },
});

//make this component available to the app
export default Events;
