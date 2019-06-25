//import liraries
import React, { Component, Fragment } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import {default as Text} from '../Text';
import {widthPercentageToDP, heightPercentageToDP} from '../../constants/Normalize'
import * as theme from '../../constants/theme';
import { Avatar } from 'react-native-elements';
import {withNavigation} from 'react-navigation';

// create a component
class FeedHeader extends Component {
    constructor(props) {
        super(props);

        this._openDrawer = this._openDrawer.bind(this)
    }

    _customInitialsHandler = (string) => {
        var names = string.split(' '),
        initials = names[0].substring(0, 1).toUpperCase();
    
        if (names.length > 1) {
            initials += names[1].substring(0, 1).toUpperCase();
        }
        return initials;    
    }

    _openDrawer = () => {
        this.props.navigation.navigate("Logout")
    }

    render() {
        return (
        <View style={styles.container}>
            <View style={styles.containerLeft}>
                <Text style={styles.textUpper}>FRASER CONNECT</Text>
                <Text style={styles.textLower}>Announcements</Text>
            </View>
            <View>
                <Avatar 
                    overlayContainerStyle={{backgroundColor: '#47578f'}}
                    rounded
                    onPress={() => {
                        this._openDrawer()
                    }} 
                    size={widthPercentageToDP('10%')} 
                    title={this.props.avatarName ? this._customInitialsHandler(this.props.avatarName) : "John Fraser"} 
                    source={{uri: this.props.avatarSrc}}/>
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
export default withNavigation(FeedHeader);
