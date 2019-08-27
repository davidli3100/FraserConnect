//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, StatusBar } from 'react-native';
import StackHeader from '../components/global/stackHeader';

// create a component
class Announcement extends Component {
    render() {
        return (
            <View style={styles.container}>
                <StackHeader navigation={this.props.navigation} title={this.props.navigation.state.params.post.title} poster={this.props.navigation.state.params.post.poster} />
                <Text>Announcement</Text>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default Announcement;
