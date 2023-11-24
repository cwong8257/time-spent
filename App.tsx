import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import TimelineCalendarScreen from './screens/timelineCalendarScreen';
import CreateNewEventScreen from './screens/createNewEventScreen';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TimelineCalendar">
        <Stack.Screen
          name="TimelineCalendar"
          component={TimelineCalendarScreen}
        />
        <Stack.Screen name="CreateNewEvent" component={CreateNewEventScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
