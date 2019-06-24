import React from 'react';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import MainTabNavigator from './MainTabNavigator'
import RootNavigator from './RootNavigator'
import AppLoadingScreen from '../screens/AppLoading';

export default createAppContainer(createSwitchNavigator({
  Auth: RootNavigator,
  App: MainTabNavigator,
}, {
  initialRouteName: 'Auth'
}))