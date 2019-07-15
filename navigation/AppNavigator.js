import React from "react";

import { createAppContainer, createSwitchNavigator } from "react-navigation";

import Tabs from './MainTabNavigator'
import RootNavigator from './RootNavigator'
import UserDrawerNavigator from '../screens/logout';

export default createAppContainer(createSwitchNavigator({
  Auth: RootNavigator,
  App: Tabs,
  Logout: UserDrawerNavigator
}, {
  initialRouteName: 'Auth'
}))
