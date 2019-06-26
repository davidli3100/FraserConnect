import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { default as Text } from "../Text";
import {Avatar, Image} from 'react-native-elements'
import {widthPercentageToDP,heightPercentageToDP} from '../../constants/Normalize'


class CardHeader extends Component {

  _customInitialsHandler = (string) => {
    var names = string.split(' '),
    initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
        initials += names[1].substring(0, 1).toUpperCase();
    }
    return initials;      
  }

  render() {
    return (
      <View style={styles.headerContainer}>
        <Avatar 
            overlayContainerStyle={{backgroundColor: '#47578f'}}
            rounded
            size={heightPercentageToDP('4%')} 
            title={this.props.poster ? this._customInitialsHandler(this.props.poster) : "John Fraser"} 
            source={{uri: this.props.posterPhoto}}/>
        <Text h4>{this.props.poster}</Text>
        <Text style={styles.headerLightText}>
          {this.props.datePosted}
        </Text>
      </View>
    )
  }
}

//this is basically a wrapper to display multiple image thumbnails if needed
class CardImagesContainer extends Component {
  render() {
    return (
      <View styles={styles.imagesContainer}>
        {this.props.children}
      </View>
    )
  }
}

class CardImage extends Component {
  render() {
    return (
      this.props.imageURIs.map(uri => {
        <Image 
        style={styles.image}
        source={{uri: uri}}
        />
      })
    )
  }
}

class CardContent extends Component {
  render() {
    return (
      <Text>
        {this.props.cardContent}
      </Text>
    )
  }
}

//pinning and sharing functionality should be in footer
class CardFooter extends Component {
  render() {
    return (
      <Text>
        Logos here
      </Text>
    )
  }
}

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
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  headerContainer: {
    flex: -1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  headerLightText: {
    fontFamily: 'Rubik-Light',
    fontSize: heightPercentageToDP('2.3%')
  },
  imagesContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignContent: 'flex-start'
  },
  image: {
    flex: 1,
    flexGrow: 0,
    flexBasis: 'auto',
    alignSelf: 'auto'
  }
});
