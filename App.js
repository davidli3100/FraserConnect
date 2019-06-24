import React from 'react';
import { createAppContainer, createBottomTabNavigator, NavigationContainer, NavigationContainerProps, NavigationRoute } from 'react-navigation';
import {
  BottomNavigation,
  BottomNavigationTab,
  BottomNavigationProps,
} from 'react-native-ui-kitten';
// import { Ionicons } from "@expo/vector-icons";
import {Image} from 'react-native'

import VotingScreen  from './screens/voting';
import FeedScreen  from './screens/feed';

type CommonNavigationProps = NavigationProps & NavigationContainerProps;

export const TabNavigatorScreen = createBottomTabNavigator(
  {
  Home: FeedScreen,
  Voting: VotingScreen,
  },
  {
    initialRouteName: 'Home',
    tabBarComponent: BottomNavigationShowcase,
  }
);

export const BottomNavigationShowcase = (BottomNavigationProps) => {
  const onTabSelect = (selectedIndex) => {
    const { selectedRoute } = props.navigation.state.routes;

    navigation.navigate(selectedRoute.routename);
  };
  return (
    <BottomNavigation
      appearance='noIndicator'
      selectedIndex={props.navigation.state.index}
      onSelect={onTabSelect}>
        <BottomNavigationTab icon={<Image source={require('./assets/evaicons/outline/svg/home-outline.svg')}/>} title='Home'/>
        <BottomNavigationTab title='Voting'/>
      </BottomNavigation>
  )
}

export default createAppContainer(TabNavigatorScreen);

