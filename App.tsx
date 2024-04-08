import React from "react";
import { createTheme, ThemeProvider } from "@rneui/themed";
import WorkoutScreen from "./components/WorkoutScreen"

const theme = createTheme({
  lightColors: {},
  darkColors: {},
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <WorkoutScreen />
    </ThemeProvider>
  );
}
