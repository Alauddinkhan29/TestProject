import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import EventsList from '../screens/EventsList'
import EventsDetails from '../screens/EventsDetails'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { enableScreens } from "react-native-screens"
import { createSharedElementStackNavigator } from "react-navigation-shared-element"
enableScreens();

const rootStack = createSharedElementStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <rootStack.Navigator
        initialRouteName='eventsList'
        screenOptions={{ headerShown: false }}
      >
        <rootStack.Screen name='eventsList' component={EventsList} />
        <rootStack.Screen name='eventsDetails' component={EventsDetails} />
      </rootStack.Navigator>
    </NavigationContainer>
  )
}

export default Routes

