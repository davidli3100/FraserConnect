import React from 'react';
import { createAppContainer, createBottomTabNavigator } from 'react-navigation';
import { Feather } from "@expo/vector-icons";

import FeedScreen from '../screens/feed';
import VotingScreen from "../screens/voting";

export default createBottomTabNavigator(
  
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
//   export default createAppContainer(TabNavigatorScreen);
  