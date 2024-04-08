import React from "react";
import { View , ActivityIndicator } from "react-native";
import { makeStyles, Text, Button, useThemeMode } from "@rneui/themed";
import { Image } from '@rneui/themed';

// import img from './icon.png'

export default function App() {
  const styles = useStyles();
  const { setMode, mode } = useThemeMode();

  const handleOnPress = () => {
    setMode(mode === "dark" ? "light" : "dark");
  };


  return (
    <View style={styles.contentContainer}>
      <View style={styles.xContainer}>
      <Image
        source={require("../assets/x_icon.png")}
        style={styles.xIcon}
        />
        </View>
      <View style={styles.workoutNameContainer}>
      <Text h3 style = {styles.workoutName}>Monday Soccer Training</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
              source={require("../assets/PNG-cards-1.3/2_of_hearts.png") }
              style={styles.image}

            />
      </View>
      <View style={styles.instructionContainer}>
        <Text h1 style={styles.instruction} >8</Text>
        <Text h1 style={styles.instruction}>Push Ups</Text>
      </View>
      <View style={styles.statContainer}>
        <View style={styles.statColumn}>
          <Image style={styles.icon} source={require("../assets/card_icon.png")}></Image>
          <Text h3 style={styles.stat}>52</Text>

        </View>
        <View style={styles.statColumn}>
          <Image style={styles.icon} source={require("../assets/clock.png")}></Image>
          <Text h3 style={styles.stat}>3:00</Text>

        </View>
      </View>
      {/* <Button onPress={handleOnPress}>Switch Theme</Button> */}

    </View>
  );
}

const useStyles = makeStyles((theme) => ({
  contentContainer: {
    display: "flex",
    flex: 1,
    backgroundColor: "#ff3a30",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-evenly"
  },
  xContainer:{
    flex: 0.4,
    width: "100%",
    alignItems: "flex-end",
    justifyContent: "center",
    marginTop: 32,
  },
  instructionContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  statColumn: {
    flexDirection: "column",
    alignItems: "center"
  },
  statContainer: {
    // flex: 0.5,
    width: "100%",
    // height: "100%",
    justifyContent: "space-evenly",
    flexDirection: "row",
    alignContent: "flex-start",
    flex: 0.75,
    marginBottom: 16
    
  },
  // text: {
  //   marginVertical: theme.spacing.lg,
  //   color: "#ffffff"
  // },
  workoutNameContainer:{
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flex: 0.25
  },
  imageContainer:{
    alignItems: "center",
    justifyContent: "center",
    flex:3,
    width:"100%",
  },
  xIcon:{ 
    height: 42,
    width:42
  },
  workoutName:{
    color: "#ffffff",
    fontWeight: "bold"
  },
  image: {
    // backgroundColor: "#ffffff",
    height: 363 * 1.1,
     width: 250 * 1.1,
    // alignSelf: "stretch",
    // height: "100%",
    // width: "100%",
      
    // height:"363",
    // width: "250"
    // width: "auto",
    // objectFit: "cover",
    // verticalAlign: "bottom"
  },
  icon:{
    width: 64,
    height: 64,
  },
  instruction:{
    color: "#ffffff",
    fontWeight: "bold"
  },
  bottomTab: {
    flex: 1
  },
  stat: {
    color: "#ffffff",
    fontWeight: "bold",
    marginTop: 8,
  }
}));
