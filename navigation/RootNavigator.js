import { createStackNavigator } from "react-navigation";

import LoginScreen from "../screens/auth";

export default createStackNavigator({
  LoginScreen
}, 
{
  headerMode: 'none'
});
