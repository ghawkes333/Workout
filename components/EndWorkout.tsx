import React, {useState} from "react";
import { View , Image, TouchableOpacity} from "react-native";
import { makeStyles, Text, Button, useThemeMode } from "@rneui/themed";
import { Icon } from '@rneui/base';
// import { TouchableOpacity } from "react-native-gesture-handler";

export default function App({route, navigation}) {
  const {workoutName, numCards, numReps, time} = route.params
  const styles = useStyles();
  const { setMode, mode } = useThemeMode();
  

  const handleOnPress = () => {
    setMode(mode === "dark" ? "light" : "dark");
  };

  return (
    <View style={styles.container}>
      {/* <Text h1 style={styles.title}>Great job! </Text> */}
      {/* <Icon size={48} name="x" type="feather" color={"black"} style={styles.exit} onPress={() => {navigation.navigate('WorkoutListScreen', {})}}/> */}
      <TouchableOpacity onPress={() => {navigation.navigate('WorkoutListScreen', {})}}>

      <Image style={styles.exit} source={require("../assets/images/x_black.png")} />
      </TouchableOpacity>
      {/* onPress={navigation.navigate('TabNavScreen', {})} */}
      <Text h1 style={styles.title}>{workoutName}</Text>
      <View style={styles.statContainer}>
        <View style={styles.stat}>
            <Text h3 style={styles.statHeader}>{numCards}</Text>
            <Text h4>Cards</Text>
        </View>
        <View style={styles.stat}>
            <Text h3 style={styles.statHeader}>{numReps}</Text>
            <Text h4>Reps</Text>
        </View>
        <View style={styles.stat}>
            <Text h3 style={styles.statHeader}>{time}</Text>
            <Text h4>Time Elapsed</Text>
        </View>
      </View>
    </View>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: "center"
  },
  exit:{
    alignSelf: "flex-end",
    marginTop: 32,
    marginRight: 32,
    height: 48, 
    width: 48
  },
  text: {
    marginVertical: theme.spacing.lg,
  },
  title: {
    flex: 1,
    marginTop: 64,
    marginLeft: 32,
    alignSelf: "flex-start"
  },
  statContainer:{
    flex: 5,
    flexDirection: "row",
    justifyContent: "space-around"

  },
  stat: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center"
  },
  statHeader :{
    fontWeight: "bold"
  }
}));
