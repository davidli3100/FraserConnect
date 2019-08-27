//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, StatusBar, ScrollView } from 'react-native';
import StackHeader from '../components/global/stackHeader';
import { heightPercentageToDP, widthPercentageToDP } from '../constants/Normalize';

// create a component
class Announcement extends Component {
    render() {
        return (
            <View style={styles.container}>
                <StackHeader navigation={this.props.navigation} title={this.props.navigation.state.params.post.title} poster={this.props.navigation.state.params.post.poster} />
                <ScrollView>
                    <Text style={styles.textContainer}>{this.props.navigation.state.params.post.content}</Text>
                </ScrollView>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#fff',
    },
    textContainer: {
        marginTop: heightPercentageToDP('2.5%'),
        paddingLeft: widthPercentageToDP('4.5%'),
        paddingRight: widthPercentageToDP('4.5%'),
        fontFamily: "Poppins-Regular",
        fontSize: heightPercentageToDP('1.85%')
    }
});

//make this component available to the app
export default Announcement;
