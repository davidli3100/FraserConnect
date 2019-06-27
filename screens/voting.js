import React, { Component } from 'react';
import { StyleSheet, View, Platform, StatusBar } from 'react-native';
import { default as Text } from '../components/Text'
import {widthPercentageToDP, heightPercentageToDP} from '../constants/Normalize'
import Header from '../components/global/Header';

export default class VotingScreen extends Component {
    render() {
      return (
        <View style={styles.container}>
          <Header screenName="Voting"/>
          <Text h1>Voting Screen</Text>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
      // marginLeft: widthPercentageToDP('4%'),
      // marginRight: widthPercentageToDP('4%'),
    },
});
  