import React from 'react';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import MainTabNavigator from './MainTabNavigator'
import RootNavigator from './RootNavigator'
import UserDrawerNavigator from '../screens/logout';

export default createAppContainer(createSwitchNavigator({
  Auth: RootNavigator,
  App: MainTabNavigator,
  Logout: UserDrawerNavigator
}, {
  initialRouteName: 'Auth'
}))