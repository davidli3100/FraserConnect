import React from "react";

import { createAppContainer, createSwitchNavigator } from "react-navigation";

import StackedTabs from './MainTabNavigator'
import RootNavigator from './RootNavigator'
import UserDrawerNavigator from '../screens/logout';
import TopProfileTabs from "./profileTopTab";

export default createAppContainer(createSwitchNavigator({
  Auth: RootNavigator,
  App: StackedTabs,
  Logout: UserDrawerNavigator,
  },
  {
  initialRouteName: 'Auth'
}))
