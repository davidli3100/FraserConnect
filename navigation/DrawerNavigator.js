import {
  createDrawerNavigator,
  DrawerNavigator,
  createAppContainer
} from "react-navigation";
import logoutScreen from "../screens/logout";
import MainTabNavigator from "./MainTabNavigator";

const UserDrawerNavigator = createDrawerNavigator(
  {
    Logout: logoutScreen,
    Tabs: MainTabNavigator
  },
  {
    initialRouteName: "Tabs"
  }
);

export default createAppContainer(UserDrawerNavigator);
