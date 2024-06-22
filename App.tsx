import 'react-native-gesture-handler';
import React from "react";
import { createTheme, ThemeProvider } from "@rneui/themed";
import WorkoutScreen from "./components/WorkoutScreen"
import StartScreen from "./components/StartWorkout"
import WorkoutListScreen from "./components/WorkoutList"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EndWorkoutScreen from './components/EndWorkout'
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
          <Stack.Screen name="WorkoutListScreen" options={{headerShown: false}} component={WorkoutListScreen}></Stack.Screen>
          <Stack.Screen name="StartScreen" options={{headerShown: false}} component={StartScreen}></Stack.Screen>
          <Stack.Screen name="WorkoutScreen" options={{headerShown: false}} component={WorkoutScreen} />
          <Stack.Screen name="EndWorkoutScreen" options={{headerShown: false}} component={EndWorkoutScreen} />
  
        </Stack.Navigator>
        
      </NavigationContainer>
    </ThemeProvider>
  );
}
