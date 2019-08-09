//This is an example code for the popup menu//
import React, { Component } from "react";
//import react in our code.
import { View, TouchableOpacity, StyleSheet } from "react-native";
//import all the components we are going to use.
import Menu, { MenuItem, MenuDivider } from "react-native-material-menu";
//import menu and menu item
import { Avatar } from "react-native-elements";
import { widthPercentageToDP, heightPercentageToDP} from "../../constants/Normalize";

export default class CustomMenu extends Component {

  _returnCustomAvatar = (photoUri, name) => {
    if(photoUri && photoUri !== undefined) {
      return <Avatar
      containerStyle={styles.avatarStyle}
      // avatar={styles.avatarStyle}
      imageProps={{resizeMode: 'cover'}}
      // overlayContainerStyle={styles.avatarStyle}
      size={heightPercentageToDP("7.5%")}
      source={{ uri: photoUri }}
    />
    } else {
      console.log(this.stringToColor(name))
      return <Avatar
      containerStyle={styles.avatarStyle}
      avatar={styles.avatarStyle}
      overlayContainerStyle={StyleSheet.flatten([{backgroundColor: this.stringToColor(name)}, styles.avatarStyle ]) }
      size={heightPercentageToDP("7.5%")}
      title={
        this._customInitialsHandler(name)
      }
    />
    }
  }

  
  _customInitialsHandler = string => {
    if(string !== undefined) {
    var names = string.split(" "),
      initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
      initials += names[1].substring(0, 1).toUpperCase();
    }
    return initials;
  }
  };

  stringToColor(input_str) {
    if(input_str !== undefined) {
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
    } else {
      return '#0063e7'
    }
  }

  _menu = null;
  setMenuRef = ref => {
    this._menu = ref;
  };
  showMenu = () => {
    this._menu.show();
  };
  hideMenu = () => {
    this._menu.hide();
  };
  settingsClick = () => {
    this._menu.hide();
    this.props.settingsClick();
  };
  logoutClick = () => {
    this._menu.hide();
    this.props.logoutClick();
  };
  render() {
    return (
      <View style={this.props.menustyle}>
        <Menu
          ref={this.setMenuRef}
          button={
            <TouchableOpacity onPress={this.showMenu}>
              {this._returnCustomAvatar(this.props.avatarURI, this.props.userName)}
            </TouchableOpacity>
          }
        >
          <MenuItem onPress={this.settingsClick}>Open Settings</MenuItem>
          <MenuItem onPress={this.logoutClick}>Log Out</MenuItem>
        </Menu>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  avatarStyle: {
    borderRadius: 14,
    overflow: 'hidden'
  }
});