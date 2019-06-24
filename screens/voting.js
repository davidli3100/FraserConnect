import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { default as Text } from '../components/Text'

export default class VotingScreen extends Component {
    render() {
      return (
        <View style={styles.container}>
          <Text h1>Voting Screen</Text>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  