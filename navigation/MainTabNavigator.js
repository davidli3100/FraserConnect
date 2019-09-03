import React from "react";
import { createAppContainer, createBottomTabNavigator, createStackNavigator } from "react-navigation";
import { Feather } from "@expo/vector-icons";
import { heightPercentageToDP } from "../constants/Normalize";
import FeedScreen from "../screens/feed";
import VotingScreen from "../screens/voting";
import EventsScreen from "../screens/events";
import { colors } from "../constants/theme";
import Announcement from '../screens/announcement'

const Tabs = createBottomTabNavigator(
  
    {
    Home: FeedScreen,
    Events: EventsScreen,
    Voting: VotingScreen
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Feather;
        let iconName;
        if (routeName === "Home") {
          iconName = "home";
        } else if (routeName === "Voting") {
          iconName = "send";
        } else if (routeName === "Events") {
          iconName = "calendar";
        }

        return (
          <IconComponent
            name={iconName}
            size={heightPercentageToDP("3.5%")}
            color={tintColor}
            style={{marginBottom: heightPercentageToDP('0.5%')}}
          />
        );
      }
    }),
    tabBarOptions: {
      activeTintColor: '#10294c',
      inactiveTintColor: "#d4d4d4",
      showLabel: false,
      showIcon: true,
      style: {
        borderTopColor: "white",
        height: heightPercentageToDP("6%")
      },
      keyBoardHidesTabBar: true
    }
  }
);

export default StackedTabs = createStackNavigator({
  Main: Tabs,
  Announcement: Announcement,
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
 }
)
//   export default createAppContainer(TabNavigatorScreen);
