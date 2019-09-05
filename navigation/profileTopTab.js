//todo there are errors in the react-navigation-tabs

import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import TimeTable from '../screens/timetable';
const TopProfileTabs = createMaterialTopTabNavigator(
    {
        Timetable: TimeTable                        
    },
    {
    }
)

export default TopProfileTabs;