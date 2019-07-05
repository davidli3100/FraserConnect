import React from "react";
import { createAppContainer, createBottomTabNavigator } from "react-navigation";
import { Feather } from "@expo/vector-icons";
import { heightPercentageToDP } from "../constants/Normalize";
import FeedScreen from "../screens/feed";
import VotingScreen from "../screens/voting";
import EventsScreen from "../screens/events";
import { colors } from "../constants/theme";

<<<<<<< Updated upstream
export default createBottomTabNavigator(
  {
=======
export default MainTabNavigator = createBottomTabNavigator(
  
    {
>>>>>>> Stashed changes
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
            size={heightPercentageToDP("4%")}
            color={tintColor}
          />
        );
      }
    }),
    tabBarOptions: {
      activeTintColor: colors.blue,
      inactiveTintColor: "#d4d4d4",
      showLabel: false,
      showIcon: true,
      style: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderTopColor: "white",
        shadowColor: "#000",
        shadowOffset: {
          width: 10,
          height: 10
        },
        shadowOpacity: 0.57,
        shadowRadius: 5.65,

        elevation: 7,
        height: heightPercentageToDP("7%")
      }
    }
  }
);
//   export default createAppContainer(TabNavigatorScreen);
