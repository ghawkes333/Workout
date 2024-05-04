import React from "react";
import { createTheme, ThemeProvider } from "@rneui/themed";
import WorkoutScreen from "./components/WorkoutScreen"
import StartScreen from "./components/StartWorkout"
import WorkoutListScreen from "./components/WorkoutList"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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
          <Stack.Screen name="WorkoutList" options={{headerShown: false}} component={WorkoutListScreen} />
          <Stack.Screen name="StartWorkout" options={{headerShown: false}} component={StartScreen} />
          <Stack.Screen name="WorkoutScreen" options={{headerShown: false}} component={WorkoutScreen} />
        </Stack.Navigator>
        
      </NavigationContainer>
    </ThemeProvider>
  );
}
