import React, { useEffect, useState } from "react";
import { View , ActivityIndicator, TouchableOpacity } from "react-native";
import { makeStyles, Text, Button, useThemeMode } from "@rneui/themed";
import { Image } from '@rneui/themed';
import WorkoutDB from '../dbops/WorkoutDB'
import ExerciseDB from '../dbops/ExerciseDB'
import { Icon } from "@rneui/base";

// import img from './icon.png'

let NumberCards = 52

const cardRes = require.context('../assets/PNG-cards-1.3', false);

var cardImages = importAll()

let DeckIndex = -1


let Exercises: any[] = []
let CurrentWorkout


WorkoutDB.InitDB()
ExerciseDB.InitDB()
let Deck = getDeck(NumberCards)

function importAll() {
  let images = {};
  cardRes.keys().forEach((item: string, index: number) => { images[item.replace('./', '')] = cardRes(item); });
  return images
}


// Shuffle - Adapted from https://www.freecodecamp.org/news/how-to-shuffle-an-array-of-items-using-javascript-or-typescript/
function shuffle (array: number[]) { 
  for (let i = array.length - 1; i > 0; i--) { 
    const j = Math.floor(Math.random() * (i + 1)); 
    [array[i], array[j]] = [array[j], array[i]]; 
  } 
  return array; 
}; 

// Takes a numer of cards <= 52
function getDeck(numCards: number){
  console.log("Reset deck")
  let arr = []
  for (let i = 0; i < numCards; i++){
    arr.push(i)
  }
  arr = shuffle(arr)
  
  return arr.slice(0, numCards)
}

/**
 * 0 - 12 => diamonds
 * 13 - 25 => hearts
 * 26 - 38 => clubs
 * 39 - 51 => spades
 * @param cardID
 */
function cardToExercise(cardID: number){
  let suit = Math.floor(cardID / 13)
  let exer = Exercises[suit]
  return exer
}

function getExerName(cardID: number){
  let e = cardToExercise(cardID)
  if (e != undefined){
    return e.name
  } else {
    return ""
  }
}

function getCardImage(cardID: number){
  let suit = Math.floor(cardID / 13)
  let suitStrArr = ["diamonds", "hearts", "clubs", "spades"]
  let suitStr = suitStrArr[suit]

  let num = (cardID - (suit * 13)) + 2
  let numStr

  switch(num){
    case 11: 
      numStr = "jack"
      break;
    case 12:
      numStr = "queen"
      break
    case 13:
      numStr = "king"
      break
    case 14:
      numStr = "ace"
      break
    default:
      numStr = num.toString()
  }

  let fileName: string = numStr + "_of_" + suitStr + ".png"
  return cardImages[fileName]
}

function getCardNum(cardID: number){
  let suit = Math.floor(cardID / 13)
  return (cardID - (suit * 13)) + 2
}

function getRemainingCards(){
  return NumberCards - DeckIndex - 1
}

export default function App({route, navigation}) {
  const [workoutName, setWorkoutName] = useState("")
  const [nextCardID, setNextCardID] = useState(-1)
  const {workoutID} = route.params

  const styles = useStyles();
  const { setMode, mode } = useThemeMode();
  
  useEffect(() =>{
    let workout = WorkoutDB.GetWorkout(workoutID)
    workout.then((w:Workout) => {
        setWorkoutName(w.name)
        ExerciseDB.GetExercises(w.exerciseIDs).then((exercises) => {
          Exercises = exercises
          nextExer()
        })
    }).catch((e) => {console.log("err: " + e)})
  }, []) 


  const nextExer = () =>{
    DeckIndex++
    if (DeckIndex >= NumberCards){
      console.log("Workout ended!")
      return
    }
  
    setNextCardID(Deck[DeckIndex])
    let e = cardToExercise(Deck[DeckIndex])

  }


  return (
    <View style={styles.contentContainer}>
      <View style={styles.topbar}>
        <Text h4 style={styles.stat}>{getRemainingCards()}</Text>
        <Text h4 style = {styles.stat} >{workoutName}</Text>
        <Text h4 style={styles.stat}></Text>
      </View>
      {/* <View style={styles.workoutNameContainer}>
      </View> */}
      <View style={styles.imageContainer}>
        <Image
              source={getCardImage(nextCardID)}
              style={styles.image}
              

            />
      </View>
      <View style={styles.instructionContainer}
      >
        <Text h2 style={styles.instruction} >{getCardNum(nextCardID)}</Text>
        <Text h2 style={styles.instruction}>{getExerName(Deck[DeckIndex])}</Text>
        
      </View>
      
      <TouchableOpacity
      style={styles.forwardBtnContainer}
      onPress={() => { 
        nextExer()
      }}
      >
        <Icon
          type="font-awesome"
          name="forward"
          size={128}
          style={styles.nextBtn}
          color="black"
          
        />
      </TouchableOpacity>
        

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
  topbar:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
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
  forwardBtnContainer: {
    width: "100%"
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
  endIcon:{ 
    height: 100,
    width:100,
    marginBottom: 16
  },
  workoutName:{
    color: "#ffffff",
    fontWeight: "bold",
    // textAlign: "center",
    marginTop: 64,
    flex: 1
  },
  nextBtn:{
    marginBottom: 32,
    marginTop: 16,
    width: "100%"
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
    fontWeight: "bold",
    textAlign: "center",
    maxWidth: "80%",
    alignSelf: "center"
  },
  bottomTab: {
    flex: 1
  },
  stat: {
    color: "#ffffff",
    fontWeight: "bold",
    marginTop: 64,
    flex: 1,
    textAlign:"center"
  }
}));
