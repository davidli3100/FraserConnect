//This is an example code for the popup menu//
import React, { Component } from "react";
//import react in our code.
import { View, Text, Image, TouchableOpacity } from "react-native";
//import all the components we are going to use.
import Menu, { MenuItem, MenuDivider } from "react-native-material-menu";
//import menu and menu item

export default class CustomMenu extends Component {
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
              {this.props.avatar}
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
