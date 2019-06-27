import React, { Component } from "react";
import { StyleSheet, View, AsyncStorage } from "react-native";
import { default as Text } from "../Text";
import {Avatar, Image, Icon, ThemeConsumer} from 'react-native-elements'
import {widthPercentageToDP,heightPercentageToDP} from '../../constants/Normalize'
import {colors} from '../../constants/theme'


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
        <View style={styles.headerLeft}>
          <Avatar 
              overlayContainerStyle={{backgroundColor: colors.blue}}
              rounded
              size={heightPercentageToDP('4%')} 
              title={this.props.poster ? this._customInitialsHandler(this.props.poster) : "John Fraser"} 
              source={{uri: this.props.posterPhoto}}/>
          <Text style={styles.headerPosterTitle}>{this.props.poster}</Text>
        </View>
        <View style={styles.headerRight}>
          <Text style={styles.headerLightText}>
            {this.props.datePosted}
          </Text>
        </View>
      </View>
    )
  }
}

//this is basically a wrapper to display multiple image thumbnails if needed
class CardImages extends Component {
  render() {
    return (
      <View styles={styles.imagesContainer}>
      {this.props.imageURIs.map(uri => {
        <Image 
        style={styles.image}
        source={{uri: uri}}
        />
      })}      
      </View>
    )
  }
}

class CardContent extends Component {
  render() {
    return (
    <View style={styles.contentContainer}>
      <Text style={styles.contentTitle}>
        {this.props.title}
      </Text>
      <Text style={styles.contentText}>
        {this.props.cardContent}
      </Text>
      {this.props.imageURIs && <CardImages imageURIs={this.props.imageURIs}/>}
      </View>
    )
  }
}

class CardFooter extends Component {
  render() {
    return (
    <View style={styles.footer}>
      <Icon name="bookmark" type="feather" onPress={()=>{}} size={heightPercentageToDP('2.5%')}/>
    </View>
    )
  }
}

export default class FeedCard extends Component {
  render() {
    return (
      <View style={styles.container}>
        <CardHeader datePosted={this.props.post.datePosted} poster={this.props.post.poster} posterPhoto={this.props.post.posterPhoto}/>
        <CardContent title={this.props.post.title} cardContent={this.props.post.content} imageURIs={this.props.post.imageURIs}/>
        <CardFooter/>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 0.8,  
    elevation: 2,
    borderRadius: 13,
    backgroundColor: '#fff',
    paddingTop: heightPercentageToDP('2%'),
    paddingBottom: heightPercentageToDP('2%'),
    paddingRight: widthPercentageToDP('3%'),
    paddingLeft: widthPercentageToDP('3%')
  },
  headerContainer: {
    flex: -1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: heightPercentageToDP('2%')
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerRight: {
    justifyContent: 'flex-end'
  },
  headerLightText: {
    fontFamily: 'Rubik-Light',
    fontSize: heightPercentageToDP('1.8%'),
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
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  headerPosterTitle: {
    marginLeft : widthPercentageToDP('2.5%'),
    fontSize: heightPercentageToDP('2.55%'),
    fontFamily: 'Rubik-Bold',
  },
  contentTitle: {
    fontSize: heightPercentageToDP('2.3%'),
    fontFamily: 'Rubik-Medium',
    marginBottom: heightPercentageToDP('0.5%')
  },
  contentText:{
    fontFamily: 'Rubik-Light',
    fontSize: heightPercentageToDP('2%')
  },  
  contentContainer: {
    marginBottom: heightPercentageToDP('1.3%')
  }
});
