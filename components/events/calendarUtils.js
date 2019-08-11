import * as ExpoCalendar from 'expo-calendar'

export default class Calendar {
    
    addEventToCalendar = (event) => {
        availableCalendars = ExpoCalendar.getCalendarsAsync()
        for(calendar in availableCalendars) {
            if(calendar === "John Fraser SS") {
                ExpoCalendar.createEventAsync(calendar, )
            }
        }
    }



}