import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { default as Text } from "../Text";

export default class FeedCard extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text h2>{this.props.title}</Text>
        <Text>{this.props.description}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-evenly"
  }
});
