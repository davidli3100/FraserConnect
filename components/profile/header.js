//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { heightPercentageToDP, widthPercentageToDP } from '../../constants/Normalize';
import { withNavigation } from 'react-navigation';
import * as firebase from "firebase"
import * as GoogleSignIn from "expo-google-sign-in";

// create a component
class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: "David Li",
            userID: '123456'
        }
    }

    syncDeletes = [
        "uid",
        "userName",
        "userFirstName",
        "userLastName",
        "userEmail",
        "userPicture"
      ];
    
        _asyncLogOut = async() => {
            try {
                await GoogleSignIn.signOutAsync();
                try {
                  await firebase.auth().signOut();
                } catch(err) {
                  console.log("Firebase logout err: " + err)
                }
                await AsyncStorage.removeItem('user');
                this.props.navigation.navigate('Auth')
                // console.log('sign out successful')
            } catch ({error}) {
                console.error('Error in Logging Out: ' + error)
            } finally {
                await AsyncStorage.multiRemove(this.syncDeletes)
            }
        }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.contentContainer}>
                    <TouchableOpacity onPress={() => {this.props.navigation.goBack()}}>
                        <Feather style={styles.iconLeft} name="arrow-left" size={heightPercentageToDP('3%')}/>
                    </TouchableOpacity>
                    <View style={styles.userInfoText}>
                        <Text style={styles.userName}>{this.state.userName}{'\n'}
                        <Text style={styles.userID}>ID: {this.state.userID}</Text>
                        </Text>

                    </View>
                    <TouchableOpacity onPress={() => {this._asyncLogOut()}}>
                        <Feather style={styles.iconRight} name="log-in" size={heightPercentageToDP('3%')}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.tabContainer}>
                    <Text style={styles.tabText}>Profile</Text>
                    <Text style={styles.tabTextActive}>Timetable</Text>
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
        backgroundColor: '#ffffff',      
        flexDirection: 'column',
        height: heightPercentageToDP('15%'),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        borderBottomLeftRadius: 14,
        borderBottomRightRadius: 14
        
    },
    contentContainer: {
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundColor: '#ffffff',
        width: widthPercentageToDP('100%'),
        paddingRight: widthPercentageToDP('4.5%'),
        paddingLeft: widthPercentageToDP('4.5%'),        
        flexDirection: 'row',
        marginTop: heightPercentageToDP('1.4%'),
        height: heightPercentageToDP('6.6%')
    },
    iconRight: {
        marginTop: heightPercentageToDP('0.9%'),
        color: '#334E68'
    },
    iconLeft: {
        marginTop: heightPercentageToDP('1.15%'),
        color: '#334E68'
    },
    userName: {
        textAlign: 'center',
        fontFamily: "Poppins-SemiBold",
        fontSize: heightPercentageToDP('2.1%'),
        color: '#334E68'
    },
    userID: {
        fontSize: heightPercentageToDP('1.6%'),
        color: '#9FB3C8'
    },
    tabContainer: {
        width: widthPercentageToDP('100%'),
        paddingRight: widthPercentageToDP('4.5%'),
        paddingLeft: widthPercentageToDP('4.5%'),
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: heightPercentageToDP('7%'),
        marginTop: heightPercentageToDP('0.5%')
    },
    tabText: {
        fontSize: heightPercentageToDP('1.8%'),
        fontFamily: "Poppins-SemiBold",
        color: '#829AB1'
    },
    tabTextActive: {
        fontSize: heightPercentageToDP('1.8%'),
        fontFamily: "Poppins-SemiBold",
        color: '#003E6B'
    }

});

//make this component available to the app
export default withNavigation(Header);
