import React from "react";
import { createTheme, ThemeProvider } from "@rneui/themed";
import WorkoutScreen from "./components/WorkoutScreen"
import StartScreen from "./components/StartWorkout"
import WorkoutListScreen from "./components/WorkoutList"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigationScreen from './components/TabNavigationScreen'
// import {Timer} from './components/Timer'

const Stack = createNativeStackNavigator()

const theme = createTheme({
  lightColors: {},
  darkColors: {},
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          {/* <Stack.Screen name="Timer" options={{headerShown: false}} component={Timer}></Stack.Screen> */}
          <Stack.Screen name="TabNavScreen" options={{headerShown: false}} component={TabNavigationScreen}></Stack.Screen>
          <Stack.Screen name="WorkoutScreen" options={{headerShown: false}} component={WorkoutScreen} />
        </Stack.Navigator>
        
      </NavigationContainer>
    </ThemeProvider>
  );
}
