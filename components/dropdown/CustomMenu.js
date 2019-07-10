import React, { Component } from "react";
import { View, Text } from "react-native";
import Menu, { MenuItem, MenuDivider } from "react-native-material-menu";
import { TouchableOpacity } from "react-native-gesture-handler";

class CustomMenu extends Component {
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
    return(
      <Menu>
        <MenuItem onPress = {this.settingsClick}>
          Settings
        </MenuItem>
        <MenuItem onPress = {this.logoutClick}>
          Log Out
        </MenuItem>
      </Menu>
    )
  }
}
