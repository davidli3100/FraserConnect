import React, { Component } from "react";
import { StyleSheet, View, AsyncStorage, Text, TouchableOpacity } from "react-native";
// import { default as Text } from "../Text";
import { Avatar, Image, Icon, ThemeConsumer } from "react-native-elements";
import {
  widthPercentageToDP,
  heightPercentageToDP
} from "../../constants/Normalize";
import { colors } from "../../constants/theme";

function stringToColor(input_str) {
  var baseRed = 128;
  var baseGreen = 128;
  var baseBlue = 128;

  //lazy seeded random hack to get values from 0 - 256
  //for seed just take bitwise XOR of first two chars
  var seed = input_str.charCodeAt(0) ^ input_str.charCodeAt(1);
  var rand_1 = Math.abs((Math.sin(seed++) * 10000)) % 256;
  var rand_2 = Math.abs((Math.sin(seed++) * 10000)) % 256;
  var rand_3 = Math.abs((Math.sin(seed++) * 10000)) % 256;

  //build colour
  var red = Math.round((rand_1 + baseRed) / 2);
  var green = Math.round((rand_2 + baseGreen) / 2);
  var blue = Math.round((rand_3 + baseBlue) / 2);

  return 'rgb(' + red + ',' + green + ',' + blue + ')'
}


class CardHeader extends Component {
  _customInitialsHandler = string => {
    var names = string.split(" "),
      initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
      initials += names[1].substring(0, 1).toUpperCase();
    }
    return initials;
  };

  render() {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerAvatar}>
          <Avatar 
              overlayContainerStyle={StyleSheet.flatten([{backgroundColor: stringToColor(this.props.poster)}, styles.avatarStyle])}
              size={heightPercentageToDP('4%')} 
              title={this._customInitialsHandler(this.props.poster)} 
              source={{uri: this.props.posterPhoto}}/>
        </View>
        <View style={styles.headerPostHeaderText}>
          <Text style={styles.headerPosterTitle}>{this.props.poster}</Text>
          <Text style={styles.headerLightText}>{this.props.datePosted}</Text>
        </View>
      </View>
    );
  }
}

//this is basically a wrapper to display multiple image thumbnails if needed
class CardImages extends Component {
  render() {
    return (
      <View styles={styles.imagesContainer}>
        {this.props.imageURIs.map(uri => {
          <Image style={styles.image} source={{ uri: uri }} />;
        })}
      </View>
    );
  }
}

class CardContent extends Component {
  render() {
    return (
      <View style={styles.contentContainer}>
        <Text style={styles.contentTitle}>{this.props.title}</Text>
        {this.props.cardContent.length > 0 &&
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.contentText}>{this.props.cardContent}</Text> }
      </View>
    );
  }
}

export default class FeedCard extends Component {

  constructor(props) {
    super(props)
    this._navigateToAnnouncement = this._navigateToAnnouncement.bind(this)
  }

  _convertSecondsToDate = (seconds) => {
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    var date = new Date(seconds*1000) //convert to milliseconds
    day = date.getDate()
    month = date.getMonth()

    return months[month] + " " + day
  }

  _navigateToAnnouncement = () => {
    this.props.navigation.navigate('Announcement', {
      post: this.props.post
    })
  }

  render() {
    return (
      <TouchableOpacity activeOpacity={this.props.post.content ? 0.75 : 1} onPress={this.props.post.content ? this._navigateToAnnouncement : null}>
        <View style={styles.container}>
          <CardHeader
            datePosted={this._convertSecondsToDate(this.props.post.datePosted.seconds)}
            poster={this.props.post.poster}
            posterPhoto={this.props.post.posterPhoto}
          />
          <CardContent
            title={this.props.post.title}
            cardContent={this.props.post.content}
            imageURIs={this.props.post.imageURIs}
          />
        </View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    borderBottomLeftRadius: 14,
    borderTopLeftRadius: 14,
    backgroundColor: '#fff',
    paddingTop: heightPercentageToDP('2%'),
    paddingBottom: heightPercentageToDP('1.9%'),
    paddingRight: widthPercentageToDP('3%'),
    paddingLeft: widthPercentageToDP('3%'),
    marginBottom: heightPercentageToDP('2.85%'),
    marginLeft: widthPercentageToDP('6%'),
    marginRight: widthPercentageToDP('-1.5%')
  },
  headerContainer: {
    flex: -1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: heightPercentageToDP("2%")
  },
  headerAvatar: {
    flexDirection: "row",
    alignItems: "center"
  },
  avatarStyle: {
    borderRadius: 7,
    overflow: 'hidden'
  },
  headerPostHeaderText:{
    marginLeft : widthPercentageToDP('2.5%'),
    flex: 1,
    flexDirection: 'column'
  },
  headerLightText: {
    fontFamily: "Poppins-SemiBold",
    color: 'rgba(98, 125, 152, 0.7)',
    lineHeight: heightPercentageToDP('1.6%'),
    fontSize: heightPercentageToDP("1.5%")
  },
  headerPosterTitle: {
    fontSize: heightPercentageToDP('2%'),
    fontFamily: 'Poppins-SemiBold',
    lineHeight: heightPercentageToDP('2.1%'),
    color: '#102a43',
    marginBottom: heightPercentageToDP('0.2%'),
    marginTop: heightPercentageToDP('0.2%')
  },
  contentTitle: {
    fontSize: heightPercentageToDP("1.6%"),
    fontFamily: "Poppins-SemiBold",
    // marginBottom: heightPercentageToDP("0.5%"),
    color: '#102A43'
  },
  contentText: {
    fontFamily: "Poppins-Medium",
    fontSize: heightPercentageToDP("1.5%"),
    color: '#102A43'
  },
  contentContainer: {
    // marginBottom: heightPercentageToDP("1.3%")
  }
});
