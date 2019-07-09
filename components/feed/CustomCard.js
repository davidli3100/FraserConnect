import React, { Component } from "react";
import { StyleSheet, View, AsyncStorage } from "react-native";
import { default as Text } from "../Text";
import { Avatar, Image, Icon, ThemeConsumer } from "react-native-elements";
import {
  widthPercentageToDP,
  heightPercentageToDP
} from "../../constants/Normalize";
import { colors } from "../../constants/theme";

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
              overlayContainerStyle={{backgroundColor: colors.blue}}
              rounded
              size={heightPercentageToDP('4%')} 
              title={this.props.poster ? this._customInitialsHandler(this.props.poster) : "John Fraser"} 
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
        <Text style={styles.contentText}>{this.props.cardContent}</Text>
        {this.props.imageURIs && (
          <CardImages imageURIs={this.props.imageURIs} />
        )}
      </View>
    );
  }
}

class CardFooter extends Component {
  render() {
    return (
      <View style={styles.footer}>
        <Icon
          name="bookmark"
          type="feather"
          onPress={() => {}}
          size={heightPercentageToDP("2.5%")}
        />
      </View>
    );
  }
}

export default class FeedCard extends Component {

  _convertSecondsToDate = (seconds) => {
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    var date = new Date(seconds*1000) //convert to milliseconds
    day = date.getDate()
    month = date.getMonth()

    return months[month] + " " + day
  }

  render() {
    return (
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
        {/* <CardFooter /> */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 1,
    shadowRadius: 4.5,
    elevation: 3,
    borderRadius: 6,
    backgroundColor: '#fff',
    paddingTop: heightPercentageToDP('2%'),
    paddingBottom: heightPercentageToDP('2%'),
    paddingRight: widthPercentageToDP('3%'),
    paddingLeft: widthPercentageToDP('3%'),
    marginBottom: heightPercentageToDP('2.85%'),
    marginLeft: widthPercentageToDP('4%'),
    marginRight: widthPercentageToDP('4%')
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
  headerPostHeaderText:{
    marginLeft : widthPercentageToDP('2.5%'),
    flex: 1,
    flexDirection: 'column'
  },
  headerLightText: {
    fontFamily: "Rubik-Light",
    color: colors.gray,
    fontSize: heightPercentageToDP("1.5%")
  },
  imagesContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    alignContent: "flex-start"
  },
  image: {
    flex: 1,
    flexGrow: 0,
    flexBasis: "auto",
    alignSelf: "auto"
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  headerPosterTitle: {
    fontSize: heightPercentageToDP('2%'),
    fontFamily: 'Rubik-Bold',
  },
  contentTitle: {
    fontSize: heightPercentageToDP("2.3%"),
    fontFamily: "Rubik-Medium",
    marginBottom: heightPercentageToDP("0.5%")
  },
  contentText: {
    fontFamily: "Rubik-Light",
    fontSize: heightPercentageToDP("2%")
  },
  contentContainer: {
    marginBottom: heightPercentageToDP("1.3%")
  }
});
