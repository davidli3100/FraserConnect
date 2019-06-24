import React from 'react';
import { createAppContainer, createBottomTabNavigator, NavigationContainer, NavigationContainerProps, NavigationRoute } from 'react-navigation';
import { Ionicons, Feather } from "@expo/vector-icons";

import VotingScreen  from './screens/voting';
import FeedScreen  from './screens/feed';

export const TabNavigatorScreen = createBottomTabNavigator(
  {
  Home: FeedScreen,
  Voting: VotingScreen,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let IconComponent = Feather;
        let iconName;
        if(routeName === 'Home') {
          iconName = 'home'
        } else if (routeName === "Voting") {
          iconName = "send"
        }

        return <IconComponent name={iconName} size={30} color={tintColor} />
      }
    }),
    tabBarOptions: {
      activeTintColor: '#47578f',
      inactiveTintColor: '#d4d4d4',
      showLabel: false,
      showIcon: true,
      style: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderTopColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
          width: 10,
          height: 10,
        },
        shadowOpacity: 0.57,
        shadowRadius: 5.65,
        
        elevation: 7,
        height: 65
      }
    }
  }
);
export default createAppContainer(TabNavigatorScreen);

