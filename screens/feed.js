import React, { Component } from 'react';
import { StyleSheet, View, ListRenderItemInfo, FlatList } from 'react-native';
import FeedCard from '../components/feed/CustomCard';
import { default as Text } from '../components/Text'

export default class FeedScreen extends Component {
    render() {
      return (
        <View style={styles.container}>
            <Text h1>Feed</Text>
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
  