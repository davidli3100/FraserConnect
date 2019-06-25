import {createDrawerNavigator} from 'react-navigation';
import logoutScreen from '../screens/logout';

export default UserDrawerNavigator = createDrawerNavigator({
    Logout: {
        screen: logoutScreen,
        navigationOptions: {
            drawerLabel: 'Logout'
        }
    }
})